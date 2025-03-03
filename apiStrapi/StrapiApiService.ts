import { CarouselContent } from './models/contentType/carousel';
import { fetchData, STRAPI_API_URLS } from "./models/contact";
import { AnnouncementBarContent } from "./models/contentType/announcementBar";
import { ResponseData, ResponseDataList } from "./models/data";
import { AnnualPromotionContent } from './models/contentType/annualPromotion';
import { CourseContent } from './models/contentType/courses';
import { HomeContent } from './models/contentType/home';
import { ReviewContent } from './models/contentType/review';
import { SingleCourse } from './models/contentType/singleCourse';
import { TermsConditionsContent } from './models/contentType/termsConditions';
import { SeasonalPromotionContent } from './models/contentType/seasonalPromotion';
import { HeaderScripts } from './models/contentType/headerScripts';

export async function headerScriptsApi() {
  return await fetchData(STRAPI_API_URLS.headerScripts) as ResponseData<HeaderScripts>;
}

export async function seasonalPromotionApi() {
  return await fetchData(STRAPI_API_URLS.seasonalPromotion) as ResponseData<SeasonalPromotionContent>;
}

export async function announcementBarApi() {
  return await fetchData(STRAPI_API_URLS.announcementBar) as ResponseData<AnnouncementBarContent>;
}

export async function annualPromotionApi() {
  return await fetchData(STRAPI_API_URLS.annualPromotion) as ResponseData<AnnualPromotionContent>;
}

export async function carouselApi() {
  return await fetchData(STRAPI_API_URLS.carousels) as ResponseDataList<CarouselContent>;
}

export async function coursesAllApi() {
  return await fetchData(STRAPI_API_URLS.courses + "?publicationState=preview&pagination[pageSize]=1000") as ResponseDataList<CourseContent>;
}

export async function courseApi(id: string) {
  return await fetchData(STRAPI_API_URLS.courses + `/${id}`) as ResponseData<CourseContent>;
}

export async function homeApi() {
  return await fetchData(STRAPI_API_URLS.home) as ResponseData<HomeContent>;
}

export async function privacyPolicyApi() {
  return await fetchData(STRAPI_API_URLS.privacyPolicy) as ResponseData<TermsConditionsContent>;
}

export async function reviewApi() {
  return await fetchData(STRAPI_API_URLS.review) as ResponseData<ReviewContent>;
}

export async function singleCourseApi() {
  return await fetchData(STRAPI_API_URLS.singleCourse) as ResponseData<SingleCourse>;
}

export async function termsConditionsApi() {
  return await fetchData(STRAPI_API_URLS.termsConditions) as ResponseData<TermsConditionsContent>;
}