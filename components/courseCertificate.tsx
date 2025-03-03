import {CourseLMS, Quiz} from "../apiNest/models/content/courseLms";
import React, { useState } from "react";
import {getCertificate, submitEvaluation} from "../apiNest/myCourseApi";
import Img from "./image";

export interface QuizProps {
  course: CourseLMS,
  restart: Function,
}

export default function CourseCertificate(props: QuizProps ){

  async function downloadCertificate() {
    const certificate = await getCertificate(props.course.id)
    const pdf = new Blob([certificate], { type: 'application/pdf' });
    const url = URL.createObjectURL(pdf);
    var a = document.createElement("a");
    a.href = url;
    a.download = `${props.course.course_name.split(" ").join("-")}-Certificate-${new Date().toISOString().slice(0,10)}`;
    a.click();
  }

  return <>
    <div className='quiz-container'>
        <div className='submitted'>
          <Img src="/check-circle.svg"
               width={60}
               height={60}/>

          <h3 className='f-w-300 m-t-30 m-b-20'> {props.course.course_name}  </h3>

          <h4 className=''> ขอบคุณที่ร่วมเรียนรู้ไปด้วยกันกับ Cariber </h4>
          <h4 className='m-b-50'> กดที่ปุ่มเพื่อดาวน์โหลด Certificate </h4>

          <button className='quiz-submit f-s-18'
                  onClick={() => downloadCertificate()}>
            Download
          </button>
        </div>
    </div>
  </>
}