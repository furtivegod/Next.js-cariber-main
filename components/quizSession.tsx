import React, { useState } from "react";
import Img from "./image";
import { CourseLMS, Quiz } from "../apiNest/models/content/courseLms";


export interface QuizProps {
  quiz: Quiz | null;
  course: CourseLMS,
  restart: Function,
}

export default function QuizSession(props: QuizProps ){

  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);

  async function submit() {
    setIsCorrect(selectedChoice === props.quiz?.correct_choice);
    setSubmitted(true);
  }

  function restart() {
    setSubmitted(false);
    setSelectedChoice(null);
  }

  function getCorrectChoiceDesc() {
    return props.quiz?.choice
            .filter(item => item.choice_number === props.quiz?.correct_choice)[0]
            .choice_description;
  }

  return <>
    <div className='quiz-container'>
      { !submitted
        ?
        <>
          <div className='quiz-header'>
            <p className='question'>
              {props.quiz?.question}
            </p>
          </div>

          <div className="quiz-body">
            {props.quiz?.choice.map((eachChoice, index) => {
              return <div key={index}
                          className={`choice-row ${selectedChoice === eachChoice.choice_number && 'selected'}`}
                          onClick={() => setSelectedChoice(eachChoice.choice_number)}>
                  <span className='title'>
                    <div className={`title-box ${selectedChoice === eachChoice.choice_number && 'selected'}`}>
                      { eachChoice.choice_number }
                    </div>
                  </span>
                <span className='description'>{ eachChoice.choice_description }</span>
              </div>
            })}
          </div>

          <div className="quiz-footer">
            <button className='quiz-submit'
                    disabled={!selectedChoice}
                    onClick={submit}>
              Submit
            </button>
          </div>
        </>
        :
        <div className='submitted'>
          { isCorrect
            ?
              <>
                <Img src="/check-circle.svg"
                     width={60}
                     height={60}/>
                <h3 className='f-w-300 m-t-30 m-b-20'>
                  Quiz for {props.quiz?.episode_number} : {props.course.course_name}
                </h3>
                <h4 className='m-b-50'> คำตอบที่คุณเลือกเป็นคำตอบที่ถูกต้อง </h4>
              </>
            :
              <>
                <Img src="/cross-circle.svg"
                     width={60}
                     height={60}/>
                <h3 className='f-w-300 m-t-30 m-b-20'>
                  Quiz for {props.quiz?.episode_number} : {props.course.course_name}
                </h3>
                <h4>คำตอบที่คุณเลือกเป็นคำตอบที่ผิด</h4>
                <h4 className='m-b-50'>
                  เฉลย {props.quiz?.correct_choice} : {getCorrectChoiceDesc()}
                </h4>
              </>
          }

          <button className='quiz-submit f-s-18'
                  onClick={restart}>
            Restart
          </button>
        </div>
      }
    </div>
  </>
}