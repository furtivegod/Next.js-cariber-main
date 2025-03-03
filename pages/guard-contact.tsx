import { ChangeEvent, FormEvent, useState } from "react";
import Footer from "../components/footer";
import FormCheckbox from "../components/formCheckbox";
import FormInput from "../components/formInput";
import FormSelect from "../components/formSelect";
import Header from "../components/header";
import Calendar from 'react-calendar';
import Popup from "reactjs-popup";
import Moment from 'moment';
import * as staticData from "../components/static/guardContact";
import { handleChange } from "../functions/handleInput";
import { postContactGuardApi } from "../apiNest/contactGuardApi";
import { useRouter } from "next/router";

export default function GuardContact() {
  const router = useRouter();
  const [interestOtherChecked, setInterestOtherChecked] = useState(false);
  const [interestOther, setInterestOther] = useState("");
  const [personalInterest, setPersonalInterest] = useState([""]);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    province: "",
    post_code: "",
    birth_day: new Date(),
    degree: "",
    occupation: "",
    current_position: "",
    business_type: "",
    personal_interest: ""
  });
  const [errorCheckbox, setErrorCheckbox] = useState({
    isError: false,
    message: "",
  });
  const { redirect } = router.query

  function handleBirthDayChange(value: Date) {
    setFormData(values => ({ ...values, birth_day: value }));
  }

  function handleInterestChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked && !personalInterest.find(element => element === e.target.value)) {
      personalInterest.push(e.target.value);
    }
    if (!e.target.checked && personalInterest.find(element => element === e.target.value)) {
      const index = personalInterest.indexOf(e.target.value, 0);
      if (index > -1) {
        personalInterest.splice(index, 1);
      }
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setErrorCheckbox({
      isError: false,
      message: ""
    });
    const personalInterestOther = personalInterest.find(element => element.includes("Other:"))
    if (interestOtherChecked) {
      if (personalInterestOther) {
        const index = personalInterest.indexOf(personalInterestOther, 0);
        personalInterest[index] = "Other: " + interestOther;
      } else {
        personalInterest.push("Other: " + interestOther);
      }
    }
    const index = personalInterest.indexOf("", 0);
    if (index > -1) {
      personalInterest.splice(index, 1);
    }
    formData.personal_interest = personalInterest.toString();
    if (!formData.personal_interest) {
      setErrorCheckbox({
        isError: true,
        message: "กรุณาเลือก"
      });
      return
    }
    const data = await postContactGuardApi(formData);
    if (data) {
      router.replace(`/${redirect || "library"}`);
    }
  }

  return (
    <div className="background-smooth guard-contact">
      <Header />
      <div className="sizer">
        <div className="container flex-column-center">
          <div className="card-form col-7 p-0">
            <div className="form-guard ">
              <h2>
                โปรไฟล์ของคุณ
              </h2>
              <h5>
                [Guard] Contact Information
              </h5>
            </div>
            <form onSubmit={submit}>
              <div className="form-guard row">
                <div className="col-6 p-0 lg-p-r-15">
                  <FormInput id={"first_name"}
                    label="ชื่อ"
                    description="ภาษาไทย หรือ ภาษาอังกฤษ"
                    type={"text"}
                    required={true}
                    onChange={e => { handleChange(e, setFormData, formData) }} />
                </div>
                <div className="col-6 p-0 lg-p-l-15">
                  <FormInput id={"last_name"}
                    label="สกุล"
                    description="ภาษาไทย หรือ ภาษาอังกฤษ"
                    type={"text"}
                    required={true}
                    onChange={e => { handleChange(e, setFormData, formData) }} />
                </div>
              </div>
              <div className="form-guard">
                <div className="col-6 p-0 lg-p-r-15">
                  <FormInput id={"phone_number"}
                    label="เบอร์โทรศัพท์"
                    type={"text"}
                    required={true}
                    onChange={e => { handleChange(e, setFormData, formData) }} />
                </div>
              </div>
              <div className="form-guard">
                <FormInput id={"address"}
                  label="ที่อยู่"
                  description="เลขที่ หมู่ ซอย ถนน แขวง/ตำบล เขต/อำเภอ"
                  type={"text"}
                  required={true}
                  onChange={e => { handleChange(e, setFormData, formData) }} />
              </div>
              <div className="form-guard">
                <div className="col-6 p-0 lg-p-r-15">
                  <FormSelect id={"province"}
                    label="จังหวัด"
                    required={true}
                    onChange={e => { handleChange(e, setFormData, formData) }}
                    item={staticData.province} />
                </div>
              </div>
              <div className="form-guard">
                <div className="col-6 p-0 lg-p-r-15">
                  <FormInput id={"post_code"}
                    label="รหัสไปรษณีย์"
                    type={"text"}
                    required={true}
                    maxLength={5}
                    onChange={e => { handleChange(e, setFormData, formData) }}/>
                </div>
              </div>
              <div className="form-guard row">
                <Popup trigger={<div>
                  <FormInput id={"birth_day"}
                    label="วัน/ เดือน/ ปีเกิดของคุณ"
                    required={true}
                    type={"text"}
                    onChange={e => { handleChange(e, setFormData, formData) }}
                    value={Moment(formData.birth_day).format('DD/MM/YYYY')} />
                </div>}
                  position="top center"
                  on="click"
                  closeOnDocumentClick
                  contentStyle={{ padding: "0px", border: "none", width: "max-content" }}
                  arrow={false}>
                  <Calendar onChange={handleBirthDayChange} value={formData.birth_day} />
                </Popup>
              </div>
              <div className="form-guard">
                <div className="col-6 p-0 lg-p-r-15">
                  <FormSelect id={"degree"}
                    label="ระดับการศึกษาสูงสุดของคุณ"
                    required={true}
                    onChange={e => { handleChange(e, setFormData, formData) }}
                    item={staticData.educationLevel} />
                  {(formData.degree === "อื่นๆ (โปรดระบุ)" ||
                    !staticData.educationLevel.find(e => e === formData.degree) &&
                    formData.degree) && (
                      <FormInput id={"degree"}
                        type={"text"}
                        required={(formData.degree === "อื่นๆ (โปรดระบุ)" ||
                          !staticData.educationLevel.find(e => e === formData.degree) &&
                          Boolean(formData.degree))}
                        onChange={e => { formData.degree = e.target.value }} />
                    )}
                </div>
              </div>
              <div className="form-guard">
                <div className="col-6 p-0 lg-p-r-15">
                  <FormSelect id={"occupation"}
                    label="อาชีพปัจจุบันของคุณ"
                    required={true}
                    onChange={e => { handleChange(e, setFormData, formData) }}
                    item={staticData.career} />
                  {(formData.occupation === "อื่นๆ (โปรดระบุ)" ||
                    !staticData.career.find(e => e === formData.occupation) &&
                    formData.occupation) && (
                      <FormInput id={"occupation"}
                        type={"text"}
                        required={(formData.occupation === "อื่นๆ (โปรดระบุ)" ||
                          !staticData.career.find(e => e === formData.occupation) &&
                          Boolean(formData.occupation))}
                        onChange={e => { formData.occupation = e.target.value }} />
                    )}
                </div>
              </div>
              <div className="form-guard">
                <FormInput id={"current_position"}
                  label="ตำแหน่งปัจจุบันของคุณ"
                  type={"text"}
                  required={true}
                  onChange={e => { handleChange(e, setFormData, formData) }} />
              </div>
              <div className="form-guard">
                <div className="col-6 p-0 lg-p-r-15">
                  <FormSelect id={"business_type"}
                    label="อุตสาหกรรมของคุณ"
                    required={true}
                    onChange={e => { handleChange(e, setFormData, formData) }}
                    item={staticData.industry} />
                  {(formData.business_type === "อื่นๆ (โปรดระบุ)" ||
                    !staticData.industry.find(e => e === formData.business_type) &&
                    formData.business_type) && (
                      <FormInput id={"business_type"}
                        type={"text"}
                        required={(formData.business_type === "อื่นๆ (โปรดระบุ)" ||
                          !staticData.industry.find(e => e === formData.business_type) &&
                          Boolean(formData.business_type))}
                        onChange={e => { formData.business_type = e.target.value }} />
                    )}
                </div>
              </div>
              <div className="form-guard">
                <label className="color-black">
                  หัวข้อการเรียนที่สนใจ <span className="color-red">*</span>
                </label>
                {errorCheckbox.isError && (
                  <p className="color-red">{errorCheckbox.message}</p>
                )}
                <div className="m-t-10">
                  <FormCheckbox id={"check-1"}
                    label="ธุรกิจและการเงิน"
                    onChange={handleInterestChange}
                  />
                  <FormCheckbox id={"check-2"}
                    label="การงานและอาชีพ"
                    onChange={handleInterestChange}
                  />
                  <FormCheckbox id={"check-3"}
                    label="เทคโนโลยีและนวัตกรรม"
                    onChange={handleInterestChange}
                  />
                  <FormCheckbox id={"check-4"}
                    label="สุขภาพ"
                    onChange={handleInterestChange}
                  />
                  <FormCheckbox id={"check-5"}
                    label="เกมและกีฬา"
                    onChange={handleInterestChange}
                  />
                  <FormCheckbox id={"check-6"}
                    label="ศิลปะและความบันเทิง"
                    onChange={handleInterestChange}
                  />
                  <FormCheckbox id={"check-7"}
                    label="อาหารและโภชนาการ"
                    onChange={handleInterestChange}
                  />
                  <FormCheckbox id={"check-8"}
                    label="การสื่อสารและวัฒนธรรม"
                    onChange={handleInterestChange}
                  />
                  <FormCheckbox id={"check-9"}
                    label="การพัฒนาตนเอง"
                    onChange={handleInterestChange}
                  />
                  <div className="row">
                    <FormCheckbox id={"check-10"}
                      label="Other:"
                      onChange={(e) => { setInterestOtherChecked(e.target.checked) }}
                    />
                    &nbsp;
                    &nbsp;
                    <FormInput id={"other_check"}
                      type={"text"}
                      required={interestOtherChecked}
                      onChange={(e) => { setInterestOther(e.target.value) }} />
                  </div>
                </div>
              </div>
              <div className="form-guard p-15 ">
                <button className="btn btn-small m-l-25" type="submit">
                  บันทึก
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}