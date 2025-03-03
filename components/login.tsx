import { FormEvent, MouseEventHandler, useState } from "react";
import { AuthApiProps, getFacebookAuthToken, getGoogleAuthToken, loginApi } from "../apiNest/authApi";
import FormInput from "./formInput";
import ShowError from "./showError";
import Link from "next/link";
import Img from "./image";
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from "react-google-login";
import FacebookLogin, { ReactFacebookLoginInfo } from 'react-facebook-login-typed';
import UserManager from "../auth/userManager";
import router from "next/router";
import { Auth } from "../apiNest/models/content/auth";
import { WoocommerceService } from "../services/WoocommerceService";

interface LoginProps {
  callbackButton: MouseEventHandler<HTMLButtonElement>,
  shopeeID: string | null,
}

export default function Login({ callbackButton, shopeeID }: LoginProps) {
  const userManager = new UserManager();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  })
  const [errorLogin, setErrorLogin] = useState({
    isError: false,
    message: "",
  })

  const responseGoogle = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
    setErrorLogin({
      isError: false,
      message: ""
    });
    response = response as GoogleLoginResponse
    const data = await getGoogleAuthToken({
      id_token: response.tokenObj.id_token
    }) as Auth;
    if (!data) {
      setErrorLogin({
        isError: true,
        message: "Login failed Please try again."
      });
      return
    }
    userManager.saveToken(data.access_token);
    if (shopeeID && data.access_token) {
      WoocommerceService.claimOrderIDWithCurrentUser(shopeeID);
      return;
    }
    await router.replace("/library");
  }

  const responseFacebook = async (response: ReactFacebookLoginInfo) => {
    setErrorLogin({
      isError: false,
      message: ""
    });
    if (response.accessToken) {
      const data = await getFacebookAuthToken({
        access_token: response.accessToken as string
      }) as Auth;
      if (!data) {
        setErrorLogin({
          isError: true,
          message: "Login failed Please try again."
        });
        return
      }
      userManager.saveToken(data.access_token);
      if (shopeeID && data.access_token) {
        WoocommerceService.claimOrderIDWithCurrentUser(shopeeID);
        return;
      }
      await router.replace("/library");
    }
  }

  async function loginRequest(event?: FormEvent) {
    event && event.preventDefault();
    setErrorLogin({
      isError: false,
      message: ""
    });
    const formData: AuthApiProps = {
      username: formLogin.email,
      password: formLogin.password
    }
    const data = await loginApi(formData);
    if (!data) {
      setErrorLogin({
        isError: true,
        message: "Login failed Please try again."
      });
      return
    }
    if (!data.message) {
      userManager.saveToken(data.access_token);
      if (shopeeID && data.access_token) {
        WoocommerceService.claimOrderIDWithCurrentUser(shopeeID);
        return;
      }
      await router.replace("/library");
    } else {
      setErrorLogin({
        isError: true,
        message: data.message,
      })
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
                <div className="form-group">
                  <label className="label" form="member-email">
                    รหัสผ่าน
                  </label>
                  <FormInput id={"password"}
                    type={"password"}
                    required={true}
                    placeholder={""}
                    onChange={(e) => { formLogin.password = e.currentTarget.value; }}
                    minLength={8} />
                </div>
                <button id="form-button" className="btn btn-solid btn-full btn-small" type="submit">
                  เข้าสู่ระบบ
                </button>
              </form>
            </div>
            <div className="login-bottom">
              <div className="color-white row justify-content-center">
                ไม่ได้เป็นสมาชิก?
                &nbsp;
                <button onClick={callbackButton} className="btn btn-small m-0 p-0 link-colorless color-white">
                  คลิกเพื่อสร้างบัญชีผู้ใช้งานใหม่
                </button>
              </div>
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

