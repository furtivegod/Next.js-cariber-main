import { useEffect, useState } from "react"
import { AnnouncementBarContent } from "../apiStrapi/models/contentType/announcementBar";
import { announcementBarApi } from "../apiStrapi/StrapiApiService";

export default function AnnouncementBar() {
  const [announcementBar, setAnnouncementBar] = useState<AnnouncementBarContent>({} as AnnouncementBarContent);

  useEffect(() => {
    announcementBarApi().then((value) => {
      setAnnouncementBar(value.data);
    })
  }, [])

  return (
    <>
      {announcementBar.attributes?.message
        ? <div className="announcement-bar text-center">
          <a href={announcementBar.attributes?.url}>
            <p className="p-4 m-0 color-white">
              {announcementBar.attributes?.message}
            </p>
          </a>
        </div>
        : <div />
      }
    </>
  )

}