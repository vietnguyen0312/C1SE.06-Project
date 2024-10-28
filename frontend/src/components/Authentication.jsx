import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Configuration/AxiosConfig';
import { OAuthConfig } from "../Configuration/ClientConfig";
import { FcGoogle } from "react-icons/fc";
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Container,
    Grid,
    IconButton,
    InputAdornment,
    TextField,
    Typography,
    styled,
    Link
} from "@mui/material";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { MdEmail, MdLock, MdPerson, MdPhone } from "react-icons/md";
import { login, getRedirectPath, getRoles } from "../Service/Login";

const StyledContainer = styled(Container)(({ theme }) => ({
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: theme.spacing(3),
}));

const StyledForm = styled(Box)(({ theme }) => ({
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: theme.shape.borderRadius,
    padding: theme.spacing(4),
    boxShadow: theme.shadows[5],
    transition: "all 0.3s ease-in-out",
    "&:hover": {
        transform: "translateY(-5px)",
        boxShadow: theme.shadows[8],
    },
}));

const StyledButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(2),
    padding: theme.spacing(1, 4),
    fontSize: "1.1rem",
    transition: "all 0.3s ease-in-out",
    "&:hover": {
        transform: "scale(1.05)",
    },
}));

const StyledLink = styled(Link)(({ theme }) => ({
    display: "block",
    textAlign: "right",
    marginTop: theme.spacing(1),
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
        textDecoration: "underline",
    },
}));

const Authentication = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [gender, setGender] = useState('');
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchGGLogin = async () => {
            const authCode = /code=([^&]+)/;
            const isMatch = window.location.href.match(authCode);
            if (isMatch) {
                const code = isMatch[1];
                const response = await axios.post(`/auth/outbound/authentication?code=${code}`);
                localStorage.setItem('token', response.result.token);
                const roles = getRoles(response.result.token);
                const redirectPath = getRedirectPath(roles);
                console.log(redirectPath);
                navigate(redirectPath);
            }
        };
        fetchGGLogin();
    }, []);

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const validatePhoneNumber = (phoneNumber) => {
        const re = /^\+?[0-9. ()-]{7,25}$/;
        return re.test(String(phoneNumber));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {};

        if (!validateEmail(email)) {
            newErrors.email = "Vui lòng nhập đúng định dạng email";
        }

        if (!isLogin) {
            if (!username || username.length < 3 || username.length > 50) {
                newErrors.username = "Tên người dùng phải có độ dài từ 3 đến 50 ký tự";
            }
            if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
                newErrors.phoneNumber = "Vui lòng nhập số điện thoại hợp lệ";
            }
            if (!gender || !["Male", "Female", "Other"].includes(gender)) {
                newErrors.gender = "Giới tính phải là Male, Female, hoặc Other";
            }
            if (password !== confirmPassword) {
                newErrors.confirmPassword = "Mật khẩu không khớp";
            }
            if (!password || password.length < 8) {
                newErrors.password = "Mật khẩu phải có ít nhất 8 ký tự";
            }
        } else {
            if (!password) {
                newErrors.password = "Mật khẩu là bắt buộc";
            }
        }

        if (!email) {
            newErrors.email = "Email là bắt buộc";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            if (isLogin) {
                const redirectPath = await login(email, password);
                navigate(redirectPath);
            } else {
                await axios.post('/users', { email, phoneNumber, username, gender, password });
                const redirectPath = await login(email, password);
                navigate(redirectPath);
            }
        }
    };

    const toggleForm = () => {
        setIsLogin(!isLogin);
        setErrors({});
    };

    const handleGoogleLogin = () => {
        const callbackUrl = OAuthConfig.redirectUri;
        const authUrl = OAuthConfig.authUri;
        const googleClientId = OAuthConfig.clientId;

        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

        window.location.href = targetUrl;
    };

    const handleForgotPassword = () => {
        alert("Forgot password clicked");
    };

    return (
        <StyledContainer maxWidth="lg">
            <StyledForm component="form" onSubmit={handleSubmit}>
                <Typography variant="h4" align="center" gutterBottom>
                    {isLogin ? "Login" : "Register"}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            error={!!errors.email}
                            helperText={errors.email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MdEmail />
                                    </InputAdornment>
                                ),
                            }}
                            autoComplete="email"
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={!!errors.password}
                            helperText={errors.password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MdLock />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                            required
                        />
                    </Grid>
                    {!isLogin && (
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Confirm Password"
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <MdLock />
                                        </InputAdornment>
                                    ),
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle confirm password visibility"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                                required
                            />
                        </Grid>
                    )}
                    {!isLogin && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="User Name"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    error={!!errors.username}
                                    helperText={errors.username}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MdPerson />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    label="Phone Number"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <MdPhone />
                                            </InputAdornment>
                                        ),
                                    }}
                                    required
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth error={!!errors.gender} required>
                                    <InputLabel>Gender</InputLabel>
                                    <Select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        label="Gender"
                                    >
                                        <MenuItem value="Male">Male</MenuItem>
                                        <MenuItem value="Female">Female</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                    {errors.gender && (
                                        <Typography variant="caption" color="error">
                                            {errors.gender}
                                        </Typography>
                                    )}
                                </FormControl>
                            </Grid>
                        </>
                    )}
                </Grid>
                {errors.submit && (
                    <Typography color="error" align="center" gutterBottom>
                        {errors.submit}
                    </Typography>
                )}
                <StyledButton
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    {isLogin ? "Login" : "Register"}
                </StyledButton>
                {isLogin && (
                    <Box mt={2} textAlign="center">
                        <Button
                            variant="outlined"
                            fullWidth
                            startIcon={<FcGoogle />}
                            onClick={handleGoogleLogin}
                        >
                            Đăng nhập bằng Google
                        </Button>
                        <StyledLink href="#" onClick={handleForgotPassword}>
                            Forgot password?
                        </StyledLink>
                    </Box>
                )}
                <Button fullWidth onClick={toggleForm} sx={{ mt: 2 }}>
                    {isLogin ? "Need an account? Register" : "Already have an account? Login"}
                </Button>
            </StyledForm>
        </StyledContainer>
    );
};

export default Authentication;