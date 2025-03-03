import Img from "../components/image";
import Footer from "../components/footer";
import Header from "../components/header";
import FooterBrand from "../components/footerBrand";
import { strapiImage } from "../apiStrapi/models/contact";
import { CourseContent } from "../apiStrapi/models/contentType/courses";
import { ResponseData, ResponseDataList } from "../apiStrapi/models/data";
import Link from "next/link";
import { coursesAllApi, seasonalPromotionApi } from "../apiStrapi/StrapiApiService";
import { SeasonalPromotionContent } from "../apiStrapi/models/contentType/seasonalPromotion";
import ImagePartialLogin from "../components/imagePartialLogin";
import FormInput from "../components/formInput";
import { FormEvent, useEffect, useState } from "react";
import { handleChange } from "../functions/handleInput";

interface CoursesProps {
  courses: ResponseDataList<CourseContent>;
  seasonalPromotion: ResponseData<SeasonalPromotionContent>;
}

interface SortProps {
  text: string,
  functionSort: (a: CourseContent, b: CourseContent) => 1 | -1
}

const sortList: SortProps[] = [
  { text: "ไม่เรียงลำดับ", functionSort: (a: CourseContent, b: CourseContent) => a.id > b.id ? 1 : -1 },
  { text: "ชื่อผู้สอน มากไปน้อย", functionSort: (a: CourseContent, b: CourseContent) => a.speaker_name < b.speaker_name ? 1 : -1 },
  { text: "ชื่อผู้สอน น้อยไปมาก", functionSort: (a: CourseContent, b: CourseContent) => a.speaker_name > b.speaker_name ? 1 : -1 },
  { text: "ชื่อคอร์ส มากไปน้อย", functionSort: (a: CourseContent, b: CourseContent) => a.course_name < b.course_name ? 1 : -1 },
  { text: "ชื่อคอร์ส น้อยไปมาก", functionSort: (a: CourseContent, b: CourseContent) => a.course_name > b.course_name ? 1 : -1 },
]

export default function Courses({ courses, seasonalPromotion }: CoursesProps) {
  const [localCourses, setLocalCourses] = useState<CourseContent[]>([{} as CourseContent]);
  const [sortPopup, setSortPopup] = useState<boolean>(false);
  const [filterProps, setFilterCourses] = useState({
    search: "",
    sortText: "ไม่เรียงลำดับ",
    functionSort: (a: CourseContent, b: CourseContent) => a.id > b.id ? 1 : -1
  });

  const search = (event: FormEvent) => {
    event.preventDefault();
    const filterCourses = courses.data?.filter(course =>
      course.speaker_name.toLowerCase().includes(filterProps.search.toLowerCase()) ||
      course.course_name.toLowerCase().includes(filterProps.search.toLowerCase()));
    setLocalCourses(filterCourses);
  }

  const sort = (sort: SortProps) => {
    setFilterCourses({ ...filterProps, functionSort: sort.functionSort, sortText: sort.text })
  }

  useEffect(() => {
    setLocalCourses(courses.data);
  }, []);

  return (
    <div className="background-image courses">
      <Header />
      <div className="sizer">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            {seasonalPromotion.data?.attributes?.display && (
              <div className="block-type-image text-col-12 m-b-0">
                <div className="block box-shadow-none background-unrecognized">
                  <ImagePartialLogin
                    sku={seasonalPromotion.data?.attributes?.sku}
                    src={strapiImage(seasonalPromotion.data?.attributes?.image?.data?.attributes?.url)}
                    width={1260}
                    height={282.017}
                    alt={"Promotion"} />
                </div>
              </div>
            )}
            <div className="block-type-text text-left col-12">
              <div className="block box-shadow-none background-unrecognized">
                <h2 className="color-primary text-center">
                  คอร์สทั้งหมด
                </h2>
              </div>
            </div>
            <div className="search-zone col-12">
              <form className="search-row" onSubmit={search}>
                <div className="m-l-15 m-b-0 m-t-8 col-4 p-0">
                  <FormInput
                    id={"search"}
                    type={"text"}
                    placeholder="ค้นหาบทเรียน"
                    required={false}
                    onChange={e => handleChange(e, setFilterCourses, filterProps)} />
                </div>
                <button type="submit" className="btn btn-box btn-small m-l-15 p-10 btn-min-w-fit">
                  ค้นหา
                </button>
                <div className="sort-container">
                  <button className="btn btn-box btn-small m-x-0 p-10"
                    onClick={() => setSortPopup(!sortPopup)}>
                    เรียงลำดับ : {filterProps.sortText}
                  </button>
                  <div className={`sort-item ${!sortPopup && "none"}`}>
                    {sortList?.map((value, index) => {
                      return (
                        <button key={index} className="button-sort" onClick={() => sort(value)}>
                          {value.text}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </form>
            </div>
            <div className="grid-container col-12 p-0">
              {localCourses && localCourses?.sort(filterProps.functionSort).map((value, index) => {
                return (
                  <div key={index} className="block-type-feature text-center p-10">
                    <div className="block box-shadow-large background-white p-12 b-r-4">
                      <div>
                        <div className="feature">
                          <Link href={`/course/${value?.id}`}>
                            <a className={`${!value?.publishedAt && "disabled"} course-image`}>
                              <Img className="feature-image"
                                src={strapiImage(value?.speaker_image?.url)}
                                alt={value?.speaker_name}
                                width={500}
                                height={281.238095} />
                              {!value?.publishedAt && <p className="text-coming">Coming soon</p>}
                            </a>
                          </Link>
                          <div className="feature-text">
                            <Link href={`/course/${value?.id}`}>
                              <a className={`${!value?.publishedAt && "disabled"}`}>
                                <h5 className="color-darkblue f-w-500 m-0">
                                  {value.speaker_name}
                                </h5>
                              </a>
                            </Link>
                            <Link href={`/course/${value?.id}`}>
                              <a className={`${!value?.publishedAt && "disabled"}`}>
                                <p className="f-s-12 f-w-500 m-0">
                                  {value.course_name}
                                </p>
                              </a>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            {!localCourses && <div className="text-center w-100">ไม่พบคอร์ส</div>}
          </div>
        </div>
      </div>
      <FooterBrand />
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  try {
    return {
      props: {
        courses: await coursesAllApi(),
        seasonalPromotion: await seasonalPromotionApi(),
      }
    }
  } catch (error) {
    console.error(error);
    return {
      props: {
        data: JSON.stringify(error)
      }
    };
  }
};
