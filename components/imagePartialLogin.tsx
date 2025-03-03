import { useRouter } from "next/router";
import { MouseEventHandler, useState } from "react";
import Popup from "reactjs-popup";
import UserManager from "../auth/userManager";
import CustomLogin from "./customLogin";
import Img from "./image";

interface imagePartialLoginProps {
  sku: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

export default function ImagePartialLogin(props: imagePartialLoginProps) {
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
        onClick={() => interestCourse(props.sku)}>
        <Img id="block-yearly-img"
          className="feature-image"
          src={props.src}
          width={props.width}
          height={props.height}
          alt="Cariber Yearly Subscription"
        />
      </a>
      <Popup className="popup-auth"
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