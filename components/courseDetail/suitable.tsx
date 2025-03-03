import { Item } from "../../apiStrapi/models/contentType/courses"

export default function Suitable({ suitable }: { suitable: Item[] }) {
  const halfLine = 60
  return (
    <div className="background-dark">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="block-type-text text-left col-6">
            <div className="block box-shadow-none">
              <p className="f-s-26 text-center">
                <span className="color-secondary">
                  <strong>
                    คอร์สนี้เหมาะสำหรับ
                  </strong>
                </span>
              </p>
            </div>
          </div>
          <div className="block-type-text text-left col-10">
            <div className="block box-shadow-none row">
              {suitable.map((value) => {
                if (value.label) {
                  return (
                    <h6 key={`suitable-id-${value.id}`}
                      className={`${value.label.length <= halfLine && "col-6"} ${value.label.length > halfLine && "col-12"} p-y-7 p-r-0 p-l-30`}>
                      <strong>
                        <span className="color-secondary">
                          ✓ &nbsp;
                        </span>
                        <span className="color-smooth">
                          {value.label}
                        </span>
                      </strong>
                    </h6>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}