import { useEffect, useRef, useState } from "react";

interface YoutubeEPProps {
  id: number;
  title: string;
  description: string;
  youtube_url: string;
}

export default function YoutubeEP({ YoutubeEPItems }: { YoutubeEPItems: YoutubeEPProps[] }) {
  const refFrame = useRef<HTMLDivElement>(null);
  const [youtubeFrameWidth, setYoutubeFrameWidth] = useState(0);
  
  function youtubeIframeLink(url: string) {
    if (url.includes("embed")) {
      return url;
    } else {
      const urlList = url.split("/")
      return "https://www.youtube.com/embed/" + urlList[urlList.length - 1];
    }
  }

  useEffect(() => {
    refFrame.current && setYoutubeFrameWidth(refFrame.current.offsetWidth)
    window.addEventListener('resize', function () {
      refFrame.current && setYoutubeFrameWidth(refFrame.current.offsetWidth)
    });
  }, [])

  return (
    <div>
      <div className="background-light">
        <div className="sizer">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="block-type-text text-center col-10">
                <div className="block box-shadow-none">
                  <h1 className="text-center">
                    <span className="color-primary">
                      <strong>
                        Special EP ดูฟรีก่อนใคร
                      </strong>
                    </span>
                  </h1>
                  <h1 className="text-center">
                    <span className="color-black">
                      <strong>
                        คัดบทเรียนเน้นๆมาให้ดูก่อนตัดสินใจ!
                      </strong>
                    </span>
                  </h1>
                </div>
              </div>
              {YoutubeEPItems.map((value, index) => {
                return (
                  <div className="row align-items-center justify-content-center" key={index}>
                    <div className="block-type-video-embed text-left col-8">
                      <div className="block box-shadow-none" ref={refFrame}>
                        <div className="responsive-video">
                          <iframe src={youtubeIframeLink(value.youtube_url)}
                            sandbox="allow-forms allow-scripts allow-pointer-lock allow-same-origin allow-top-navigation" width="100%" height={youtubeFrameWidth * 0.56249036144} />
                        </div>
                      </div>
                    </div>
                    <div className="block-type-text text-left col-4">
                      <div className="block box-shadow-none">
                        <h2>{value.title}</h2>
                        <p>
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="background-dark">
        <div className="sizer p-b-0">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <h2 className="text-center">
                <span className="color-primary">
                  <strong>
                    ถ้ายังไม่จุใจ เต็มอิ่มกับบทเรียนกว่า 4 ชั่วโมง<br />เล่าผ่านประสบการณ์จริง แบบที่ไม่เคยมีมาก่อน
                  </strong>
                </span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}