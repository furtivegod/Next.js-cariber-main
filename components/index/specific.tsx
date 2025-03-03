import { strapiImage } from "../../apiStrapi/models/contact";
import { Information } from "../../apiStrapi/models/contentType/home";
import Img from "../image";

export default function Specific({ specifics }: { specifics?: Information[] }) {
  return (
    <div className="row align-items-center justify-content-center text-center">
      {specifics?.map((value, index) => {
        return (
          <div className="col-4 row" key={index}>
            <div className="block-type-image col-4 p-0">
              <div className="block box-shadow-none">
                <div className="image">
                  <Img className="image-image"
                    src={strapiImage(value.image?.url)}
                    width={70.0333}
                    height={70.0333}
                    alt={value.description}
                  />
                </div>
              </div>
            </div>
            <div className="block-type-text text-left col-8 p-0">
              <div className="block box-shadow-none white-space-pre text-center flex-align-center">
                <h5 className="ipad-f-s-16">
                  <span>
                    {value.description}
                  </span>
                </h5>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}