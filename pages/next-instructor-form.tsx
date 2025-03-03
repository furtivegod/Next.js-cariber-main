import Img from "../components/image";

export default function NextInstructorForm() {
  return (
    <div className="background-primary-color h-full-center next-instructor-form">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="block-type-image col-7">
            <div className="block box-shadow-large">
              <div className="image">
                <Img src="/nextInstructorForm/title-image.jpg"
                  width={722.5}
                  height={274.883}
                  alt="ผู้สอนคนต่อไป"
                />
              </div>
            </div>
          </div>
          <div className="block-break" />
          <div id="form" className="block-type-form text-center col-7">
            <div className="block box-shadow-medium">
              <div className="form">
                <div>
                  <h4>
                    อยากให้ใครมาเป็นผู้สอนคนต่อไป
                  </h4>
                  <p>
                    กรอกแบบสอบถามต่อไปนี้หากมีใครที่คุณอยากให้มาเป็นผู้สอนในอนาคต ทีมงานจะนำข้อเสนอแนะไปพิจารณาต่อไป
                  </p>
                </div>
                <form action="">
                  <div>
                    <div className="text-field form-group">
                      <input type="text" className="form-control" placeholder="ผู้สอนคนต่อไป">
                      </input>
                    </div>
                    <div className="text-field form-group">
                      <input type="text" className="form-control" placeholder="อีเมลของคุณ">
                      </input>
                    </div>
                  </div>
                  <button id="form-button" className="form-btn" type="submit">
                    ส่งแบบสอบถาม
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}