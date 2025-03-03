export interface ReviewContent {
  id: number;
  header: ReviewHeaderContent;
  student: ReviewStudentContent[];
  cariber: ReviewCariberContent[];
  shopee: ReviewShopeeContent[];
}

export interface ReviewHeaderContent {
  id: number;
  facebook_name: string;
  facebook_url: string;
  description: string;
  image: Image;
}

export interface ReviewStudentContent {
  id: number;
  name: string;
  career: string;
  description: string;
  image: Image;
}

export interface ReviewCariberContent {
  id: number;
  name: string;
  career: string;
  description: string;
  image: Image;
}

export interface ReviewShopeeContent {
  id: number;
  name: string;
  ratings: number;
  description: string;
  image: Image;
}

interface Image {
  id: number;
  name: string;
  size: number;
  url: string;
}