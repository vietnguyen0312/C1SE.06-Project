import React, { useState, useRef } from 'react';
import axios from './axios-customize'
import '../assets/Css/Login.css'

const Authenticate = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const contRef = useRef(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await axios.post('/user/login', { email, password });
            onLoginSuccess(response.data);
        } catch (err) {
            setError('Đăng nhập không thành công. Vui lòng kiểm tra lại thông tin.');
        } finally {
            setLoading(false);
        }
    };

    const handleToggle = () => {
        if (contRef.current) {
            contRef.current.classList.toggle('s--signup');
        }
    };

    return (
        <div className="cont" ref={contRef}>
            <div className="form sign-in">
                <h2>Chào mừng bạn đến Healing Ecotourism</h2>
                <form onSubmit={handleLogin}>
                    <label className="pom-agile">
                        <span className="fa fa-user-o" aria-hidden="true" />
                        <span>Email</span>
                        <input
                            id="username"
                            name="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="user"
                            type="text"
                            required
                        />
                    </label>
                    <label className="pom-agile">
                        <span className="fa fa-key" aria-hidden="true" />
                        <span>Mật Khẩu</span>
                        <input
                            id="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="pass"
                            type="password"
                            required
                        />
                    </label>
                    <button type="submit" className="submit">Đăng Nhập</button>
                </form>
            </div>
            <div className="sub-cont">
                <div className="img">
                    <div className="img__text m--up">
                        <h2>Bạn chưa có tài khoản?</h2>
                        <p>Đăng ký và đặt vé để trải nghiệm những nơi thú vị!</p>
                    </div>
                    <div className="img__text m--in">
                        <h2>Bạn đã đăng ký?</h2>
                        <p>Nếu bạn đã có tài khoản, chỉ cần đăng nhập. Chúng tôi nhớ bạn!</p>
                    </div>
                    <div className="img__btn" onClick={handleToggle}>
                        <span className="m--up">Đăng Ký</span>
                        <span className="m--in">Đăng Nhập</span>
                    </div>
                </div>
                <div className="form-container">
                    <div className="form sign-up">
                        <h2>Đăng Ký</h2>
                        <form onsubmit="return validateForm()" th:action="@{/user/register}" th:method="post" th:object="${user}">
                            <label>
                                <span>Tên</span>
                                <input name="username" th:field="*{username}" type="text" autoComplete="off" required />
                            </label>
                            <label>
                                <span>Email</span>
                                <input id="em" name="email" th:field="*{email}" type="email" autoComplete="off" required />
                            </label>
                            <label>
                                <span>Ngày Sinh</span>
                                <input id="birth" type="date" name="birth" style={{ width: '100%', padding: '20px 0px', background: 'transparent', border: 0, borderBottom: '1px solid #435160', outline: 'none', color: '#6D7781', fontSize: 16, height: 30 }} required />
                            </label>
                            <label>
                                <span>CCCD</span>
                                <input name="cardID" th:field="*{cardID}" type="text" required />
                            </label>
                            <label>
                                <span>Địa Chỉ</span>
                                <input name="address" th:field="*{address}" type="text" required />
                            </label>
                            <label>
                                <span>Giới Tính</span>
                                <select name="gender" th:field="*{gender}" required>
                                    <option value={1}>Nam</option>
                                    <option value={2}>Nữ</option>
                                    <option value={3}>Khác</option>
                                </select>
                            </label>
                            <label>
                                <span>Số Điện Thoại</span>
                                <input id="ph" name="phone" th:field="*{phoneNumber}" type="text" autoComplete="off" required />
                            </label>
                            <label>
                                <span>Ảnh Đại Diện</span>
                                <input type="file" th:field="*{avatar}" style={{ width: '100%', padding: '20px 0px', background: 'transparent', border: 0, borderBottom: '1px solid #435160', outline: 'none', color: '#6D7781', fontSize: 16, height: 30 }} />
                            </label>
                            <label>
                                <span>Quốc Gia</span>
                                <input name="nation" th:field="*{nation}" type="text" required />
                            </label>
                            <label>
                                <span>Mật Khẩu</span>
                                <input id="pw" name="password" th:field="*{password}" type="password" autoComplete="new-password" required />
                            </label>
                            <label>
                                <span>Xác Nhận Mật Khẩu</span>
                                <input id="pwa" name="passAgain" type="password" autoComplete="new-password" required />
                            </label>
                            <label className="agree">
                                <input id="agree" name="agree" type="checkbox" required />
                                <span>Chập nhận điều khoản của chúng tôi</span>
                            </label>
                            <button type="submit" className="submit">Đăng Ký</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Authenticate;