import Header from "../components/header";
import Footer from "../components/footer";
import { PrivacyPolicyContent } from "../apiStrapi/models/contentType/privacyPolicy";
import { ResponseData } from "../apiStrapi/models/data";
import ReactMarkdown from "react-markdown";
import { privacyPolicyApi } from "../apiStrapi/StrapiApiService";


interface PrivacyPolicyProps {
  privacyPolicy: ResponseData<PrivacyPolicyContent>;
}

export default function PrivacyPolicy({ privacyPolicy }: PrivacyPolicyProps) {
  return (
    <div>
      <Header />
      <div className="background-light">
        <div className="sizer">
          <div className="container">
            <div className="row align-items-center justify-content-center">
              <div className="block box-shadow-none">
                <h1>
                  <span className="color-grey">
                    <strong>
                      {privacyPolicy.data?.title}
                    </strong>
                  </span>
                </h1>
                {privacyPolicy.data?.paragraph.map((value, index) => {
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
                <h2>
                  {privacyPolicy.data?.refund_policy?.title}
                </h2>
                <h6>
                  {privacyPolicy.data?.refund_policy?.description}
                </h6>
                {privacyPolicy.data?.refund_policy?.paragraph.map((value, index) => {
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
                <br />
                <h2>
                  {privacyPolicy.data?.footer}
                </h2>
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
      privacyPolicy: await privacyPolicyApi(),
    }
  }
} 