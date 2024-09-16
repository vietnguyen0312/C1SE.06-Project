package com.example.Backend.configuration;

import com.example.Backend.entity.Cart.Cart;
import com.example.Backend.entity.User.CustomerType;
import com.example.Backend.entity.User.Role;
import com.example.Backend.enums.CustomerTypeEnum;
import com.example.Backend.enums.RoleEnum;
import com.example.Backend.entity.User.User;
import com.example.Backend.repository.Cart.CartRepository;
import com.example.Backend.repository.User.CustomerTypeRepository;
import com.example.Backend.repository.User.RoleRepository;
import com.example.Backend.repository.User.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@Configuration
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class ApplicationInitConfig {

    private PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner applicationRunner(UserRepository userRepository, RoleRepository roleRepository,
                                        CustomerTypeRepository customerTypeRepository, CartRepository cartRepository) {
        return args -> {
            if (roleRepository.findAll().isEmpty()) {
                log.info("Add Role");
                for (RoleEnum roleEnum : RoleEnum.values()) {
                    roleRepository.save(Role.builder()
                            .name(roleEnum.getName())
                            .description(roleEnum.getDescription())
                            .build());
                }
            }

            if (customerTypeRepository.findAll().isEmpty()) {
                log.info("Add CustomerType");
                for (CustomerTypeEnum customerTypeEnum : CustomerTypeEnum.values()) {
                    customerTypeRepository.save(CustomerType.builder()
                            .name(customerTypeEnum.getName())
                            .build());
                }
            }

            if (userRepository.findByEmail("manager").isEmpty()) {
                log.info("Add Manager account");
                Set<Role> roles = new HashSet<>(roleRepository.findAll());

                User user = User.builder()
                        .email("manager")
                        .username("manager")
                        .password(passwordEncoder.encode("manager"))
                        .roles(roles)
                        .build();

                userRepository.save(user);

                cartRepository.save(Cart.builder()
                        .user(user)
                        .build());
                log.warn("Manager user has been created with default password: manager, please change it.");
            }
        };
    }

}
