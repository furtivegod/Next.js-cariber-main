export interface MyCourseContent {
  id: string;
  email: string;
  status: string;
  course_list: MyCourseItem[];
}

export interface MyCourseItem {
  id: number;
  speaker_name: string;
  description: string;
  expires_date: string;
  course_name: string;
  thumbnail_image: string;
  watchedEpisodes: WatchedEpisode[];
  episode: Episode[];
}

export interface WatchedEpisode {
	course: number;
	numberOfWatchedEpisode: number;
}

export interface Episode {
	id: number;
	episode_number: number;
	episode_name: string;
	description: string;
	link_video: string;
	duration: number;
	thumbnail_image: string;
	lms_id: number;
	is_free_trial: boolean;
	createDate: string;
	updateDate: string;
	deletedAt?: string;
}

export interface LastWatchedEp {
	id: number;
	lastSecond: string;
	createdDate: string;
	updatedDate: string;
	courseID: Course;
	episodeID: Episode;
	url?: string;
}

export interface Course {
	id: number;
	speaker_name: string;
	course_name: string;
	course_name_th: string;
	description: string;
	total_hours: number;
	total_lessons: number;
	order_link: string;
	header: string;
	asset_download: string;
	thumbnail_image: string;
	lms_id: number;
	published: boolean;
	createDate: string;
	updateDate: string;
	deletedAt?: string;
}
