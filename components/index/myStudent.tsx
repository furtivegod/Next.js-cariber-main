import { strapiImage } from "../../apiStrapi/models/contact"
import { MyStudentContent } from "../../apiStrapi/models/contentType/home"
import Img from "../image"

export default function MyStudent({ myStudents }: { myStudents: MyStudentContent[] }) {
  return (
    <div className="row align-items-center justify-content-center">
      <div className="block-type-text text-left col-6">
        <div className="block box-shadow-none" >
          <p className="f-s-36 text-center">
            <strong>
              <span className="color-primary">
                ผู้เรียนของเรา
              </span>
            </strong>
          </p>
        </div>
      </div>
      <div className="block-break"></div>
      {myStudents?.map((value, index) => {
        return (
          <div key={index} className="block-type-image col-2 m-r-5 sm-max-w-200">
            <div className="block box-shadow-none">
              <div className="image">
                <Img className="image-image"
                  src={strapiImage(value.image?.url)}
                  width={value.image?.width}
                  height={value.image?.height}
                  alt={value.name}
                />
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}