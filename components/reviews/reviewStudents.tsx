import { strapiImage } from "../../apiStrapi/models/contact";
import { ReviewStudentContent } from "../../apiStrapi/models/contentType/review";
import Img from "../image";

export default function ReviewStudents({ reviewStudent }: { reviewStudent: ReviewStudentContent }) {
  return (
    <div className="block-type-feature text-left col-12">
      <div className="block box-shadow-large background-light">
        <div className="feature">
          <Img className="feature-image"
            src={strapiImage(reviewStudent.image?.url)}
            alt={reviewStudent.name}
            width={100}
            height={100}
          />
          <div className="feature-text">
            <h4>
              <span className="color-secondary">
                {reviewStudent.name}
              </span>
            </h4>
            <p>
              <span className="color-primary">
                <em>
                  {reviewStudent.career}
                </em>
              </span>
            </p>
            <p>
              <br />
              <span className="color-black">
                &quot;
                {reviewStudent.description}
                &quot;
              </span>
            </p>
            <p>
              <strong>
                <span className="color-primary">
                  Cariber
                </span>
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}