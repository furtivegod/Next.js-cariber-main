import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import Popup from "reactjs-popup";
import UserManager from "../auth/userManager";
import CustomLogin from "./customLogin";

interface imagePartialLoginProps {
  sku: string;
  class: string;
  text: string;
  classText?: string;
  classIStart?: string;
}

export default function ButtonPartialLogin(props: imagePartialLoginProps) {
  const userManager = new UserManager();
  const router = useRouter();
  const [isPopup, setIsPopup] = useState(false);

  async function interestCourse(sku: string) {
    if (userManager.isLoggedIn()) {
      sku && await userManager.redirectCheckout(router, sku);
    } else {
      setIsPopup(true);
    }
  }

  async function setCallbackButtonFN(sku: string) {
    setIsPopup(false)
    if (userManager.isLoggedIn()) {
      sku && await userManager.redirectCheckout(router, sku);
    }
  }

  return (
    <>
      <a
        className={props.class}
        onClick={() => interestCourse(props.sku)}
        id="block-yearly-button">
        {props.classIStart && (<i className={props.classIStart} />)}
        <span className={props.classText}>
          {props.text}
        </span>
      </a>
      <Popup
        className="popup-auth"
        open={isPopup}
        modal
        onClose={() => setIsPopup(false)}
        closeOnDocumentClick={false}>
        {(close: MouseEventHandler<HTMLButtonElement>) => {
          return (
            <div className="pop-modal">
              <button className="close" onClick={close}>
                <p>
                  &times;
                </p>
              </button>
              <CustomLogin path={props.sku} callbackButton={setCallbackButtonFN} />
            </div>
          )
        }}
      </Popup>
    </>
  )
}