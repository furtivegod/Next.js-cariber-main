import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { strapiImage } from "../apiStrapi/models/contact";
import { CarouselContent } from "../apiStrapi/models/contentType/carousel";
import Img from "./image";

export interface SlideCourse {
  link: string,
  image: string,
}

interface SlideCourseProps {
  slideCourses: CarouselContent[],
  slideView: number,
  imageWidth: number,
  imageHeight: number
}

export default function SlideCourse({ slideCourses, slideView, imageWidth, imageHeight }: SlideCourseProps) {
  const [slideViewLocal, setSlideViewLocal] = useState(slideView);
  const [imageWidthLocal, setImageWidthLocal] = useState(imageWidth);
  const [imageHeightLocal, setImageHeightLocal] = useState(imageHeight);
  const [slideShowIndex, setSlideShowIndex] = useState(0);
  const [countIndex, setCountIndex] = useState(0);
  const [frameWidth, setFrameWidth] = useState(0);
  const [itemFrameWidth, setItemFrameWidth] = useState(0);
  const timeoutRef = useRef(0);
  const delay = 4000;
  const refFrame = useRef<HTMLDivElement>(null);
  const refItemFrame = useRef<HTMLDivElement>(null);

  function resetTimeout() {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  function nextSlide() {
    setSlideShowIndex((index) =>
      index >= slideCourses?.length + 1 - slideViewLocal ? 0 : index + 1
    )
  }

  function previousSlide() {
    setSlideShowIndex((index) =>
      index <= 0 ? slideCourses?.length + 1 - slideViewLocal : index - 1
    )
  }

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = window.setTimeout(
      () =>
        setSlideShowIndex((index) =>
          index >= slideCourses?.length + 1 - slideViewLocal ? 0 : index + 1
        ),
      delay
    );
    window.addEventListener('resize', function () {
      refFrame.current && setFrameWidth(refFrame.current.offsetWidth);
      refItemFrame.current && setItemFrameWidth(refItemFrame.current.offsetWidth);
    });
    refFrame.current && setFrameWidth(refFrame.current.offsetWidth);
    refItemFrame.current && setItemFrameWidth(refItemFrame.current.offsetWidth);
    frameWidth >= 1150 / 1.5 && setSlideViewLocal(4);
    frameWidth < 1150 / 1.5 && setSlideViewLocal(3);
    frameWidth < 1150 / 2 && setSlideViewLocal(2);
    frameWidth < 1150 / 3 && setSlideViewLocal(1);
    setImageWidthLocal(0.97252173913 * (frameWidth / slideViewLocal) - 20);
    setImageHeightLocal(1.6347826087 * (frameWidth / slideViewLocal));
    setCountIndex(countIndex + 1);
    return () => {
      resetTimeout();
    }
  }, [frameWidth, slideViewLocal, slideShowIndex])

  return (
    <div className="block box-shadow-none background-unrecognized">
      <div id="slideshow" className="container">
        <div className="row">
          <div className="col-lg-12" ref={refFrame}>
            <div id="news-slider" className="owl-carousel owl-theme">
              <div className="owl-wrapper-outer">
                <div className="owl-wrapper" style={{ transform: `translate3d(${-slideShowIndex * (itemFrameWidth) - 10}px, 0px, 0px)` }}>
                  {slideCourses?.sort((a: CarouselContent, b: CarouselContent) => a.id < b.id ? 1 : -1).map((value, index) => {
                    return (
                      <div key={index} className="owl-item" ref={refItemFrame}>
                        <div className="news-grid">
                          <div className="news-grid-image">
                            {!value.attributes?.course?.data?.attributes?.publishedAt ? (<Img
                              src={strapiImage(value.attributes?.carousel_image?.data?.attributes?.url)}
                              width={imageWidthLocal}
                              height={imageHeightLocal}
                              alt="Slide Course"
                            />) : (<Link href={`/course/${value.attributes?.course?.data?.id}`}>
                              <a>
                                <Img
                                  src={strapiImage(value.attributes?.carousel_image?.data?.attributes?.url)}
                                  width={imageWidthLocal}
                                  height={imageHeightLocal}
                                  alt="Slide Course"
                                />
                              </a>
                            </Link>)}
                          </div>
                          <div className="news-grid-txt">
                            {!value.attributes?.course?.data?.attributes?.publishedAt ? (
                              <b>Coming Soon</b>
                            ) : (
                              <Link href={`/course/${value.attributes?.course?.data?.id}`}>
                                <a>
                                  ซื้อคอร์สนี้
                                </a>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  <div className="owl-item" ref={refItemFrame}>
                    <div className="news-grid">
                      <div className="news-grid-image">
                        <Link href="/courses">
                          <a>
                            <Img
                              src="/carousel/See_All-02_9-16.jpg"
                              width={imageWidthLocal}
                              height={imageHeightLocal}
                              alt="Slide Course"
                            />
                          </a>
                        </Link>
                      </div>
                      <div className="news-grid-txt">
                        <Link href="/courses">
                          <a>
                            ดูคอร์สทั้งหมด
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="owl-controls clickable">
                <div className="owl-buttons">
                  <button id="previous" className="owl-prev owl-button" onClick={previousSlide}>
                    <i className="fas fa-chevron-left color-smooth"></i>
                  </button>
                  <button id="next" className="owl-next owl-button" onClick={nextSlide}>
                    <i className="fas fa-chevron-right color-smooth"></i>
                  </button>
                </div>
              </div>
              <div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}