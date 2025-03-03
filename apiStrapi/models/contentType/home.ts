import { CourseContent } from './courses';
import { VideoComponent } from "../component/video";

export interface HomeContent {
  id: number;
  video_id: string;
  header_image: Image;
  information: Information[];
  courses_latest: CoursesLatest[];
  courses_soon: CoursesSoon[];
  my_student: MyStudentContent[];
  q_and_a: QAndA[];
  shopee_info: ShopeeInfo;
  shopee: Shopee[];
  thumbnail_video: Image;
  home_video: VideoComponent;
}

export interface Shopee {
  id: number;
  name: string;
  ratings: number;
  description: string;
  date: string;
}

export interface ShopeeInfo {
  id: number;
  quantity_review: number;
  ratings: number;
  image: Image;
}

export interface Information {
  id: number;
  description: string;
  image: Image;
}

export interface CoursesLatest {
  id: number;
  name: string;
  image: Image;
  course: CourseContent;
}

export interface CoursesSoon {
  id: number;
  name: string;
  image: Image;
}

export interface MyStudentContent {
  id: number;
  name: string;
  image: Image;
}

interface Image {
  id: number;
  name: string;
  size: number;
  width: number;
  height: number;
  url: string;
}

interface QAndA {
  id: number;
  title: string;
  description: string;
}