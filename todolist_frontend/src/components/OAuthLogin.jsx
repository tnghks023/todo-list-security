import React, { useState } from "react";

function OAuthLogin() {
  useEffect(() => {
    document.body.classList.add("gradient-custom");

    // Cleanup to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("gradient-custom");
    };
  }, []);

  const url = import.meta.env.VITE_BACK_URL;

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
                <img src="/assets/img/google.png"></img>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OAuthLogin;
