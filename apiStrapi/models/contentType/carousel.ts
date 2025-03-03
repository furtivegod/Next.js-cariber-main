import { ResponseData } from './../data';

export interface CarouselContent{
  id: number;
  attributes: Attributes;
}

interface Attributes{
  carousel_image: ResponseData<Image>;
  course: ResponseData<Course>;
}

export interface Course {
  id: number;
  attributes: AttributesCourse;
}

interface AttributesCourse{
  course_name: string;
  description: string;
  asset_download: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  publish_date: string;
  name: string;
  total_hours: string;
  total_lessons: string;
  order_link: string;
  header: string;
  teaser: string;
  teaser_url: string;
}

interface Image{
  id: number;
  attributes: AttributesImage;
}

interface AttributesImage{
  url: string;
}