interface Instructor{
	id: number;
	name: string;
	lms_id: number;
	idiom: string;
	profile_image: string;
	createDate:	string;
	updateDate:	string;
	deletedAt:	string;
}

export enum ShowingType {
	episode = 'episode',
	quiz = 'quiz',
	courseEvaluation = 'evaluation',
	certificate = 'certificate'
}

export interface CourseLMS {
	id: number;
	speaker_name: string;
	course_name: string;
	description: string;
	total_hours: string;
	total_lessons: string;
	order_link: string;
	header: string;
	asset_download: string;
	thumbnail_image: string;
	lms_id: number;
	createDate: string;
	updateDate: string;
	deletedAt?: any;
	episodes_list: EpisodesAndQuiz[];
	instructor: Instructor;
	statusCode: number;
}

export interface Episodes {
	id: number;
	episode_number: number;
	episode_name: string;
	description: string;
	link_video: string;
	thumbnail_image: string;
	lms_id: number;
	is_free_trial: boolean;
	createDate: string;
	updateDate: string;
	deletedAt?: string;
	type: ShowingType;
	duration?: number;
}

export interface Quiz {
	id: number;
	episode_number: number;
	question: string;
	correct_choice: number;
	createDate: string;
	updateDate: string;
	deletedAt?: string;
	choice: QuizChoice[];
	type: ShowingType;
	duration?: number;
}

export interface QuizChoice {
	id: number;
	choice_number: number;
	choice_description: string;
	createDate: string;
	updateDate: string;
	deletedAt?: string;
	duration?: number;
}

export class Evaluation {
	id: number;
	name: string;
	thumbnail_image: string;
	type: ShowingType;
	episode_number: number;
	duration?: number;

	constructor() {
		this.id = 0;
		this.name = 'Post Course Evaluation';
		this.thumbnail_image = 'https://kajabi-storefronts-production.kajabi-cdn.com/kajabi-storefronts-production//site/163642/products/kT3DcuQ96w0cDdw8xHAy_XZhAghO1QNa8YL1cQtDe_EqIBRqYhQjClS06NZN4c_SeaTalk_IMG_1622212691.jpg';
		this.type = ShowingType.courseEvaluation;
		this.episode_number = 0;
	}
}

export class Certificate {
	id: number;
	name: string;
	thumbnail_image: string;
	type: ShowingType;
	episode_number: number;
	duration?: number;

	constructor() {
		this.id = 0;
		this.name = 'Download Certificate';
		this.thumbnail_image = '';
		this.type = ShowingType.certificate;
		this.episode_number = 0;
	}
}

export interface OnGoingEpisodes {
	episodeID: number,
	lastSecond: string,
}


export type EpisodesAndQuiz = Episodes | Quiz | Evaluation;
