import { VideoComponent } from './../component/video';
export interface CourseContent {
  id: number;
  course_name: string;
  description: string;
  asset_download: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  publish_date: string;
  total_hours: string;
  total_lessons: string;
  order_sku: string;
  header: string;
  teaser_url: string;
  speaker_name: string;
  thumbnail_image: string;
  contents: Contents[];
  order_image: Image;
  episodes: Episode[];
  teaser_video: VideoComponent;
  speaker_image: Image;
}

export interface Contents{
  __component: string;
  id: number;
  items: Item[];
  topics: Topics[];
  special_ep: specialEP[];
  speaker_detail: SpeakerDetails[];
}

export interface SpeakerDetails{
  id: number;
  description: string;
  image: Image;
}

export interface specialEP{
  id: number;
  title: string;
  description: string;
  youtube_url: string;
}

export interface Topics{
  id: number;
  label: string;
  image: Image;
}

export interface Image{
  id: number;
  name: string;
  url: string;
}

export interface Item{
  id: number;
  label: string;
}

export interface Episode {
  id: number;
  episode_number: number;
  episode_name: string;
  description: string;
  link_video: string;
  video: Video[]
}

export interface Video{
  id: number;
  url: string;
}