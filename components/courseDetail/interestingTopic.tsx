import { strapiImage } from "../../apiStrapi/models/contact"
import { Topics } from "../../apiStrapi/models/contentType/courses"
import Img from "../image"

export default function InterestingTopic({ interestingTopics }: { interestingTopics: Topics[] }) {
  return (
    <div className="background-dark">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="block-type-text text-center col-6">
            <div className="block box-shadow-none">
              <p className="f-s-24 text-center">
                <strong>
                  <span className="color-secondary">
                    หัวข้อที่น่าสนใจ
                  </span>
                </strong>
              </p>
            </div>
          </div>
          <div className="block-break"></div>
          {interestingTopics.map((value, index) => {
            return (
              <div key={index} className="block-type-feature text-center col-2">
                <div className="block box-shadow-none">
                  <div className="feature">
                    <Img className="feature-image"
                      src={strapiImage(value.image.url)}
                      width={50}
                      height={50}
                      alt={value.label}
                    />
                    <div className="feature-text">
                      <p className="f-s-14 text-canter">
                        <strong>
                          <span className="color-smooth">
                            {value.label}
                          </span>
                        </strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}