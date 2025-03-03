import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { checkContactGuardApi } from "../apiNest/checkContactGuardApi";
import {LastWatchedEp, MyCourseContent, MyCourseItem} from "../apiNest/models/content/myCourse";
import {getLastWatchedEpisode, myCourseApi} from "../apiNest/myCourseApi";
import Footer from "../components/footer";
import FooterBrand from "../components/footerBrand";
import FormInput from "../components/formInput";
import Header from "../components/header";
import Img from "../components/image";
import { handleChange } from "../functions/handleInput";
import {getOnGoingEpisodesForCourse} from "../apiNest/courseLmsApi";

interface SortProps {
  text: string,
  functionSort: (a: MyCourseItem, b: MyCourseItem) => 1 | -1
}

const sortList: SortProps[] = [
  { text: "ไม่เรียงลำดับ", functionSort: (a: MyCourseItem, b: MyCourseItem) => a.id > b.id ? 1 : -1 },
  { text: "ชื่อคอร์ส มากไปน้อย", functionSort: (a: MyCourseItem, b: MyCourseItem) => a.course_name < b.course_name ? 1 : -1 },
  { text: "ชื่อคอร์ส น้อยไปมาก", functionSort: (a: MyCourseItem, b: MyCourseItem) => a.course_name > b.course_name ? 1 : -1 },
]

