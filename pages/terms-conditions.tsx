import { TermsConditionsContent } from "../apiStrapi/models/contentType/termsConditions";
import { ResponseData } from "../apiStrapi/models/data";
import Footer from "../components/footer";
import Header from "../components/header";
import ReactMarkdown from "react-markdown";
import { termsConditionsApi } from "../apiStrapi/StrapiApiService";

interface TermsConditionsProps {
  termsConditions: ResponseData<TermsConditionsContent>;
}

export default function TermsConditions({ termsConditions }: TermsConditionsProps) {
  return (
    <div>
      <Header />
      <div className="background-light">
        <div className="sizer">
          <div className="container">
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="block box-shadow-none">
                  <br />
                  <br />
                  <h1>
                    <span className="color-grey">
                      <strong>
                        {termsConditions.data?.attributes?.title}
                      </strong>
                    </span>
                  </h1>
                  {termsConditions?.data?.attributes?.paragraph.map((value, index) => {
                    return (
                      <div key={index}>
                        <br />
                        <h2>
                          {value.title}
                        </h2>
                        <h6>
                          <ReactMarkdown>{value.description}</ReactMarkdown>
                        </h6>
                      </div>
                    )
                  })}
                  <br />
                  <h2>
                    {termsConditions.data?.attributes?.footer}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticProps() {
  return {
    props: {
      termsConditions: await termsConditionsApi(),
    }
  }
}