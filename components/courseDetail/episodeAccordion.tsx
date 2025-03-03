import { CourseDetailEpisode } from "../static/interface"
import Accordion, { Color } from "../accordion"
import { Episode } from "../../apiStrapi/models/contentType/courses";

export default function EpisodeAccordion({ totalHours, totalEpisodes, episodes }: CourseDetailEpisode) {
  const localEpisodes = episodes ? episodes.sort((a, b) => { return a.episode_number - b.episode_number }) : [{} as Episode];
  return (
    <div className="background-dark">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="block-type-text text-left col-12">
            <div className="row block box-shadow-none justify-content-center">
              <h1 className="lg-mr-space row justify-content-center">
                <strong>
                  <span className="color-smooth">
                    ⌛ {totalHours} ชั่วโมง
                  </span>
                </strong>
              </h1>
              <h1 className="row justify-content-center">
                <strong>
                  <span className="color-smooth">
                    📚 {totalEpisodes} บทเรียน
                  </span>
                </strong>
              </h1>
            </div>
          </div>
          <div className="grid-container">
            {localEpisodes && localEpisodes.map((value, index) => {
              if (value.episode_name.toLocaleLowerCase() !== "Teaser") {
                return (
                  <Accordion key={index}
                    title={value.episode_name}
                    description={value.description}
                    col={12} color={Color.dark} />
                )
              }
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
