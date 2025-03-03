import { useRouter } from "next/router";
import { MouseEventHandler, useEffect, useState } from "react";
import {
  saveWatchedEpisode,
  getEpisodesAndQuiz,
  getWatchedEpisodes,
  saveLastSecondOfEpisode,
  getOnGoingEpisodesForCourse,
} from "../../apiNest/courseLmsApi";
import {
  Certificate,
  CourseLMS,
  Episodes,
  Evaluation,
  OnGoingEpisodes,
  Quiz,
  ShowingType,
} from "../../apiNest/models/content/courseLms";
import Accordion, { Color, Icon } from "../../components/accordion";
import Footer from "../../components/footer";
import Header from "../../components/header";
import Img from "../../components/image";
import ProductSale from "../../components/product/productSale";
import ProductBlogs from "../../components/product/productBlogs";
import VideoPlayer from "../../components/videoPlayer";
import cutCloudflareVideoId from "../../functions/cutCloudflareVideoId";
import CourseEvaluation from "../../components/courseEvaluation";
import QuizSession from "../../components/quizSession";
import ButtonPartialLogin from "../../components/buttonPartialLogin";
import {notification} from "antd";
import checkCoursePurchasedApi from "../../apiNest/checkCoursePurchasedApi";
import { annualPromotionApi, courseApi } from "../../apiStrapi/StrapiApiService";
import Popup from "reactjs-popup";
import CourseCertificate from "../../components/courseCertificate";
import { getCertificate } from "../../apiNest/myCourseApi";

