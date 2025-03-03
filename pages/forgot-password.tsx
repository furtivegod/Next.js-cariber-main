import { FormEvent, useState } from "react";
import { forgotPasswordApi } from "../apiNest/forgotPasswordApi";
import Footer from "../components/footer";
import FormInput from "../components/formInput";
import Header from "../components/header";
import ShowError from "../components/showError";

export default function ForgotPassword() {
  const [formForgotPassword, setForgotPassword] = useState({
    email: "",
  });
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  async function forgotPasswordRequest(event: FormEvent) {
    event.preventDefault();
    setError({
      isError: false,
      message: "",
    })
    await forgotPasswordApi(formForgotPassword)
    setError({
      isError: true,
      message: "If your email address exists in our database, you will receive a password recovery link at your email address in a few minutes.",
    })
  }

  return (
    <div className="background-image forgot-password">
      <Header />
      <div className="sizer sizer-full">
        <div className="container">
          <div className="row align-items-center justify-content-center h-670">
            <div className="col-6 text-center text-card">
              <div className="auth-content">
                <h3>
                  <span>หากลืมรหัสผ่านในการลงชื่อเข้าใช้</span>
                </h3>
                <h4>
                  <span>
                    กรุณากรอกอีเมลที่ใช้สมัครเรียน เพื่อเปลี่ยนรหัสผ่าน
                  </span>
                </h4>
                <br />
                <br />
                <form onSubmit={forgotPasswordRequest}>
                  {error.isError && (<ShowError message={error.message} />)}
                  <div className="form-group">
                    <FormInput id={"email"}
                      type={"email"}
                      required={true}
                      placeholder={"อีเมล"}
                      onChange={(e) => { formForgotPassword.email = e.currentTarget.value; }}
                      minLength={0} />
                  </div>
                  <button id="form-button" className="btn btn-solid btn-full" type="submit">
                    ยืนยัน
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}