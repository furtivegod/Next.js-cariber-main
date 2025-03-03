import { useState, FormEvent, MouseEventHandler } from "react";
import FormInput from "./formInput"
import ShowError from "./showError";
import Img from "./image";
import registerApi, { RegisterApiProps } from "../apiNest/registerApi";
import UserManager from "../auth/userManager";
import { useRouter } from "next/router";
import { RegisterContent } from '../apiNest/models/content/register';
import { WoocommerceCredentials } from "../apiNest/models/content/woocommerce";
import { WoocommerceService } from "../services/WoocommerceService";

interface RegisterProps {
  callbackButton?: MouseEventHandler<HTMLButtonElement>,
  shopeeID: string | null,
}

export default function Register({ callbackButton, shopeeID }: RegisterProps) {
  const userManager = new UserManager();
  const router = useRouter();
  const [formRegister, setFormRegister] = useState({
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [errorRegister, setErrorRegister] = useState({
    isError: false,
    message: "",
  });

  async function registerRequest(event: FormEvent) {
    event.preventDefault();
    if (formRegister.password !== formRegister.confirmPassword) {
      setErrorRegister({
        isError: true,
        message: "Passwords do not match"
      })
      return
    }
    const formData: RegisterApiProps = {
      email: formRegister.email,
      password: formRegister.password
    }
    const data = await registerApi(formData) as RegisterContent;
    if (!data.message) {
      userManager.saveToken(data.access_token);
      if (shopeeID) {
        WoocommerceService.claimOrderIDWithCurrentUser(shopeeID);
        return;
      }
      await router.replace("/library");
    } else {
      setErrorRegister({
        isError: true,
        message: data.message.toString(),
      });
    }
  }

  return (
    <div>
      <h2 className="color-white text-center">
        สร้างบัญชีผู้ใช้งาน
      </h2>
      <div className="column-center">
        <button className="btn btn-icon btn-full m-b-5 m-x-0 background-color-facebook">
          <div className="icon-frame p-0">
            <Img src="/login/facebook-icon.png"
                 width={25}
                 height={25}
                 alt="Facebook"
            />
          </div>
          ลงทะเบียนด้วย Facebook
        </button>
        <button className="btn btn-icon btn-full m-b-10 m-x-0 background-color-google">
          <div className="icon-frame">
            <Img src="/login/google-icon.svg"
                 width={25}
                 height={25}
                 alt="Google"
            />
          </div>
          ลงทะเบียนด้วย Google
        </button>
      </div>
      <hr />
      <div className="p-20">
        <div className="block-type-form text-center">
          <div className="block box-shadow-none">
            <div className="form">
              <form onSubmit={registerRequest}>
                {errorRegister.isError && (<ShowError message={errorRegister.message} />)}
                <div className="form-group">
                  <label className="label" form="member-email">
                    อีเมล
                  </label>
                  <FormInput id={"email"}
                    type={"email"}
                    required={true}
                    placeholder={""}
                    onChange={(e) => { formRegister.email = e.currentTarget.value; }}
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
                    onChange={(e) => { formRegister.password = e.currentTarget.value; }}
                    minLength={8} />
                </div>
                <div className="form-group">
                  <label className="label" form="member-email">
                    ยืนยันรหัสผ่าน
                  </label>
                  <FormInput id={"confirm-password"}
                    type={"password"}
                    required={true}
                    placeholder={""}
                    onChange={(e) => { formRegister.confirmPassword = e.currentTarget.value; }}
                    minLength={8} />
                </div>
                <button id="form-button" className="btn btn-solid btn-full btn-small" type="submit">
                  ลงทะเบียน
                </button>
              </form>
            </div>
            {callbackButton && (
              <div className="login-bottom">
                <div className="color-white row justify-content-center">
                  เป็นสมาชิกแล้ว?
                  &nbsp;
                  <button onClick={callbackButton} className="btn btn-small m-0 p-0 link-colorless color-white">
                    คลิกเพื่อเข้าสู่ระบบ
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}