import { MouseEventHandler } from "react"
import Popup from "reactjs-popup"
import ButtonPartialLogin from "../buttonPartialLogin"
import ImagePartialLogin from "../imagePartialLogin"

export default function ProductSale({
  saleHeader,
  saleSku,
}: {
  saleHeader: {
    is_purchased: boolean,
    has_annual: boolean,
  },
  saleSku: {
    courseSku: string,
    annualSku: string,
  }
}) {
  return (
    <Popup className="popup-product-sale"
      trigger={
        <button className="btn btn-not-focus btn-small m-t-0">
          ซื้อคอร์สนี้
        </button>
      }
      modal
      closeOnDocumentClick={false}>
      {(close: MouseEventHandler<HTMLButtonElement>) => {
        return (
          <div className="pop-modal">
            <button className="close" onClick={close}>
              <p>
                &times;
              </p>
            </button>
            <div className="block-type-form text-center">
              <div className="block box-shadow-none">
                <h3>
                  สนใจคอร์สเรียนของเราแล้วใช่ไหม?
                </h3>
                <h6>
                  กรุณาเลือกแพ็คเกจที่คุณต้องการ
                </h6>
                {!saleHeader.is_purchased &&
                  <div id="singlebanner" className="feature column-center text-center m-b-40">
                    <ImagePartialLogin
                      sku={saleSku.courseSku}
                      src={"/courseDetail/single-course.jpg"}
                      width={623.183}
                      height={400}
                      alt={"Cariber single Subscription"} />
                    <ButtonPartialLogin
                      sku={saleSku.courseSku}
                      class={"btn btn-not-focus btn-small m-t-10"}
                      text={"ซื้อเฉพาะคอร์สนี้"} />
                  </div>
                }
                {!saleHeader.has_annual &&
                  <div id="yearlybanner" className="feature column-center text-center m-b-20">
                    <ImagePartialLogin
                      sku={saleSku.annualSku}
                      src={"/courseDetail/yearly-sucscription-lg.png"}
                      width={623.183}
                      height={400}
                      alt={"Cariber Yearly Subscription"} />
                    <ButtonPartialLogin
                      sku={saleSku.annualSku}
                      class={"btn btn-small m-t-10"}
                      text={"ซื้อแพ็คเกจรายปี"} />
                  </div>
                }
                {saleHeader.has_annual &&
                  <div id="yearlybanner" className="feature column-center text-center m-b-20">
                    <ImagePartialLogin
                      sku={saleSku.annualSku}
                      src={"/courseDetail/yearly-sucscription-lg.png"}
                      width={623.183}
                      height={400}
                      alt={"Cariber Yearly Subscription"} />
                    <ButtonPartialLogin
                      sku={saleSku.annualSku}
                      class={"btn btn-small m-t-10"}
                      text={"ต่อสมาชิกแพ็คเกจรายปี"} />
                  </div>
                }
              </div>
            </div>
          </div>
        )
      }}
    </Popup>
  )
}