import Link from "next/link";
import { MouseEventHandler, useEffect, useState } from "react";
import Img from "./image"
import Popup from "reactjs-popup";
import FlashMessages, { FlashMessagesType } from "../functions/flashMessages";
import SwitchSignInSignUp from "./switchSignInSignUp";
import UserManager from "../auth/userManager";
import AnnouncementBar from "./announcementBar";
import ButtonPartialLogin from "./buttonPartialLogin";
import { WoocommerceService } from "../services/WoocommerceService";
import { annualPromotionApi } from "../apiStrapi/StrapiApiService";
import router from "next/router"; 

interface Menu {
  url: string,
  name: string
}

export default function Header() {
  const userManager = new UserManager();
  const flashMessages = new FlashMessages();
  const [hamburgerOpened, setHamburgerOpened] = useState(false);
  const [annualSku, setAnnualSku] = useState("");
  const [shopeeID, setShopeeID] = useState('');
  const [hasShopeeID, setHasShopeeID] = useState(false);
  const flashForgotPassword = flashMessages.getMessages(FlashMessagesType.forgotPasswordMessages);

  const menuLogedIn: Menu[] = [
    { url: "/library", name: "คอร์สของฉัน" },
    { url: "/courses", name: "คอร์สทั้งหมด" },
    { url: "https://blog.cariber.co/", name: "บทความ" },
    { url: "/reviews", name: "รีวิว" },
  ];

  const menu: Menu[] = [
    { url: "/courses", name: "คอร์สทั้งหมด" },
    { url: "https://blog.cariber.co/", name: "บทความ" },
    { url: "/reviews", name: "รีวิว" },
  ];

  const menuUser: Menu[] = [
    { url: "/library", name: "คอร์สของฉัน" },
    { url: "/trial-library", name: "คอร์สเรียนฟรี" },
    { url: "/account", name: "การตั้งค่า" },
    { url: "/logout", name: "ออกจากระบบ" },
  ];

  const menuUserMobile: Menu[] = [
    { url: "/trial-library", name: "คอร์สเรียนฟรี" },
    { url: "/account", name: "การตั้งค่า" },
    { url: "/logout", name: "ออกจากระบบ" },
  ];

  useEffect(() => {
    window.addEventListener("resize", () => {
      setHamburgerOpened(false)
    });
    checkShopeeCredentials();
    fetchData();
  }, []);

  async function fetchData(){
    const data = await annualPromotionApi();
    setAnnualSku(data.data?.attributes?.sku);
  }

  function redirect(url: string) {
    router.push(url);
  }

  function checkShopeeCredentials(): void {
    const url = window.location.search || '';
    if (url?.indexOf('?id=') === -1) {
      return;
    }
    const base64ID = url?.replace('?id=', '') || '';
    if (base64ID) {
      setHasShopeeID(true);
      const shopeeID = new Buffer(base64ID, 'base64').toString('ascii');
      setShopeeID(shopeeID);
      userManager.isLoggedIn() && WoocommerceService.claimOrderIDWithCurrentUser(shopeeID);
      return;
    }
    setHasShopeeID(false);
    setShopeeID('');
  }

  function switchHamburger() {
    setHamburgerOpened(!hamburgerOpened)
  }

  return (
    <header className="header">
      <AnnouncementBar />
      {flashForgotPassword && (
        <div className="header-changed-password">
          <div className="row">
            <span className="fa fa-check-circle w-18 h-18"></span>
            <p className="m-0">
              &nbsp;
              {flashForgotPassword}
            </p>
          </div >
        </div >
      )}
      <div className="header-wrap">
        <div className="header-content header-content-desktop background-dark">
          <div className="container header-container media h-44">
            <Link href="/" >
              <a className="logo w-120 h-42">
                <Img className="logo-image"
                  src="/header/header-logo.png"
                  width={120}
                  height={41.8833}
                  alt="Header Logo"
                />
              </a>
            </Link>
            <div className="header-block header-switch-content header-block-menu media-body">
              <div className="link-list justify-content-right">
                {userManager.isLoggedIn() ? (
                  <div>
                    {menuLogedIn.map((value, index) => {
                      return (
                        <a key={index} className="link-list-link"
                           onClick={ () => {
                             redirect(value.url)
                           }}>
                          {value.name}
                        </a>
                      )
                    })}
                  </div>) : (
                  <div>
                    {menu.map((value, index) => {
                      return (
                        <a key={index}
                           className="link-list-link"
                           onClick={ () => {
                             redirect(value.url)
                           }}>
                          {value.name}
                        </a>
                      )
                    })}
                  </div>
                )}

              </div>
            </div>
            <div className="header-block header-switch-content header-block-cta">
              <ButtonPartialLogin
                sku={annualSku}
                class={"btn btn-small btn-full"}
                text={"ซื้อแพ็กเกจรายปี"} />
            </div>
            {userManager.isLoggedIn() ? (
              <div className="header-block header-switch-content header-block-user header-block-mr0">
                <div className="user-avatar-block">
                  <Popup trigger={<div>
                    <Img className="user-avatar"
                      src={userManager.getProfileImage() as string || "/default_avatar.webp"}
                      width={40}
                      height={40}
                      alt="default_avatar.webp" />
                  </div>}
                    position="bottom right"
                    on="click"
                    closeOnDocumentClick
                    contentStyle={{ padding: "0px", border: "none" }}
                    arrow={false}>
                    <div className="menu">
                      {menuUser.map((value, index) => {
                        return (
                          <a key={index}
                            onClick={() => { redirect(value.url)}}
                             className="menu-item">
                            {value.name}
                          </a>
                        )
                      })}
                    </div>
                  </Popup>
                </div>
              </div>
            ) : (
              <div className="header-block header-switch-content header-block-user header-block-mr0">
                <div className="user">
                  <span className="user-login">
                    <Popup className="popup-auth"
                      open={shopeeID !== ''}
                      trigger={
                        <button className="btn btn-link btn-small color-primary" >
                          เข้าสู่ระบบ
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
                            <SwitchSignInSignUp shopeeID={shopeeID} />
                          </div>
                        )
                      }}
                    </Popup>
                  </span>
                </div>
              </div>
            )}
            <div className={`hamburger hidden-desktop ${hamburgerOpened && "hamburger-opened"}`} onClick={switchHamburger}>
              <div className="hamburger-slices">
                <div className="hamburger-slice hamburger-slice-1" />
                <div className="hamburger-slice hamburger-slice-2" />
                <div className="hamburger-slice hamburger-slice-3" />
                <div className="hamburger-slice hamburger-slice-4" />
              </div>
            </div>
          </div>
        </div>
        <div className={`header-content header-content-mobile background-dark ${hamburgerOpened ? "d-block" : "d-none"}`}>
          <div className="header-block header-switch-content header-block-menu">
            {userManager.isLoggedIn() ? (
              <div className="link-list">
                {menuLogedIn.map((value, index) => {
                  return (
                    <a key={index} className="link-list-link"
                       onClick={ () => {
                         redirect(value.url)
                       }}>
                      {value.name}
                    </a>
                  )
                })}
              </div>
            ) : (
              <div className="link-list">
                {menu.map((value, index) => {
                  return (
                    <a key={index} className="link-list-link"
                       onClick={ () => {
                         redirect(value.url)
                       }}>
                      {value.name}
                    </a>
                  )
                })}
              </div>
            )}
            <div className="header-block header-switch-content header-block-cta">
              <ButtonPartialLogin
                sku={annualSku}
                class={"btn btn-small btn-full"}
                text={"ซื้อแพ็กเกจรายปี"} />
            </div>
            {userManager.isLoggedIn() ? (
              <div className="header-block header-switch-content header-block-menu">
                <span className="link-list">
                  {menuUserMobile.map((value, index) => {
                    return (
                      <a key={index} className="link-list-link"
                         onClick={ () => {
                           redirect(value.url)
                         }}>
                        {value.name}
                      </a>
                    )
                  })}
                </span>
              </div>
            ) : (
              <div className="header-block header-switch-content header-block-user">
                <span className="user-login">
                  <Popup className="popup-auth"
                    trigger={
                      <button className="btn btn-link btn-small color-primary" >
                        เข้าสู่ระบบ
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
                          <SwitchSignInSignUp />
                        </div>
                      )
                    }}
                  </Popup>
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header >
  )
}
