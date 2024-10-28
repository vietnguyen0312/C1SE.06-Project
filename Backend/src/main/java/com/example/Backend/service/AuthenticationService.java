package com.example.Backend.service;

import com.example.Backend.dto.request.*;
import com.example.Backend.dto.request.User.ResetPasswordRequest;
import com.example.Backend.dto.request.User.UserCreationRequest;
import com.example.Backend.dto.response.AuthenticationResponse;
import com.example.Backend.dto.response.IntrospectResponse;
import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.entity.InvalidatedToken;
import com.example.Backend.entity.ResetToken;
import com.example.Backend.entity.User.CustomerType;
import com.example.Backend.entity.User.Role;
import com.example.Backend.entity.User.User;
import com.example.Backend.enums.CustomerTypeEnum;
import com.example.Backend.enums.RoleEnum;
import com.example.Backend.enums.TokenType;
import com.example.Backend.exception.AppException;
import com.example.Backend.enums.ErrorCode;
import com.example.Backend.repository.Cart.CartRepository;
import com.example.Backend.repository.HttpClient.OutboundUserClient;
import com.example.Backend.repository.InvalidatedTokenRepository;
import com.example.Backend.repository.HttpClient.OutboundIdentityClient;
import com.example.Backend.repository.ResetTokenRepository;
import com.example.Backend.repository.User.CustomerTypeRepository;
import com.example.Backend.repository.User.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class AuthenticationService {
    UserRepository userRepository;
    ResetTokenRepository resetTokenRepository;
    CustomerTypeRepository customerTypeRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;
    OutboundIdentityClient outboundIdentityClient;
    OutboundUserClient outboundUserClient;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    @NonFinal
    @Value("${jwt.valid-duration}")
    protected long VALID_DURATION;

    @NonFinal
    @Value("${jwt.refreshable-duration}")
    protected long REFRESHABLE_DURATION;

    @NonFinal
    @Value("${jwt.reset-duration}")
    protected long RESET_DURATION;

    @NonFinal
    @Value("${outbound.identity.client-id}")
    protected String CLIENT_ID;

    @NonFinal
    @Value("${outbound.identity.client-secret}")
    protected String CLIENT_SECRET;

    @NonFinal
    @Value("${outbound.identity.redirect-uri}")
    protected String REDIRECT_URI;

    @NonFinal
    protected final String GRANT_TYPE = "authorization_code";

    public IntrospectResponse introspect(IntrospectRequest request) throws JOSEException, ParseException {
        var token = request.getToken();
        boolean isValid = true;

        try {
            var jwtToken = verifyToken(token, TokenType.ACCESS_TOKEN.getName());
        } catch (Exception e) {
            isValid = false;
        }

        return IntrospectResponse.builder()
                .valid(isValid)
                .build();
    }

    public AuthenticationResponse outboundAuthenticate(String code){
        var response = outboundIdentityClient.exchangeToken(ExchangeTokenRequest.builder()
                .code(code)
                .clientId(CLIENT_ID)
                .clientSecret(CLIENT_SECRET)
                .redirectUri(REDIRECT_URI)
                .grantType(GRANT_TYPE)
                .build());

        log.info("TOKEN RESPONSE {}", response);

        var userInfo = outboundUserClient.getUserInfo("json", response.getAccessToken());

        var user = userRepository.findByEmail(userInfo.getEmail())
                .orElseGet(()->{
                    Set<Role> roles = new HashSet<>();
                    roles.add(Role.builder()
                            .name(RoleEnum.ROLE_CUSTOMER.getName())
                            .description(RoleEnum.ROLE_CUSTOMER.getDescription())
                            .build());
                    CustomerType customerType = customerTypeRepository.findByName(CustomerTypeEnum.BRONZE.getName());
                    return userRepository.save(User.builder()
                            .email(userInfo.getEmail())
                            .username(userInfo.getName())
                            .customerType(customerType)
                            .roles(roles)
                            .build());
                });

        return AuthenticationResponse.builder()
                .token(generateToken(user, VALID_DURATION))
                .build();
    }

    public void logout(LogoutRequest request) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(request.getToken(), TokenType.REFRESH_TOKEN.getName());

            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();

            InvalidatedToken invalidatedToken =
                    InvalidatedToken.builder().id(jit).expiryTime(expiryTime).build();

            invalidatedTokenRepository.save(invalidatedToken);
        } catch (AppException exception) {
            log.info("Token already expired");
        }
    }

    public void saveResetToken(String token) throws ParseException, JOSEException {
        try {
            var signToken = verifyToken(token, TokenType.RESET_TOKEN.getName());

            String jit = signToken.getJWTClaimsSet().getJWTID();
            Date expiryTime = signToken.getJWTClaimsSet().getExpirationTime();
            String email = signToken.getJWTClaimsSet().getSubject();

            if (resetTokenRepository.existsByUser_Email(email))
                resetTokenRepository.delete(resetTokenRepository.findByUser_Email(email));

            ResetToken resetToken = ResetToken.builder()
                    .id(jit)
                    .user(userRepository.findByEmail(email)
                            .orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED)))
                    .expiryTime(expiryTime)
                    .build();

            resetTokenRepository.save(resetToken);
        } catch (AppException exception) {
            log.info("Save Reset Token Failed");
        }
    }

    public AuthenticationResponse refreshToken(RefreshRequest request)
            throws ParseException, JOSEException {
        var signedJWT = verifyToken(request.getToken(), TokenType.REFRESH_TOKEN.getName());

        var jit = signedJWT.getJWTClaimsSet().getJWTID();
        var expiryTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                .id(jit)
                .expiryTime(expiryTime)
                .build();

        invalidatedTokenRepository.save(invalidatedToken);

        var email = signedJWT.getJWTClaimsSet().getSubject();

        var user = userRepository.findByEmail(email).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHENTICATED)
        );

        var token = generateToken(user, VALID_DURATION);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    private SignedJWT verifyToken(String token, String type) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiryTime = (TokenType.REFRESH_TOKEN.getName().equals(type))
                ? new Date(signedJWT.getJWTClaimsSet().getIssueTime()
                .toInstant().plus(REFRESHABLE_DURATION, ChronoUnit.SECONDS).toEpochMilli())
                : signedJWT.getJWTClaimsSet().getExpirationTime();
        signedJWT.getJWTClaimsSet().getExpirationTime().setTime(expiryTime.toInstant().toEpochMilli());

        var verified = signedJWT.verify(verifier);

        if (!(verified && expiryTime.after(new Date()))) throw new AppException(ErrorCode.UNAUTHENTICATED);

        String jid = signedJWT.getJWTClaimsSet().getJWTID();

        if (TokenType.RESET_TOKEN.getName().equals(type)) {
            if (invalidatedTokenRepository.existsById(jid) && !resetTokenRepository.existsById(jid))
                throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        else {
            if (invalidatedTokenRepository.existsById(jid))
                throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return signedJWT;
    }

    public AuthenticationResponse authenticated(AuthenticationRequest request) {
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.NOT_EXISTED));
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean authenticated = passwordEncoder.matches(request.getPassword(), user.getPassword());
        if (!authenticated)
            throw new AppException(ErrorCode.UNAUTHENTICATED);

        var token = generateToken(user, VALID_DURATION);

        return AuthenticationResponse.builder()
                .token(token)
                .authenticated(true)
                .build();
    }

    private String generateToken(User user, long duration) {
        if ("Bị khoá".equals(user.getStatus())){
            throw new AppException(ErrorCode.LOCKED);
        }
        else
        {
            JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);

            JWTClaimsSet jwtClaimsSet = new JWTClaimsSet.Builder()
                    .subject(user.getEmail())
                    .issuer("HE.com")
                    .issueTime(new Date())
                    .expirationTime(new Date(Instant.now().plus(duration, ChronoUnit.SECONDS).toEpochMilli()))
                    .jwtID(UUID.randomUUID().toString())
                    .claim("scope", buildScope(user))
                    .build();

            Payload payload = new Payload(jwtClaimsSet.toJSONObject());

            JWSObject jwsObject = new JWSObject(header, payload);

            try {
                jwsObject.sign(new MACSigner(SIGNER_KEY.getBytes()));
                return jwsObject.serialize();
            } catch (JOSEException e) {
                log.error("Cannot create Token", e);
                throw new RuntimeException(e);
            }
        }
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");

        if (!CollectionUtils.isEmpty(user.getRoles()))
            user.getRoles().forEach(role -> {
                stringJoiner.add(role.getName());
            });

        return stringJoiner.toString();
    }

    public String forgotPassword(String email) throws ParseException, JOSEException {

        log.info(email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED));

        String resetToken = generateToken(user, RESET_DURATION);

        saveResetToken(resetToken);

        logout(LogoutRequest.builder().token(resetToken).build());

        return String.format("http://localhost:8080/auth/confirm-reset-password?resetToken=%s", resetToken);
    }

    public String confirmResetPassword(String resetToken) throws ParseException, JOSEException {
        var signedJWT = verifyToken(resetToken, TokenType.RESET_TOKEN.getName());

        userRepository.findByEmail(signedJWT.getJWTClaimsSet().getSubject())
                .orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED));

        return resetToken;
    }

    public String resetPassword(ResetPasswordRequest request) throws ParseException, JOSEException {
        var signedJWT = verifyToken(request.getResetToken(), TokenType.RESET_TOKEN.getName());

        User user = userRepository.findByEmail(signedJWT.getJWTClaimsSet().getSubject())
                .orElseThrow(()-> new AppException(ErrorCode.NOT_EXISTED));

        resetTokenRepository.deleteById(signedJWT.getJWTClaimsSet().getJWTID());

        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));

        userRepository.save(user);

        return "Reset Password Successful";
    }
}
