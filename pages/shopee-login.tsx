import Link from "next/link";
import { MouseEventHandler } from "react";
import Popup from "reactjs-popup";
import Footer from "../components/footer";
import FormInput from "../components/formInput";
import Header from "../components/header";
import Img from "../components/image";
import Register from "../components/register";

export default function ShopeeLogin() {
  return (
    <div className="background-image login">
      <Header />
      <div className="sizer sizer-full">
        <div className="container">
          <div className="row align-items-center justify-content-center ">
            <div className="col-6 text-center">
              <div className="auth-content">
                <div className="auth-text">
                  <h1 className="color-black m-b-50 f-w-600 sm-f-s-28">
                    Cariber X Shopee
                    <br />
                    เข้าสู่ระบบเพื่อเข้าเรียน
                  </h1>
                </div>
                <div>
                  <form>
                    <FormInput id={"member-email"}
                      label="ชื่ออีเมล"
                      type={"email"}
                      required={true}
                      placeholder={""}
                      onChange={(e) => { }} />
                    <FormInput id={"member-password"}
                      label="รหัสผ่าน"
                      type={"password"}
                      required={true}
                      placeholder={""}
                      onChange={(e) => { }} />
                    <button id="form-button" className="form-btn btn-solid btn-full" type="submit">
                      เข้าสู่ระบบ
                    </button>
                  </form>
                  <div className="form-group p-t-15 p-x-0 p-n-5">
                    <label className="justify-content-right d-flex">
                      <Link href="/forgot-password" passHref={true}>
                        <a className="link-colorful">
                          ลืมรหัสผ่าน
                        </a>
                      </Link>
                    </label>
                  </div>
                </div>
                <div className="social-registration">
                  <div className="line-or">
                    <hr className="col-5" />
                    <p>
                      หรือ
                    </p>
                    <hr className="col-5" />
                  </div>
                  <a className="btn btn-box btn-solid btn-full">
                    <div className="flex-row">
                      <Img src="/login/google-icon.svg"
                        width={25}
                        height={25}
                        alt="Google"
                      />
                      <hr className="border-none" />
                      <p className="text-btn">
                        เข้าสู่ระบบด้วย Google
                      </p>
                    </div>
                  </a>
                  <a className="btn btn-box btn-solid btn-full">
                    <div className="flex-row">
                      <div className="facebook-icon">
                        <Img src="/login/facebook-icon-full.png"
                          width={25}
                          height={25}
                          alt="Facebook"
                        />
                      </div>
                      <hr className="border-none" />
                      <p className="text-btn sm-f-s-14">
                        เข้าสู่ระบบด้วย Facebook
                      </p>
                    </div>
                  </a>
                </div>
                <div className="m-t-30">
                  <span className="color-black">
                    ไม่ได้เป็นสมาชิก?
                  </span>
                  <Popup className="popup-auth"
                    trigger={
                      <button className="link-colorless" >
                        คลิกเพื่อสร้างบัญชีผู้ใช้งานใหม่
                      </button>
                    }
                    modal
                    closeOnDocumentClick={false}>
                    {(close: MouseEventHandler<HTMLButtonElement>) => {
                      return (
                        <div className="pop-modal">
                          <button className="close" onClick={close}>
                            <p>
                              &times;
                            </p>
                          </button>
                          <Register shopeeID={null} />
                        </div>
                      )
                    }}
                  </Popup>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}