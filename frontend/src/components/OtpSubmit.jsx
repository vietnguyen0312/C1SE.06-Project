import { useState, useEffect } from 'react';
import LoadingIcons from 'react-loading-icons';
import axios from '../Configuration/AxiosConfig'; // Ensure axios is imported
import { useLocation, useNavigate } from 'react-router-dom';
import { login } from '../Service/Login';

const OtpSubmit = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const userInfo = location.state;
  const [otp, setOtp] = useState('');
  const [isRegister, setIsRegister] = useState(userInfo.isRegister);

  useEffect(() => {
    const sendOtp = async () => {
      console.log(userInfo);
      try {
        // Generate a random OTP with 5 characters
        const randomOtp = Math.floor(10000 + Math.random() * 90000).toString();
        setOtp(randomOtp);
        // Send OTP to email
        const subject = "OTP for verification";
        const body = `Your OTP for verification is ${randomOtp}`;
        await axios.post(`/mails/send/${userInfo.email}`, { subject, body });
      } catch (error) {
        console.error("Error sending OTP:", error);
      } finally {
        setLoading(false);
      }
    };

    sendOtp();
  }, [userInfo.email]);

  const handleSubmit = async () => {
    // Add logic to verify OTP and create user
    if (otp === '') {
      alert('Vui lòng nhập OTP');
      return;
    }
    if (document.getElementById('otp').value !== otp) {
      console.log(document.getElementById('otp').value);
      console.log(otp);
      alert('OTP không đúng');
      return;
    }
    else {
      if(isRegister) {
      await axios.post('/users', { email: userInfo.email, password: userInfo.password,
         phoneNumber: userInfo.phoneNumber, gender: userInfo.gender, username: userInfo.username });
      } else {
        
      }
      const redirectPath = await login(userInfo.email, userInfo.password);
      navigate(redirectPath);
    }
  };

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <LoadingIcons.TailSpin stroke="#000" />
        </div>
      ) : (
        <>
          <input type="text" id="otp" placeholder="Nhập OTP" />
          <button onClick={handleSubmit}>Gửi</button>
        </>
      )}
    </>
  );
};

export default OtpSubmit;