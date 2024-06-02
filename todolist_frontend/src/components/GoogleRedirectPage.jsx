import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GoogleRedirectPage = async (code) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleOAuthGoogle = async (code) => {
    try {
      // code를 서버에 전달하여 회원가입 & 로그인
      const response = await axios.get(
        `http://localhost:8080/oauth/login/google?code=${code}`
      );
      const data = response.data;
      alert("로그인 성공 : " + data);
      //navigate("/success");
    } catch (error) {
      alert("로그인 실패");
      //navigate("/fail");
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get("code");
    if (code) {
      alert("CODE = " + code);
      handleOAuthGoogle(code);
    }
  }, [location]);

  return (
    <div>
      <div>Processing...</div>
    </div>
  );
};

export default GoogleRedirectPage;
