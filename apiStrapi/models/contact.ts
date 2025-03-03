const BASE_URL = process?.env?.NEXT_PUBLIC_STRAPI_API || "https://strapi.cariber.co";
const BASE_API = BASE_URL + "/api";

export const STRAPI_API_URLS = {
  auth: BASE_API + "/auth/local",
  forgotPassword: BASE_API + "/auth/forgot-password",
  password: BASE_API + "/auth/reset-password",
  getUserProfile: BASE_API + "/user/get-me",
  updateUseProfiler: BASE_API + "/user/update-me",
  singleCourse: BASE_API + "/single-course?populate=*",
  annualPromotion: BASE_API + "/annual-promotion?populate=*",
  review: BASE_API + "/review",
  home: BASE_API + "/home",
  courses: BASE_API + "/courses",
  termsConditions: BASE_API + "/terms-and-condition?populate=*",
  privacyPolicy: BASE_API + "/privacy-policy",
  carousels: BASE_API + "/carousels?populate=*",
  announcementBar: BASE_API + "/announcement-bar",
  seasonalPromotion: BASE_API + "/seasonal-promotion?populate=*",
  headerScripts: BASE_API + "/header-script",
}

export function strapiImage(url: string) {
  return url ? BASE_URL + url : "";
}

export async function fetchData(url: string) {
  const response = await fetch(url, {
    headers: {
      Authorization: "Bearer " + process.env.NEXT_PUBLIC_STRAPI_AUTH_TOKEN
    }
  });
  return await response.json();
}
