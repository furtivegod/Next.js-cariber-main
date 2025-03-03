import Link from "next/link";
import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { checkContactGuardApi } from "../apiNest/checkContactGuardApi";
import checkPasswordApi from "../apiNest/checkPasswordApi";
import getUserProfileApi from "../apiNest/getUserProfileApi";
import mySubscriptionApi from "../apiNest/mySubscriptionApi";
import ProfileImageApi from "../apiNest/profileImageApi";
import resetPasswordApi from "../apiNest/resetPasswordApi";
import updateUserProfileApi from "../apiNest/updateUserProfileApi";
import UserManager from "../auth/userManager";
import PurchasedCard from "../components/account/purchasedCard";
import FormCheckbox from "../components/formCheckbox";
import FormInput from "../components/formInput";
import FormSelect from "../components/formSelect";
import FormTextArea from "../components/formTextarea";
import Img from "../components/image";
import ShowError from "../components/showError";
import * as staticData from "../components/static/account"
import { handleChange, handleChangeCheckbox } from "../functions/handleInput";

export default function Account() {
  const userManager = new UserManager();
  const router = useRouter();
  const timeZone = staticData.timeZone;
  const hiddenFileInput = useRef<HTMLInputElement>(null);
  const [id, setId] = useState(0);
  const [checkedContactGuard, setCheckedContactGuard] = useState<boolean>(false);
  const [mySubscription, setMySubscription] = useState([{
    id: "",
    subscription_date: "",
    activate: "",
    createDate: "",
    updateDate: "",
    access_group: {
      id: 0,
      name: "",
      duration: "",
      createDate: "",
      updateDate: "",
      regular_price: 0,
      sku: "",
      access_type: "",
      deletedAt: "",
    },
  }]);
  const [formAccount, setFormAccount] = useState({
    id: 0,
    email: "",
    bio: "",
    profile_image: "",
    role: "",
    notify_on_product: false,
    notify_on_post: false,
    notify_new_product: false,
    createDate: "",
    updateDate: "",
    deletedAt: "",
    contact: {
      id: 0,
      first_name: "",
      last_name: "",
      current_position: "",
      timezone: "",
    }
  });
  const [formContact, setFormContact] = useState({
    id: 0,
    first_name: "",
    last_name: "",
    current_position: "",
    timezone: "",
  });
  const [formPassword, setFormPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errorPassword, setErrorPassword] = useState({
    isError: false,
    message: "",
  });
  const [imageProfile, setImageProfile] = useState(new File([], ""))

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const data = await getUserProfileApi();
    const dataMySubscriptions = await mySubscriptionApi();
    setFormAccount(data);
    setId(data?.id);
    data?.contact && setFormContact(data?.contact);
    dataMySubscriptions && setMySubscription(dataMySubscriptions?.filter(element => { return element.activate }));
  }

  async function saveAccount(event: FormEvent) {
   const checkChangePassword = formPassword.currentPassword &&
                    formPassword.newPassword === formPassword.confirmPassword &&
                    formPassword.newPassword &&
                    formPassword.confirmPassword; 
    event.preventDefault();
    setErrorPassword({
      isError: false,
      message: ""
    });
    if (checkChangePassword) {
      const checkPasswort = await checkPasswordApi({ password: formPassword.currentPassword });
      if (!checkPasswort?.match) {
        setErrorPassword({
          isError: true,
          message: "Incorrect password"
        })
        return false;
      }
    }
    if (formPassword.newPassword !== formPassword.confirmPassword) {
      setErrorPassword({
        isError: true,
        message: "New passwords do not match"
      })
      return false;
    }
    formAccount.contact = formContact;
    const data = await updateUserProfileApi(formAccount, id);
    if (data) {
      if (Boolean(imageProfile.size)) {
        await ProfileImageApi(id, { profile_image: imageProfile });
        userManager.saveProfileImage();
      }
      if (checkChangePassword) {
        await resetPasswordApi({ password: formPassword.newPassword, passwordConfirmation: formPassword.confirmPassword });
      }
      alert("แก้ไขสำเร็จ");
    }
  }

  function handleClick() {
    hiddenFileInput.current && hiddenFileInput.current.click();
  };

  async function handleChangeAvatar(event: ChangeEvent<HTMLInputElement>) {
    if (event.currentTarget!.files![0]) {
      setImageProfile(event.currentTarget!.files![0]);
    }
  }

  if (!checkedContactGuard) {
    checkContactGuardApi().then((value) => {
      if (value?.statusCode === 400) {
        router.replace("/guard-contact?redirect=account");
        return (
          <div></div>
        )
      }
    });
    setCheckedContactGuard(true);
  }

  return (
    <div className="account">
      <form onSubmit={saveAccount}>
        <div className="site-action-bar site-action-bar-members">
          <div className="header-account container">
            <div className="header-left">
              <Link href="/">
                <a className="back-link" href="#">
                  <span className="text-light">
                    <i className="fas fa-chevron-left"></i>
                    &nbsp;&nbsp;Back to Cariber
                  </span>
                </a>
              </Link>
            </div>
            <div className="action-buttons pull-right">
              <Link href="/account">
                <a className="btn-setting">
                  Settings
                </a>
              </Link>
            </div>
          </div>
        </div>
        <div className="container account-content">
          <div className="row side-by-side">
            <div className="col-4">
              <h2 className="title">Profile Settings</h2>
              <p className="subtitle text-light">Change your basic profile information.</p>
            </div>
            <div className="col-8 card-form">
              <div className="panel panel-default panel-form">
                <div className="panel-body">
                  <div className="form-group">
                    <FormInput
                      label="First Name"
                      id={"first_name"}
                      value={formContact.first_name}
                      type={"text"}
                      required={false}
                      onChange={e => handleChange(e, setFormContact, formContact)} />
                  </div>
                  <div className="form-group">
                    <FormInput
                      label="Last Name"
                      id={"last_name"}
                      value={formContact.last_name}
                      type={"text"}
                      required={false}
                      onChange={e => handleChange(e, setFormContact, formContact)} />
                  </div>
                  <div className="form-group">
                    <FormInput
                      label="Email"
                      value={formAccount.email}
                      id={"email"}
                      type={"email"}
                      required={false}
                      onChange={e => handleChange(e, setFormAccount, formAccount)} />
                  </div>
                  <div className="form-group">
                    <FormSelect
                      id={"timezone"}
                      label="Time zone"
                      value={formContact.timezone}
                      required={false}
                      onChange={e => { handleChange(e, setFormContact, formContact) }}
                      item={timeZone} />
                  </div>
                  <div className="form-group boolean optional">
                    <div className="checkbox">
                      <FormCheckbox
                        id={"notify_on_product"}
                        checked={formAccount.notify_on_product}
                        label="Please notify me about updates to my products."
                        onChange={e => { handleChangeCheckbox(e, setFormAccount, formAccount) }} />
                    </div>
                  </div>
                  <div className="form-group boolean optional">
                    <div className="checkbox">
                      <FormCheckbox
                        id={"notify_on_post"}
                        checked={formAccount.notify_on_post}
                        label="Please notify me when a reply to one of my posts or comments is created."
                        onChange={e => { handleChangeCheckbox(e, setFormAccount, formAccount) }} />
                    </div>
                  </div>
                  <div className="form-group boolean optional">
                    <div className="checkbox">
                      <FormCheckbox
                        id={"notify_new_product"}
                        checked={formAccount.notify_new_product}
                        label="Please email me about new products and promotions."
                        onChange={e => { handleChangeCheckbox(e, setFormAccount, formAccount) }} />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="color-black" htmlFor="member_avatar">
                      Avatar
                    </label>
                    <div className="media">
                      <div className="media-left">
                        <Img id="member-avatar-preview"
                          className="avatar img-circle media-object"
                          alt="Avatar"
                          src={Boolean(imageProfile.size) ? URL.createObjectURL(imageProfile) : formAccount.profile_image}
                          width={64}
                          height={64} />
                      </div>
                      <div className="media-body media-middle">
                        <p className="t-sage-body t-sage--color-grey sage-spacer-bottom-xs">
                          Recommended dimensions of
                          <strong>
                            &nbsp;100x100
                          </strong>
                        </p>
                        <input className="d-none"
                          type="file"
                          accept="image/*"
                          ref={hiddenFileInput}
                          onChange={handleChangeAvatar}
                        />
                        <button type="button" onClick={handleClick} className="btn btn-primary btn-outline filepicker-btn fp-input">
                          Change Avatar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row side-by-side">
            <div className="col-4">
              <h2 className="title">Social Profile</h2>
              <p className="subtitle text-light">Edit information displayed publicly in communities.</p>
            </div>
            <div className="col-8 card-form">
              <div className="panel panel-default panel-form">
                <div className="panel-body">
                  <div className="form-group">
                    <FormTextArea
                      id="bio"
                      label="Bio"
                      value={formAccount.bio}
                      required={false}
                      onChange={e => { handleChange(e, setFormAccount, formAccount) }} />
                  </div>
                  <div className="form-group">
                    <FormInput
                      id="current_position"
                      label="Location"
                      value={formContact.current_position}
                      type={"text"}
                      required={false}
                      onChange={e => { handleChange(e, setFormContact, formContact) }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row side-by-side">
            <div className="col-4">
              <h2 className="title">Password</h2>
              <p className="subtitle text-light">Change your password.</p>
              <p className="subtitle text-light">Leave this blank to keep your current password.</p>
            </div>
            <div className="col-8 card-form">
              <div className="panel panel-default panel-form">
                <div className="panel-body">
                  {errorPassword.isError && (<ShowError message={errorPassword.message} />)}
                  <div className="form-group">
                    <FormInput
                      id={"currentPassword"}
                      label="Current Password"
                      type={"password"}
                      required={false}
                      minLength={8}
                      onChange={e => handleChange(e, setFormPassword, formPassword)} />
                    <p className="help-block">
                      <Link href="/forgot-password" passHref={true}>
                        <a>
                          Forgot?
                        </a>
                      </Link>
                    </p>
                  </div>
                  <div className="form-group">
                    <FormInput
                      id={"newPassword"}
                      label="New Password"
                      type={"password"}
                      required={false}
                      minLength={8}
                      onChange={e => handleChange(e, setFormPassword, formPassword)} />
                  </div>
                  <div className="form-group">
                    <FormInput
                      id={"confirmPassword"}
                      label="Verify Password"
                      type={"password"}
                      required={false}
                      minLength={8}
                      onChange={e => handleChange(e, setFormPassword, formPassword)} />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="row side-by-side">
            <div className="col-4">
              <h2 className="title">Purchase History</h2>
              <p className="subtitle text-light">The Offers you have purchased and the Products you have been granted access to.</p>
            </div>
            <div className="col-8 card-form">
              <div className="panel panel-default panel-form">
                <div className="panel-body">
                  {mySubscription.map((value, index) => {
                    return (
                      <PurchasedCard key={index}
                        date={value.subscription_date}
                        offer={value.access_group?.access_type}
                        price={value.access_group?.regular_price?.toString()}
                        product={value.access_group?.name} />
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className="justify-content-right d-flex">
            <button type="submit" className="btn btn-primary btn-footer sm-full">
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}