import Img from "./image"

export default function FooterBrand() {
  return (
    <div className="footer-brand">
      <div className="section background-dark">
        <div className="sizer">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="block-type-image col-5">
                <div className="block box-shadow-none background-unrecognized aos-init aos-animate">
                  <div className="image">
                    <Img className="image-image"
                      src="/footerBrand/footer-brand-logo.png"
                      width={450}
                      height={156.967} 
                      alt="Brand Logo"
                      />
                  </div>
                </div>
              </div>
              <div className="block-type-text text-left col-6">
                <p className="f-s-18">
                  <strong>
                    <span className="color-smooth">
                      Cariber แพลตฟอร์มการเรียนรู้บนแนวคิด &quot;ความสำเร็จที่เรียนรู้ได้&quot;
                    </span>
                  </strong>
                </p>
                <p className="f-s-14">
                  <span className="color-smooth">
                    ใครว่าประสบการณ์เป็นสิ่งที่สอนกันไม่ได้? ที่ Cariber ผู้เชี่ยวชาญจากหลายแวดวงจะมาถ่ายทอดค
                  </span>
                  <span className="color-smooth">
                    วามรู้พร้อมถอดบทเรียนจากประสบการณ์ตรงให้ทุกคนฟัง ว่ากว่าจะมายืนบนจุดที่เรียกว่าควา
                  </span>
                  <span className="color-smooth">
                    มสำเร็จ พวกเขาต้องผ่านบททดสอบอะไรมาบ้าง แล้วประสบการณ์ที่ผ่านมา สอนอะไรให้กับพวกเขา
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}