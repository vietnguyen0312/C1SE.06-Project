import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../Configuration/AxiosConfig';
import styles from '../Style/Authenticate.module.css';
import { OAuthConfig } from "../Configuration/ClientConfig";
import GoogleIcon from "@mui/icons-material/Google";

const Authenticate = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const contRef = useRef(null);
    const navigate = useNavigate();

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
                navigate(redirectPath);
            }
        };
        fetchGGLogin();
    }, []);

    const handleLogin = async (e) => {
        const response = await axios.post('/auth/token', { email, password });
        const token = response.result.token;
        localStorage.setItem('token', token);
        const roles = getRoles(token);
        console.log(roles);
        const redirectPath = getRedirectPath(roles);
        console.log(redirectPath);
        navigate(redirectPath);
    };

    const getRoles = (token) => {
        let jwtData = token.split('.')[1];
        let decodedJwtJsonData = window.atob(jwtData);
        let decodedJwtData = JSON.parse(decodedJwtJsonData);
        let roles = decodedJwtData.scope.split(' ');
        return roles;
    };

    const getRedirectPath = (roles) => {
        if (roles.includes('MANAGER'))
            return '/manager';
        else if (roles.includes('EMPLOYER'))
            return '/employer';
        else if (roles.includes('EMPLOYEE'))
            return '/employee';
        return '/';
    };

    const handleRegister = async (e) => {
        const response = await axios.post('/users', { username, email, password });
        const token = response.result.token;
        localStorage.setItem('token', token);
        console.log('Registration successful, navigating to home page');
        navigate('/');
    };

    const handleToggle = () => {
        if (contRef.current) {
            contRef.current.classList.toggle(styles['s--signup']);
        }
    };

    const handleClick = () => {
        const callbackUrl = OAuthConfig.redirectUri;
        const authUrl = OAuthConfig.authUri;
        const googleClientId = OAuthConfig.clientId;

        const targetUrl = `${authUrl}?redirect_uri=${encodeURIComponent(
            callbackUrl
        )}&response_type=code&client_id=${googleClientId}&scope=openid%20email%20profile`;

        window.location.href = targetUrl;
    };

    return (
        <div className={styles.cont} ref={contRef}>
            <div className={`${styles.form} ${styles['sign-in']}`}>
                <h2>Chào mừng bạn đến Healing Ecotourism</h2>
                <form>
                    <label className={styles['pom-agile']}>
                        <span className="fa fa-user-o" aria-hidden="true" />
                        <span>Tên đăng nhập</span>
                        <input
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.user}
                            type="text"
                            required
                        />
                    </label>
                    <label className={styles['pom-agile']}>
                        <span className="fa fa-key" aria-hidden="true" />
                        <span>Mật khẩu</span>
                        <input
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.pass}
                            type="password"
                            required
                        />
                    </label>
                    <button type="button" className={styles.submit} onClick={handleLogin}>Đăng Nhập</button>
                    <button type="button" className={styles.submit} onClick={handleClick} >
                        <GoogleIcon style={{ textAlign: 'center', marginRight: '10px' }} />
                        Đăng nhập với Google
                    </button>
                    <p className={styles['forgot-pass']}>
                        <a href="">Quên Mật Khẩu?</a>
                    </p>
                </form>
            </div>
            <div className={styles['sub-cont']}>
                <div className={styles.img}>
                    <div className={`${styles['img__text']} ${styles['m--up']}`}>
                        <h2 style={{ color: 'white' }}>Bạn chưa có tài khoản?</h2>
                        <p>Đăng ký và đặt vé để trải nghiệm những nơi thú vị!</p>
                    </div>
                    <div className={`${styles['img__text']} ${styles['m--in']}`}>
                        <h2 style={{ color: 'white' }}>Bạn đã đăng ký?</h2>
                        <p>Nếu bạn đã có tài khoản, chỉ cần đăng nhập. Chúng tôi nhớ bạn!</p>
                    </div>
                    <div className={styles['img__btn']} onClick={handleToggle}>
                        <span className={styles['m--up']}>Đăng Ký</span>
                        <span className={styles['m--in']}>Đăng Nhập</span>
                    </div>
                </div>
                <div className={styles['form-container']}>
                    <div className={`${styles.form} ${styles['sign-up']}`}>
                        <h2>Đăng Ký</h2>
                        <form>
                            <label>
                                <span>Tên người dùng</span>
                                <input
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    type="text"
                                    autoComplete="off"
                                    required
                                />
                            </label>
                            <label>
                                <span>Email</span>
                                <input
                                    id="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="email"
                                    autoComplete="off"
                                    required
                                />
                            </label>
                            <label>
                                <span>Mật khẩu</span>
                                <input
                                    id="pw"
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                />
                            </label>
                            <button type="button" className={styles.submit} onClick={handleRegister}>Đăng Ký</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authenticate;