import Header from '../components/header';
import Footer from '../components/footer';
import Accordion, { Color } from '../components/accordion';
import SlideCourse from '../components/slideCourse';
import FooterBrand from '../components/footerBrand';
import ShopeeReviews from '../components/index/shopeeReviews';
import Specific from '../components/index/specific';
import MyStudent from '../components/index/myStudent';
import CoursesUpdate from '../components/index/coursesUpdate';
import StudentReviews from '../components/studentReviews';
import { ResponseData, ResponseDataList } from '../apiStrapi/models/data';
import { ReviewContent } from '../apiStrapi/models/contentType/review';
import { HomeContent } from '../apiStrapi/models/contentType/home';
import { strapiImage } from '../apiStrapi/models/contact';
import VideoPlayer from '../components/videoPlayer';
import { CarouselContent } from '../apiStrapi/models/contentType/carousel';
import ImagePartialLogin from '../components/imagePartialLogin';
import ButtonPartialLogin from '../components/buttonPartialLogin';
import { annualPromotionApi, carouselApi, homeApi, reviewApi } from '../apiStrapi/StrapiApiService';
import { AnnualPromotionContent } from '../apiStrapi/models/contentType/annualPromotion';

interface IndexProps {
  carousel: ResponseDataList<CarouselContent>;
  home: ResponseData<HomeContent>;
  review: ResponseData<ReviewContent>;
  annualPromotion: ResponseData<AnnualPromotionContent>
}

export default function Index({ carousel, home, review, annualPromotion }: IndexProps) {
  return (
    <div className="index">
      <Header />
      <div className="background-dark">
        <div className="sizer p-t-0">
          <div className="container lg-p-x-0">
            <div className="row align-items-center justify-content-center">
              <div className="text-center col-12">
                <h2 className="sm-f-s-24 sm-line-height sm-m-b-20">
                  <strong>
                    <span className="color-primary">
                      สูตรความสำเร็จกับ <br className="lg-none" />&quot;ที่สุด&quot; ของประเทศ
                    </span>
                  </strong>
                </h2>
                <h5 className="sm-line-height">
                  <em>
                    <strong>
                      <span className="color-primary sm-f-s-16">
                        คอร์สออนไลน์กับผู้บริหาร ผู้นำทางความคิด <br className="lg-none" /> แบบที่ไม่เคยมีมาก่อน
                      </span>
                    </strong>
                  </em>
                </h5>
              </div>
              <div className="block-type-feature text-center col-4">
                <div className="block box-shadow-none">
                  <div className="feature column-center">
                    <ImagePartialLogin
                      sku={annualPromotion.data?.attributes?.sku}
                      src={strapiImage(annualPromotion.data?.attributes?.image?.data?.attributes?.url)}
                      width={416}
                      height={267}
                      alt={"Yearly Subscription"} />
                    <div className='row p-w-100 justify-content-around'>
                      <ButtonPartialLogin
                        sku={annualPromotion.data?.attributes?.sku}
                        class={'btn btn-large'}
                        text={' ซื้อแพ็คเกจรายปี '}
                        classText="f-s-14" />
                      <ButtonPartialLogin
                        sku={'/trial-library'}
                        class={'btn btn-large btn-black-outlet'}
                        text={'ทดลองเรียนฟรี'}
                        classText="f-s-14"
                        classIStart='fal fa-megaphone f-s-14 m-r-5' />
                    </div>
                  </div>
                </div>
              </div>
              <div className="block-type-image text-center col-8">
                <div className="box-shadow-none">
                  <br />
                  <VideoPlayer props={{ ...home.data?.home_video }} imageStrapi={true} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="background-light">
        <div className="sizer">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="block-type-text text-left col-12">
                <div className="block box-shadow-none">
                  <h2 className="text-center ipad-line-height">
                    <strong>
                      <span className="color-primary ipad-f-s-32 sm-f-s-22">
                        ปีใหม่นี้ยกระดับให้คุณเป็นคนใหม่
                        <br className="lg-none" />
                        <span className="ipad-f-s-24 sm-f-s-18">
                          เรียนรู้กับ &lsquo;ผู้นำตัวจริง&rsquo; จากทุกวงการ
                        </span>
                        <br />
                      </span>
                      <span className="color-primary sm-none">
                        จ่ายครั้งเดียวเข้าชมผู้สอนได้กว่า 50 ท่านตลอดปี 2022
                        <br />
                      </span>
                    </strong>
                  </h2>
                </div>
              </div>
              <div className="block-type-feature text-center col-5">
                <div className="block box-shadow-none">
                  <div className="feature column-center">
                    <ImagePartialLogin
                      sku={annualPromotion.data?.attributes?.sku}
                      src={strapiImage(annualPromotion.data?.attributes?.image_mobile?.data?.attributes?.url)}
                      width={400}
                      height={400}
                      alt={'Yearly Subscription'} />
                    <ButtonPartialLogin
                      text={'ซื้อแพ็คเกจรายปี'}
                      class='btn btn-solid btn-medium btn-auto'
                      sku={annualPromotion.data?.attributes?.sku}
                    />
                  </div>
                </div>
              </div>
              <div className="block-type-code text-left col-6">
                <SlideCourse slideCourses={carousel.data} slideView={2} imageWidth={232.85} imageHeight={425.05} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="background-dark">
        <div className="sizer">
          <div className="container">
            <Specific specifics={home.data?.information} />
          </div>
        </div>
      </div>
      <div className="background-light">
        <div className="sizer">
          <div className="container">
            <CoursesUpdate coursesSoon={home.data?.courses_soon} coursesLatest={home.data?.courses_latest} />
          </div>
        </div>
      </div>
      <div className="background-dark">
        <StudentReviews reviewStudents={review?.data?.student} />
        <div className="sizer p-t-20">
          <div className="container">
            <ShopeeReviews shopeeInfo={home.data?.shopee_info} shopee={home.data?.shopee} />
          </div>
        </div>
      </div>
      <div className="sizer background-light">
        <div className="container">
          <MyStudent myStudents={home.data?.my_student} />
        </div>
      </div>
      <div className="sizer background-light">
        <div className="container">
          <div className="row align-items-start justify-content-center">
            <div className="block-type-text text-left col-8">
              <div className="block box-shadow-none">
                <h2 className="text-center">
                  <span className="color-primary">
                    คำถามที่พบบ่อย
                  </span>
                </h2>
              </div>
            </div>
            {home.data?.q_and_a?.map((value, index) => {
              return (
                <Accordion key={index} title={value.title} description={value.description} col={8} color={Color.light} />
              )
            })}
          </div>
        </div>
      </div>
      <FooterBrand />
      <Footer />
    </div >
  )
}

export async function getStaticProps() {
  return {
    props: {
      carousel: await carouselApi(),
      home: await homeApi(),
      review: await reviewApi(),
      annualPromotion: await annualPromotionApi(),
    }
  };
}