import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { myCourseApi } from "../apiNest/myCourseApi";
import Footer from "../components/footer";
import FooterBrand from "../components/footerBrand";
import Header from "../components/header";
import Img from "../components/image";
import Pagination from "../components/pagination";

export default function TrialLibrary() {
  const [loadingItem, setLoadingItem] = useState(true);
  const router = useRouter();
  const [myCourse, setMyCourse] = useState({
    id: "",
    email: "",
    status: "",
    course_list: [{
      id: 0,
      speaker_name: "",
      description: "",
      expires_date: "",
      course_name: "",
      thumbnail_image: "",
    }]
  });

  useEffect(() => {
    fetchData();
  }, [])

  async function fetchData() {
    const data = await myCourseApi();
    data && setMyCourse(data);
    setLoadingItem(false);
  }

  return (
    <div className="background-image library">
      <Header />
      <div className="sizer-full align-items-start p-b-80">
        <div className="container m-t-30">
          <div className="row products-list">
            <div className="col-12 products-col">
              <div className="flex-column-center">
                <h4 className="products-title m-b-40">
                  <strong>
                    คอร์สเรียนฟรีของฉัน
                  </strong>
                </h4>
                <div className="box-shadow-none align-self-start">
                  <div>
                    <p className="color-black m-0">
                      เรียนฟรีได้ถึงวันที่ 10/01/65
                      <span className="sm-none ipad-none">
                      &nbsp;
                        &#9679;
                      &nbsp;
                      </span>
                      <br className="lg-none" />
                      เวลาจะหมดภายใน
                      &nbsp;
                      <span className="day-left-trial">
                        2
                      </span>
                      &nbsp;
                      วัน
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {!loadingItem && myCourse?.course_list?.map((value, index) => {
              return (
                <div key={index} className="block-type-feature text-center col-4">
                  <div className="block box-shadow-large background-white p-12 b-r-4">
                    <div className="feature">
                      <Link href={`/product/${value.id}`}>
                        <a>
                          <Img className="feature-image"
                            src={value.thumbnail_image}
                            alt={value.speaker_name}
                            width={366}
                            height={205.866} />
                        </a>
                      </Link>
                    </div>
                    <div className="feature-text h-120 p-t-15">
                      <div className="text-left">
                        <h6 className="color-black ipad-f-s-14">คอร์สเรียน: {value.course_name}</h6>
                        <p className="f-s-14 ipad-f-s-12">สอนโดย {value.speaker_name}</p>
                      </div>
                    </div>
                    <Link href={""}>
                      <a className="btn">
                        <h6 className="m-0 color-white  ipad-f-s-12">
                          ทดลองเรียนฟรีเลย!
                        </h6>
                      </a>
                    </Link>
                  </div>
                </div>
              )
            })}
            <Pagination page={Number(router.query.page)} pageCount={1} />
          </div>
        </div>
      </div>
      <FooterBrand />
      <Footer />
    </div>
  )
}