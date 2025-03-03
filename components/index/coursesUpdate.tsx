import Link from "next/link"
import { strapiImage } from "../../apiStrapi/models/contact"
import { CoursesLatest, CoursesSoon } from "../../apiStrapi/models/contentType/home"
import Img from "../image"

export default function CoursesUpdate({ coursesSoon, coursesLatest }: { coursesSoon: CoursesSoon[], coursesLatest: CoursesLatest[] }) {
  return (
    <div className="row align-items-center justify-content-center">
      <div className="block-type-text text-center col-12">
        <div className="block box-shadow-none">
          <h1>
            <span className="color-primary ipad-f-s-32 sm-f-s-28">
              คอร์สเปิดตัวล่าสุด
            </span>
          </h1>
        </div>
      </div>
      {coursesLatest?.map((value, index) => {
        return (
          <div key={index} className="block-type-feature text-center col-6">
            <div className="block box-shadow-none">
              <div className="feature column-center">
                <Link href={`/course/${value.course?.id}`}>
                  <a>
                    <Img className="feature-image"
                      src={strapiImage(value.image?.url)}
                      width={600}
                      height={337.5}
                      alt={value.name}
                    />
                  </a>
                </Link>
                <Link href={`/course/${value.course?.id}`}>
                  <a className="btn btn-solid btn-small btn-auto" >ดูรายละเอียดคอร์ส</a>
                </Link>
              </div>
            </div>
          </div>
        )
      })
      }
      <div className="block-type-text text-center col-12">
        <div className="block box-shadow-none">
          <h1>
            <span className="color-primary ipad-f-s-32 sm-f-s-28">
              คอร์สที่กำลังจะเปิดตัว
            </span>
          </h1>
        </div>
      </div>
      {coursesSoon?.map((value, index) => {
        return (
          <div key={index} className="block-type-image col-3">
            <div className="block box-shadow-none">
              <div className="image">
                <Img className="image-image"
                  src={strapiImage(value.image?.url)}
                  alt={value.name}
                  width={349.6}
                  height={196.733}
                />
              </div>
            </div>
          </div>
        )
      })
      }
    </div>
  )
}