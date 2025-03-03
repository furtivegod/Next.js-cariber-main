import { MouseEventHandler, useState } from "react";

export enum Icon {
  play = "fal fa-play-circle",
  lock = "fal fa-lock"
}

export enum Color {
  light = "light",
  dark = "dark"
}

interface AccordionLink {
  callback: MouseEventHandler<HTMLButtonElement>;
  text: string;
}

interface AccordionProps {
  title: string,
  description: string,
  col: number,
  icon?: Icon,
  color: Color,
  button?: AccordionLink,
  progress?: number,
  percentage?: number,
}

export default function Accordion( props: AccordionProps) {
  const [displayDescription, setDisplayDescription] = useState("d-none");
  function switchDisplay() {
    if (props.icon === Icon.lock) {
      return
    }
    displayDescription === "d-none"
      ? setDisplayDescription("d-block")
      : setDisplayDescription("d-none")
  }

  return (
    <div className={`accordion-outside m-0 col-${props.col}`}>
      <div className={`accordion-frame box-shadow-medium block-type-accordion
                        text-left ${props.color}
                        ${displayDescription === "d-block" && ("accordion-frame-active")}`}
        onClick={switchDisplay}>
        <div className={`${props.icon === Icon.lock && ("accordion-non-focus")}
                          ${displayDescription === "d-block" && ("accordion-active")}`}>
          <div className="accordion">
            <div className="accordion-title media align-items-center collapsed">
              {props.icon && (
                <div className="m-r-10">
                  <i className={props.icon} />
                </div>
              )}
              <h5 className="media-body text-title f-s-16 ">
                {props.title}
              </h5>
              {displayDescription === "d-none" ?
                (<i className="fas fa-chevron-right color-primary" />) :
                (<i className="fas fa-chevron-down color-primary" />)}
            </div>
          </div>
        </div>
      </div>
      <div className={`accordion-collapse ${props.color} ${displayDescription}`}>
        <div className={`accordion accordion-body row`}>
          <div className={`${props.button ? ("col-9") : ("col-12")} `}>
            <h6 className="f-s-14 white-space-pre">
              <span>
                {props.description}
              </span>
              <br />
            </h6>
          </div>
          {props.button && (
            <div className="accordion-right col-3">
              <div>
                {(props.progress || props.progress === 0) && (<div>
                  <p className="f-s-12">
                    รับชมแล้ว {props.progress / 10} นาทีจาก 10นาที
                  </p>
                  <div className="player-progress full">
                    <div className="progress-outer">
                      <div className={`progress-inner p-w-${props.percentage}`} />
                    </div>
                  </div>
                </div>)}
                <button onClick={props.button.callback} className="btn btn-small btn-full">
                  {props.button.text}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
