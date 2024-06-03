import React, { useState } from "react";

function OAuthLogin() {
  document.body.classList.add("gradient-custom");
  //const url = import.meta.env.VITE_BACK_URL;
  const url = "http://localhost:8080";

  return (
    <section className="d-flex vh-100">
      <div className="container-fluid row justify-content-center align-content-center">
        <div className="card bg-dark" style={{ borderRadius: "1rem" }}>
          <div className="card-body p-5 text-center">
            <h2 className="text-white">LOGIN</h2>
            <p className="text-white-50 mt-2 mb-5">
              Please log in to use the service!
            </p>

            <div className="mb-2">
              <a href={`${url}/oauth2/authorization/google`}>
                <img className="login-image" src="/assets/img/google.png"></img>
              </a>
            </div>
            <div className="mb-2">
              <a href={`${url}/oauth2/authorization/naver`}>
                <img className="login-image" src="/assets/img/naver.png"></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OAuthLogin;
