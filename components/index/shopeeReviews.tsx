import Link from "next/link"
import { strapiImage } from "../../apiStrapi/models/contact"
import { Shopee, ShopeeInfo } from "../../apiStrapi/models/contentType/home"
import Img from "../image"

interface ShopeeReviewsProps{
  shopeeInfo: ShopeeInfo, 
  shopee: Shopee[]
}

export default function ShopeeReviews({ shopeeInfo, shopee }: ShopeeReviewsProps) {
  return (
    <div className="row align-items-start justify-content-between">
      <div className="block-type-feature text-center col-3">
        <div className="block box-shadow-none">
          <div className="feature">
            <Img className="feature-image"
              src={strapiImage(shopeeInfo?.image?.url)}
              width={200}
              height={65.9}
              alt="Shopee Review"
            />
            <div className="feature-text">
              <h5 className="text-center">
                <span className="color-smooth">
                  {shopeeInfo?.ratings} stars rating
                </span>
              </h5>
              <h5 className="text-center m-b-30 ipad-f-s-14">
                <strong>
                  <span>
                    {"⭐️".repeat(Math.round(shopeeInfo?.ratings))}
                  </span>
                </strong>
              </h5>
              <h5 className="ipad-f-s-16">
                <span className="color-smooth">
                  จากทั้งหมด {shopeeInfo?.quantity_review} รีวิวใน Shopee
                </span>
              </h5>
            </div>
            <Link href="/reviews">
              <a className="btn btn-solid btn-small btn-auto m-0">
                คลิกเพื่อดูรีวิวทั้งหมด
              </a>
            </Link>
          </div>
        </div>
      </div>
      {shopee?.map((value, index) => {
        return (
          <div key={index} className="block-type-feature text-center col-2 ipad-p-x-0">
            <div className="block box-shadow-none">
              <div className="feature">
                <div className="feature-text">
                  <h5 className="text-center ipad-f-s-14">
                    <strong>
                      <span>
                      {"⭐️".repeat(value.ratings)}
                      </span>
                    </strong>
                  </h5>
                  <p className="text-center ipad-f-s-14 sm-f-s-14">
                    <span className="color-smooth">
                      &quot;{value.description}&quot;
                    </span>
                  </p>
                  <h6 className="f-s-16 text-center ipad-f-s-12">
                    <em>
                      <span className="color-smooth">
                        <strong>
                          {value.name}
                        </strong>
                      </span>
                    </em>
                    <br />
                    <em>
                      <span className="color-smooth">
                        <strong>
                          {value.date}
                        </strong>
                      </span>
                    </em>
                  </h6>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}