export default function Library() {
  const [loadingItem, setLoadingItem] = useState(true);
  const [sortPopup, setSortPopup] = useState<boolean>(false);
  const [checkedContactGuard, setCheckedContactGuard] = useState<boolean>(false);
  const router = useRouter();
  const [myCourse, setMyCourse] = useState({} as MyCourseContent);
  const [myCourseList, setMyCourseList] = useState<MyCourseItem[]>([{} as MyCourseItem]);
  const [filterProps, setFilterCourses] = useState({
    search: "",
    sortText: "ไม่เรียงลำดับ",
    functionSort: (a: MyCourseItem, b: MyCourseItem) => a.id > b.id ? 1 : -1
  });
  const [lastWatchedEp, setLastWatchedEP] = useState<LastWatchedEp | null>(null);

  const search = (event: FormEvent) => {
    event.preventDefault();
    const filterCourseList = myCourse.course_list.filter(course =>
      course.course_name.toLowerCase().includes(filterProps.search.toLowerCase()) ||
      course.description.toLowerCase().includes(filterProps.search.toLowerCase()));
    setMyCourseList(filterCourseList);
  }

  const sort = (sort: SortProps) => {
    setFilterCourses({ ...filterProps, functionSort: sort.functionSort, sortText: sort.text })
  }

  useEffect(() => {
    fetchData().then(() => {});
    getLastWatchedEp().then(() => {});
  }, [])

  async function fetchData() {
    const data = await myCourseApi();
    if (data) {
      setMyCourse(data);
      data.course_list && setMyCourseList(data.course_list);
    }
    setLoadingItem(false);
  }

  async function getLastWatchedEp(): Promise<void> {
    const lastEpisode = await getLastWatchedEpisode();
    if (lastEpisode) {
      lastEpisode.url = getURL(lastEpisode.courseID?.id, lastEpisode.episodeID?.id);
      setLastWatchedEP(lastEpisode);
    }
  }

  function getURL(courseID: number | null, epID: number | null ): string {
    let url = courseID ? `/product?proId=${courseID}` : '';
    return url.concat(epID ? `&epID=${epID}` : '');
  }

  async function getLastEpForEachCourse(course: MyCourseItem): Promise<void> {
    const courseID = +course.id!;
    const data = await getOnGoingEpisodesForCourse(courseID);
    const lastEPID = data[data.length - 1]?.episodeID || null;
    router.push(getURL(courseID, lastEPID)).then(() => {});
  }

  function getPercentage(value: MyCourseItem): number {
    return Math.round(((value.watchedEpisodes && value.watchedEpisodes[0]?.numberOfWatchedEpisode || 0) / (value.episode?.length || 0)) * 100);
  }

  function getName(): string {
    if (lastWatchedEp) {
      return ((lastWatchedEp?.courseID?.course_name || '') + ' - ' + (lastWatchedEp?.episodeID?.episode_name || ''));
    }
    if (myCourseList.length) {
      return (myCourseList[0]?.course_name || '') + ' - ' + (myCourseList[0]?.episode && myCourseList[0]?.episode[0]?.episode_name || '');
    }
    return '';
  }

  if (!checkedContactGuard) {
    checkContactGuardApi().then((value) => {
      if (value?.statusCode === 400) {
        router.replace("/guard-contact");
        return (
          <div></div>
        )
      }
    });
    setCheckedContactGuard(true);
  }

  return (
    <div className="background-image library">
      <Header />
      <div className="sizer-full align-items-start p-b-80">
        <div className="container m-t-30">
          <div className="row products-list">
            <div className="col-12 products-col">
              <div className="products-header">
                <h4 className="products-title">
                  <strong>
                    คอร์สของฉัน
                  </strong>
                </h4>
                {(!loadingItem && lastWatchedEp?.id)
                  ?
                    <div className="resume-course box-shadow-none">
                      <div className="resume-course-positioner">
                        <a className="resume-course-content"
                           href={ lastWatchedEp?.url || myCourseList[0]?.id.toString() || ''}>
                          <div className="resume-course-text sm-none ipad-none">
                            <h6 className="resume-course-status m-0">
                              <strong>
                                เรียนคอร์สต่อ
                              </strong>
                            </h6>
                            <p className="resume-course-title m-0">
                              {!loadingItem && getName()}
                            </p>
                          </div>
                          <div className="resume-course-image">
                            {
                              (lastWatchedEp && lastWatchedEp.episodeID?.thumbnail_image)
                                ? <Img src={lastWatchedEp.episodeID?.thumbnail_image}
                                       width={700}
                                       height={400}
                                       alt="Continue Watch"
                                />
                                : <Img src={myCourseList[0]?.thumbnail_image}
                                       width={700}
                                       height={400}
                                       alt="Continue Watch"
                                />
                            }
                          </div>
                          <div className="resume-course-text lg-none">
                            <h6 className="resume-course-status m-0">
                              <strong>
                                เรียนคอร์สต่อ
                              </strong>
                            </h6>
                            <p className="resume-course-title m-0">
                              {!loadingItem && getName()}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  :
                    <></>
                }
              </div>
            </div>
            <div className="search-zone">
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
            <div className="grid-container">
              {!loadingItem && myCourseList?.map((value, index) => {
                let cutDescription = "";
                cutDescription = value.description?.slice(0, 280);
                if (value.description?.length > 280) cutDescription = cutDescription + "...";
                if (value?.id){
                  return (
                    <div key={index} className="block-type-feature text-center col-12">
                    <div className="block box-shadow-large background-white p-12 b-r-4">
                      <div className="feature">
                        <Link href={`/product?proId=${value.id}`}>
                          <a>
                            <Img className="feature-image"
                              src={value.thumbnail_image}
                              alt={value.speaker_name}
                              width={700}
                              height={400} />
                          </a>
                        </Link>
                      </div>
                        <div className="progress">
                          <div className="progress-outer">
                            <div className={`progress-inner p-w-${getPercentage(value)}`} />
                          </div>
                        </div>
                      <div className="feature-text h-100 p-t-15">
                        <div className="text-left">
                          <h6 className="color-black ipad-f-s-14">คอร์สเรียน: {value.course_name}</h6>
                          <p className="f-s-14 ipad-f-s-12">สอนโดย {value.speaker_name}</p>
                        </div>
                      </div>
                      <div onClick={ () => getLastEpForEachCourse(value)}>
                        <a className="btn">
                            <h6 className="m-0 color-white  ipad-f-s-12">
                              รับชมเลย
                            </h6>
                        </a>
                      </div>
                    </div>
                  </div>
                  )
                }
              })}
            </div>
          </div>
        </div>
      </div>
      <FooterBrand />
      <Footer />
    </div>
  )
}
