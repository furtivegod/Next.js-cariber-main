import { strapiImage } from "../apiStrapi/models/contact"
import { ReviewStudentContent } from "../apiStrapi/models/contentType/review"
import Img from "./image"

export default function StudentReviews({ reviewStudents }: { reviewStudents: ReviewStudentContent[] }) {
  return (
    <div className="sizer reviewStudents p-t-20">
      <div className="container">
        <div className="row align-items-start justify-content-between">
          <div className="block-type-text text-left col-12">
            <div className="block box-shadow-none">
              <h2 className="text-center">
                <strong>
                  <span className="color-primary">
                    รีวิวจากผู้เรียน
                  </span>
                </strong>
              </h2>
            </div>
          </div>
          {reviewStudents?.map((value, index) => {
            return (
              <div key={index} className="block-type-feature text-center col-2 ipad-p-x-0">
                <div className="block box-shadow-none">
                  <div className="feature">
                    <Img className="feature-image"
                      src={strapiImage(value?.image?.url)}
                      width={175}
                      height={185.917}
                      alt={value?.name}
                    />
                    <div className="feature-text">
                      <p className="text-center ipad-f-s-14 sm-f-s-14">
                        <span className="color-smooth">
                          &quot;{value?.description}&quot;
                        </span>
                      </p>
                      <h4 className="ipad-min-line-height">
                        <span className="color-secondary ipad-f-s-18">
                          {value?.name}
                        </span>
                      </h4>
                      <span className="color-primary">
                        <em>
                          {value?.career}
                        </em>
                      </span>
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