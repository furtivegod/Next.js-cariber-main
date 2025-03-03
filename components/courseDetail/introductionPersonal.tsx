import { strapiImage } from "../../apiStrapi/models/contact";
import { SpeakerDetails } from "../../apiStrapi/models/contentType/courses";
import Img from "../image";

export interface IntroductionPersonal {
  fullName: string,
  personalHistoryImage: string,
  highRatio: number,
}

export default function IntroductionPersonal({ speakerDetails, fullName }: { speakerDetails: SpeakerDetails[], fullName: string }) {
  return (
    <div className="background-dark">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="block-type-text text-left col-12">
            <div className="block box-shadow-none">
              <h3 className="text-center m-0">
                <span className="color-secondary">
                  <strong>
                    รู้จัก{fullName}
                  </strong>
                </span>
              </h3>
            </div>
          </div>
          <div className="block-type-image text-center col-8 m-y-50">
            <div className="block box-shadow-none speaker-detail-block">
              {speakerDetails.map((value, index) => {
                return (
                  <div key={index} className="item-speaker-detail">
                    <div className="p-x-10 min-w-120">
                      <Img src={strapiImage(value.image?.url)}
                        width={100}
                        height={100} />
                    </div>
                    <div className="speaker-description">
                      <p>
                        {value.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}