export default function Product() {
  const [indexEpisodesOrQuiz, setIndexEpisodesOrQuiz] = useState<number>(0);
  const [courseLms, setCourseLms] = useState<CourseLMS>({} as CourseLMS);
  const [episodeLms, setEpisodeLms] = useState<Episodes>({} as Episodes);
  const [showingType, setShowingType] = useState<ShowingType>(ShowingType.episode);
  const [watchedEpisodes, setWatchedEpisodes] = useState<number[]>([]);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const router = useRouter();
  const [showCertificate, setShowCertificate] = useState<boolean>(false);
  const announcement = "ตอนนี้คุณกำลังอยู่ในโหมดทดลองเรียนฟรี เนื้อหาบางส่วนมีการถูกล็อกไว้\nคุณสามารถซื้อคอร์สนี้เพื่อดูเนื้อหาทั้งหมดในคอร์สเรียน";
  const [saleHeader, setSaleHeader] = useState(
    {
      is_purchased: false,
      has_annual: false,
    }
  );
  let [onGoingEpisodes, setOnGoingEpisodes] = useState<OnGoingEpisodes[]>([]);
  const [saleSku, setSaleSku] = useState(
    {
      courseSku: "",
      annualSku: ""
    }
  )
  const { proId, epID } = router.query;

  useEffect(() => {
    localStorage.setItem('lastSecond', '');
    if (!router.isReady) return;
    componentMounted();
    return () => {
      componentUnmounted();
      window.removeEventListener("beforeunload", saveLastSecond);
    };
  }, [router.isReady]);

  function componentMounted(): void {
    fetchData().then(() => {});
    getWatchedEpList().then(() => {});
    getOnGoingEpisodes().then(() => {});
    localStorage.setItem('courseID',  proId?.toString() || '');
    window.addEventListener("beforeunload", saveLastSecond);
  }

  function componentUnmounted(): void {
    saveLastSecondOfEpisode();
  }

  function saveLastSecond(e: BeforeUnloadEvent) {
    e.preventDefault();
    saveLastSecondOfEpisode();
    return e.returnValue = 'Are you sure you want to close?';
  }

  const videoContinue = async () => {
    await setEpisodeOrQuiz(courseLms?.episodes_list[indexEpisodesOrQuiz + 1], indexEpisodesOrQuiz + 1);
  }

  async function setEpisodeOrQuiz(passedData: Episodes | Quiz | Evaluation, index: number) {
    setIndexEpisodesOrQuiz(index);
    setShowingType(passedData.type);
    switch (passedData.type) {
      case ShowingType.quiz:
        setQuiz(passedData as Quiz);
        await saveLastSecondOfEpisode();
        await getOnGoingEpisodes().then(() => {});
        break;
      case ShowingType.episode:
        saveLastSecondOfEpisode();
        showingType === ShowingType.episode && setEpisodeLms(passedData as Episodes);
        setQuiz(null);
        setTimeout(async() => { // just for clearance
          localStorage.setItem('courseID', proId?.toString() || '');
          localStorage.setItem('episodeID', passedData.id.toString());
          localStorage.setItem('lastSecond', '');
          getOnGoingEpisodes().then(() => {});
        }, 500);
        break;
      case ShowingType.courseEvaluation:
        break;
      case ShowingType.certificate:
        break;
    }
  }

  async function getWatchedEpList(): Promise<void> {
    if(!proId) {
      notification['error']({ message: 'Course Record Not Found' })
      return;
    }
    const courseID = +proId || null;
    const watchedEpisodesList = await getWatchedEpisodes(courseID);
    setWatchedEpisodes(watchedEpisodesList.watchedEpisode);
  }

  function isWatched(id:number): boolean {
    return watchedEpisodes?.indexOf(id) !== -1;
  }

  function createNewRecord() {
    if(!proId) {
      notification['error']({ message: 'Course Record Not Found' })
      return;
    }
    const data = {
      course_id: +proId,
      episode_id: episodeLms.id,
    }
    if (watchedEpisodes?.indexOf(episodeLms.id) === -1) {
      saveWatchedEpisode(data).then(
        (res) => {
          setWatchedEpisodes([...watchedEpisodes, episodeLms.id])
          getWatchedEpList().then(()=>{
            if ( watchedEpisodes?.length === parseInt(courseLms.total_lessons)){
              setShowCertificate(true);
            }
          })
          
        },
        (err) => console.warn(err),
      );
    }
  }

  function getTrackName(value: Episodes | Quiz | Evaluation) {
    let name = '';
    switch (value.type) {
      case ShowingType.episode:
        const ep = value as Episodes;
        name = ep.episode_name;
        break;
      case ShowingType.quiz:
        const quiz = value as Quiz;
        name = `Quiz For Episode ${quiz.episode_number}`;
        break;
      case ShowingType.courseEvaluation:
        name = 'Post Course Evaluation';
        break;
      case ShowingType.certificate:
        name = 'Download Certificate';
    }
    return name;
  }

  async function fetchData() {
    if(!proId) {
      notification['error']({ message: 'Course Record Not Found' })
      return;
    }
    const data = await getEpisodesAndQuiz(proId!.toString()) as CourseLMS;
    if(data.statusCode && data.statusCode === 500){
      router.replace("/404").then(() => {});
      return
    }
    data.episodes_list.map(item => {
      item.type = ("question" in item && item.question) ? ShowingType.quiz : ShowingType.episode;
      return item;
    });
    data.episodes_list.push(new Evaluation());
    data.episodes_list.push(new Certificate());
    const index = epID ? data.episodes_list.findIndex(ep => ep.id === +epID) : 0;
    const selectingEP = data.episodes_list[index];
    await setEpisodeOrQuiz(selectingEP, index);
    await setCourseLms(data);
    await checkCoursePurchased(data.id);
    await setSku(data.lms_id);
  }

  const setSku = async (lms_id: number) => {
    const annual = await annualPromotionApi();
    const course = await courseApi(lms_id.toString());
    setSaleSku({ courseSku: course?.data?.order_sku || "", annualSku: annual?.data?.attributes?.sku || "" });
  }

  const checkCoursePurchased = async (id: number) => {
    checkCoursePurchasedApi(id).then((value) => {
      setSaleHeader(value!);
    });
  }

  async function getOnGoingEpisodes(): Promise<void> {
    const data = await getOnGoingEpisodesForCourse(+proId!);
    setOnGoingEpisodes(data);
  }

  function getPercentage(value : Episodes | Quiz | Evaluation): number {
    if (!value.duration || value.duration <= 0 ) {
      return 0;
    }
    if (watchedEpisodes?.indexOf(value.id) !== -1 ) {
      return 100;
    }
    const lastSecond = +(onGoingEpisodes.filter(item => item.episodeID === value.id)[0]?.lastSecond || 0);
    return Math.round((lastSecond/value.duration) * 100);
  }

  function restart() {
    setEpisodeOrQuiz(courseLms.episodes_list[0], 0).then(() => { });
  }

  const downloadCertificate = async () =>{
    const certificate = await getCertificate(courseLms.id)
    const pdf = new Blob([certificate], { type: 'application/pdf' });
    const url = URL.createObjectURL(pdf);
    var a = document.createElement("a");
    a.href = url;
    a.download = `${courseLms.course_name.split(" ").join("-")}-Certificate-${new Date().toISOString().slice(0,10)}`;
    a.click();
  }

  return (
    <div className="product">
      <Header />
      <div className="col-12 m-0">
        <div className="container sm-p-x-0">
          <div className="nev-product">
            <div className="left-nev-product">
              <h6 className="color-primary">
                คอร์สเรียน : {courseLms.course_name}
              </h6>
              <p className="f-s-14 m-b-0 color-black">
                สอนโดย {courseLms.speaker_name}
              </p>
            </div>
            <div className="right-nev-product sm-none">
              {!saleHeader.is_purchased && <ButtonPartialLogin
                sku={saleSku.courseSku}
                class={"btn btn-not-focus btn-small m-t-0"}
                text={"ซื้อคอร์สนี้"} />}
              {!saleHeader.has_annual && <ButtonPartialLogin
                sku={saleSku.annualSku}
                class={"btn btn-small m-t-0"}
                text={"ซื้อแพ็คเกจรายปี"} />}
              {saleHeader.has_annual && <ButtonPartialLogin
                sku={saleSku.annualSku}
                class={"btn btn-small m-t-0"}
                text={"ต่อสมาชิกแพ็คเกจรายปี"} />}
            </div>
            <div className="right-nev-product ipad-none lg-none">
              <ProductSale saleHeader={saleHeader} saleSku={saleSku} />
            </div>
          </div>
        </div>
      </div>
      <div className="background-image">
        <div className="sizer">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <button className="btn-link f-s-16 row" onClick={router.back}>
                  <i className="fal fa-chevron-left m-r-7" />
                  <h5 className="color-black m-b-0">
                    ย้อนกลับ
                  </h5>
                </button>
              </div>
              <div className="col-12">
                <div className="episode-title">
                  <h5 className="color-black m-0">
                    {episodeLms?.episode_name}
                  </h5>
                </div>
              </div>
              {/*     WILL BE ADDED BACK WHEN free trial FEATURE IS CONFIRMED   */}
              {/*<div className="col-12">*/}
              {/*  <div className="product-announcement">*/}
              {/*    <i className="fal fa-megaphone p-t-5" />*/}
              {/*    <div className="p-l-10">*/}
              {/*    <span>*/}
              {/*      {announcement}*/}
              {/*    </span>*/}
              {/*    </div>*/}
              {/*  </div>*/}
              {/*</div>*/}
              <div className="col-12 p-b-20">
                <div className="player">
                  {
                    showingType === ShowingType.episode &&
                      <>
                        <div className="player-video">
                          {episodeLms?.link_video &&
                              <VideoPlayer props={{
                                video_id: cutCloudflareVideoId(episodeLms.link_video),
                                video_thumbnail: { url: episodeLms.thumbnail_image },
                                handleEnded: () => createNewRecord(),
                                lastSecond: onGoingEpisodes?.filter(item =>
                                    item.episodeID === episodeLms.id
                                )[0]?.lastSecond || undefined,
                                }}
                                videoContinue={{
                                  episodeOrQuiz: courseLms.episodes_list ? courseLms.episodes_list[indexEpisodesOrQuiz+1] as Episodes : {} as Episodes,
                                  callBackContinue: videoContinue,
                                }} />
                          }
                        </div>
                      </>
                  }
                  {showingType === ShowingType.quiz &&
                      <>
                        <div className="quiz-session">
                          <QuizSession course={courseLms}
                                       restart={restart}
                                       quiz={quiz} />
                        </div>
                      </>
                  }
                  {showingType === ShowingType.courseEvaluation &&
                      <>
                        <div className="quiz-session">
                          <CourseEvaluation course={courseLms}
                                            restart={restart} />
                        </div>
                      </>
                  }
                  {showingType === ShowingType.certificate &&
                    <>
                      <div className="quiz-session">
                        <CourseCertificate course={courseLms}
                                          restart={restart} />
                      </div>
                    </>
                  }
                  <div className="player-nav">
                    <div className="media">
                      <div className="media-left-under-player">
                        <button className="btn btn-box btn-small"
                                disabled={indexEpisodesOrQuiz === 0}
                                onClick={async () => { await setEpisodeOrQuiz(courseLms?.episodes_list[indexEpisodesOrQuiz - 1], indexEpisodesOrQuiz - 1) }}>
                          <i className="fa fa-chevron-left" aria-hidden="true" />
                          บทเรียนก่อนหน้า
                        </button>
                      </div>
                      <div className="media-body media-middle">
                        <p className="m-b-0 hidden-xs-down">
                          บทเรียน {indexEpisodesOrQuiz + 1} of {courseLms?.episodes_list?.length}
                        </p>
                      </div>
                      <div className="media-right">
                        <button className="btn btn-box btn-small"
                                disabled={indexEpisodesOrQuiz === courseLms?.episodes_list?.length - 1}
                                onClick={async () => { await setEpisodeOrQuiz(courseLms?.episodes_list[indexEpisodesOrQuiz + 1], indexEpisodesOrQuiz + 1) }}>
                          บทเรียนถัดไป
                          <i className="fa fa-chevron-right" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="player-playlist">
                    <div className="playlist">
                      <div className="playlist-title">
                        <div className="media">
                          <div className="media-body media-middle">
                            <h2>{courseLms.course_name}</h2>
                          </div>
                          <div className="media-right">
                            <h3>{courseLms.episodes_list?.length} บทเรียน</h3>
                          </div>
                        </div>
                      </div>
                      <div className="playlist-body">
                        {courseLms.episodes_list?.map((value, index) => {
                          return (
                            <a key={index}
                               className="media track align-items-center"
                               onClick={async () => { await setEpisodeOrQuiz(value, index) }}>
                              { value.type === ShowingType.certificate && courseLms?.episodes_list?.filter(item => item.type === 'episode').length !== watchedEpisodes?.length ?
                                (
                                  <></>
                                ):
                                (
                                  <>
                                    <div className="media-left media-middle">
                                      {index === indexEpisodesOrQuiz ? (
                                        <p className="track-count active m-b-0">
                                          <i className="fa fa-play color-primary" />
                                        </p>
                                      ) : (
                                        <p className="track-count m-b-0">
                                          { index + 1 }
                                        </p>
                                      )}
                                    </div>
                                    <div className="media-left media-middle">
                                      <Img className="track-thumb"
                                          src={"thumbnail_image" in value ? value.thumbnail_image : ''}
                                          width={70}
                                          height={39.3833}
                                          alt={"episode_name" in value ? value.episode_name : "thumbnail image"}
                                      />
                                    </div>
                                    <div className="media-body media-middle">
                                      <div className="track-title">
                                        {getTrackName(value)}
                                      </div>
                                    </div>

                                    {
                                      isWatched(value.id) &&
                                        <i className="fa fa-check color-primary p-l-5"
                                          aria-hidden="true" />
                                    }
                                  </>
                                )                       
                              }      
                            </a>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-12 link-file">
                  <i className="fal fa-file-download color-primary" />
                  &nbsp;&nbsp;
                  <a target="_blank" href={courseLms.asset_download} rel="noopener noreferrer">
                    ดาวน์โหลดเอกสารประกอบการเรียน
                  </a>
                </div>
              </div>
              <div className="col-8">
                {courseLms.episodes_list?.map((value, index) => {
                  return (
                    <div key={index}>
                      {value.type === ShowingType.episode && (
                        <Accordion
                          title={getTrackName(value)}
                          description={"description" in value
                            ? value.description + "\n *หากผู้ใดละเมิดนำงานไปเผยแพร่ คัดลอก หรือดัดแปลงไม่ว่าบางส่วนหรือทั้งหมดจะถูกดำเนินคดีตามกฎหมาย"
                            : ''}
                          col={12}
                          icon={Icon.play}
                          percentage={getPercentage(value)}
                          color={Color.light}
                          button={{
                            callback: () => {
                              setEpisodeOrQuiz(value, index).then(() => { })
                            }, text: `${0 ? (`${0 < 100 ? ("ดูต่อ") : ("ดูอีกครั้ง")}`) : ("รับชมเนื้อหา")}`
                          }}
                          progress={0}
                        />
                      )}
                    </div>
                  )
                })
                }
              </div>
              <ProductBlogs progressBlog={true}
                            watchedEps={watchedEpisodes?.length}
                            fullEps={courseLms?.episodes_list?.filter(item => item.type === 'episode').length || 0}
                            productImage={courseLms.thumbnail_image}
                            productName={courseLms.course_name}
                            instructorImage={courseLms.instructor?.profile_image}
                            instructorName={courseLms.instructor?.name}
                            instructorRemark={courseLms.instructor?.idiom} />
            </div>
          </div>
        </div>
      </div>
      <Popup
        open={showCertificate}
        className="popup-certificate"
        modal
        onClose={() => setShowCertificate(false)}
        closeOnDocumentClick={false}>
        {(close: MouseEventHandler<HTMLButtonElement>) => {
          return (
            <div className="pop-modal">
              <button className="close" onClick={close}>
                <p>
                  &times;
                </p>
              </button>
              <div>
                <h5 className="color-black">
                  Congratulations!
                </h5>
                <p className="color-black f-s-14">
                  คุณรับชมคอร์ส
                  <br className="lg-none ipad-none" />
                  &nbsp;
                  &quot;{courseLms.course_name}&quot;
                  &nbsp;
                  <br className="lg-none ipad-none" />
                  จบแล้ว
                  <br className="sm-none" />
                  หวังว่าคุณจะสนุกไปกับคอร์สเรียนของเรา
                </p>
                <button className="btn btn-small btn-box" onClick={downloadCertificate}>
                  ดาวน์โหลด Certificate
                </button>
              </div>
            </div>
          )
        }}
      </Popup>
      <Footer />
    </div>
  )
}
