import { VideoComponent } from "../../apiStrapi/models/component/video";
import ButtonPartialLogin from "../buttonPartialLogin";
import ImagePartialLogin from "../imagePartialLogin";
import VideoPlayer from "../videoPlayer";

export interface CourseDetailCourseHeaderProps {
  yearlySubscriptionImage: string;
  yearlySubscriptionCheckoutSku: string;
  yearlySubscriptionImageMobile: string,
  singleCourseImage: string;
  teaserVideo: VideoComponent;
  singleCheckoutSku: string;
}

export default function CourseHeader({ yearlySubscriptionImage,
  yearlySubscriptionImageMobile,
  yearlySubscriptionCheckoutSku,
  singleCourseImage,
  teaserVideo,
  singleCheckoutSku }: CourseDetailCourseHeaderProps) {
  return (
    <div className="background-dark">
      <div className="sizer p-t-0">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="block-type-code text-left col-3 sm-none p-0">
              <div className="block box-shadow-none">
                <div className="image">
                  <ImagePartialLogin
                    sku={yearlySubscriptionCheckoutSku}
                    src={yearlySubscriptionImage}
                    width={384.6}
                    height={246.85}
                    alt={"Cariber Yearly Subscription"} />
                </div>
                <div className="image">
                  <ImagePartialLogin
                    sku={singleCheckoutSku}
                    src={singleCourseImage}
                    width={384.6}
                    height={246.85}
                    alt={"Cariber Single Subscription"} />
                </div>
              </div>
            </div>
            <div className="block-type-video col-8">
              <div className="block box-shadow-none">
                <div className="video">
                  {teaserVideo && <VideoPlayer props={teaserVideo} imageStrapi={true} />}
                </div>
              </div>
            </div>
            <div className="block-type-video col-8 ipad-none lg-none">
              <div className="block box-shadow-none">
                <div className="image text-center column-center">
                  <ImagePartialLogin
                    sku={yearlySubscriptionCheckoutSku}
                    src={yearlySubscriptionImageMobile}
                    width={400}
                    height={400}
                    alt={"Cariber Yearly Subscription"} />
                  <ButtonPartialLogin
                    sku={yearlySubscriptionCheckoutSku}
                    class={"btn btn-medium btn-solid btn-auto background-dark"}
                    text={"ซื้อแพ็กเกจรายปี"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}