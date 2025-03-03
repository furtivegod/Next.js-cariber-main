import Link from "next/link";
import Footer from "../components/footer";
import Header from "../components/header";

export default function Custom404() {
  return (
    <div className="not-found">
      <Header />
      <div className="background-image h-full-center">
        <div className="block-type-text text-center col-5">
          <div className="block box-shadow-none">
            <h1>ไม่พบหน้าที่ค้นหา</h1>
            <Link href="/" passHref={true}>
              <a className="btn btn-box btn-solid btn-full">
                กลับสู่หน้าเว็บไซต์
              </a>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}