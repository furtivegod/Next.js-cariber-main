import { FormEvent, useState } from "react";
import { AuthApiProps, getFacebookAuthToken, getGoogleAuthToken, loginApi, loginOrCreateApi } from "../apiNest/authApi";
import FormInput from "./formInput";
import ShowError from "./showError";
import Img from "./image";
import UserManager from "../auth/userManager";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login-typed';
import { Auth } from "../apiNest/models/content/auth";
import Link from "next/link";
interface CustomLoginProp {
  path: string,
  callbackButton: Function
}

export default function CustomLogin({ path, callbackButton }: CustomLoginProp) {
  const userManager = new UserManager();
  const [formLogin, setFormLogin] = useState({
    email: "",
  });
  const [password, setPassword] = useState("")
  const [errorLogin, setErrorLogin] = useState({
    isError: false,
    message: "",
  });
  const [userExits, setUserExits] = useState(false);

  async function loginRequest(event?: FormEvent) {
    event && event.preventDefault();
    setErrorLogin({
      isError: false,
      message: ""
    })
    if (userExits) {
      const formData: AuthApiProps = {
        username: formLogin.email,
        password: password
      }
      const data = await loginApi(formData) as Auth;
      if (data.message){
        setErrorLogin({
          isError: true,
          message: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง"
        })
        return
      }
      await userManager.saveToken(data.access_token);
      callbackButton(path)
    } else {
      const dataLogin = await loginOrCreateApi(formLogin);
      setUserExits(dataLogin.is_exist);
      if (!dataLogin.is_exist) {
        await userManager.saveToken(dataLogin?.access_token);
        alert("ระบบได้ส่งรหัสไปยังอีเมลของคุณ")
        callbackButton(path);
      }
    }
  }

  const responseGoogle = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    response = response as GoogleLoginResponse
    const data = await getGoogleAuthToken({
      id_token: response.tokenObj.id_token
    }) as Auth;
    await userManager.saveToken(data.access_token);
    callbackButton(path);
  }

  const responseFacebook = async (response: ReactFacebookLoginInfo) => {
    if (response.accessToken) {
      const data = await getFacebookAuthToken({
        access_token: response.accessToken as string
      }) as Auth;
      await userManager.saveToken(data.access_token);
      callbackButton(path);
    }
  }

  return (
    <div>
      <h2 className="color-white text-center">
        เข้าสู่ระบบ
      </h2>
      <div className="column-center">
        <GoogleLogin
          render={renderProps => (
            <button className="btn btn-icon btn-full m-b-10 m-x-0 background-color-google"
              onClick={renderProps.onClick}>
              <div className="icon-frame">
                <Img src="/login/google-icon.svg"
                  width={25}
                  height={25}
                  alt="Google"
                />
              </div>
              เข้าสู่ระบบด้วย Google
            </button>
          )
          }
          clientId={process.env.NEXT_PUBLIC_NEXTAUTH_GOOGLE_CLIENT_ID as string}
          buttonText="Login"
          onSuccess={responseGoogle}
        />
        <FacebookLogin
          appId={process.env.NEXT_PUBLIC_NEXTAUTH_FACEBOOK_CLIENT_ID as string}
          callback={responseFacebook}
          render={(renderProps) => {
            return (
              <button
                className="btn btn-icon btn-full m-b-5 m-x-0 background-color-facebook"
                onClick={renderProps.onClick}>
                <div className="icon-frame p-0">
                  <Img src="/login/facebook-icon.png"
                    width={25}
                    height={25}
                    alt="Facebook"
                  />
                </div>
                เข้าสู่ระบบด้วย Facebook
              </button>
            )
          }}
        />
      </div>
      <hr />
      <div className="p-20">
        <div className="block-type-form text-center">
          <div className="block box-shadow-none">
            <div className="form">
              <form onSubmit={loginRequest}>
                {errorLogin.isError && (<ShowError message={errorLogin.message} />)}
                <div className="form-group">
                  <label className="label" form="member-email">
                    อีเมล
                  </label>
                  <FormInput id={"email"}
                    type={"email"}
                    required={true}
                    placeholder={""}
                    onChange={(e) => { formLogin.email = e.currentTarget.value; }}
                    minLength={0} />
                </div>
                {userExits ? (
                  <div className="form-group">
                    <label className="label" form="member-email">
                      รหัสผ่าน
                    </label>
                    <FormInput id={"password"}
                      type={"password"}
                      required={true}
                      placeholder={""}
                      onChange={(e) => { setPassword(e.currentTarget.value); }}
                      minLength={8} />
                  </div>)
                  : (
                    <div></div>
                  )}

                <button id="form-button" className="btn btn-solid btn-full btn-small" type="submit">
                  เข้าสู่ระบบ
                </button>
              </form>
            </div>
            <div className="login-bottom">
              <Link href={"/forgot-password"} passHref={true}>
                <a className="btn btn-small m-t-20 m-0 p-0 link-colorless color-white">
                  ลืมรหัสผ่าน?
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
