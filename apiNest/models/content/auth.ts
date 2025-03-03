export interface Auth {
  access_token: string;
  statusCode: string;
  message: string;
  error: string;
}

export interface ValidateAuth {
  code: string;
  description: string;
}

export interface AuthUser {
	id: number;
	email: string;
	google_id?: number;
	facebook_id?: number;
	status: string;
	bio: string;
	profile_image: string;
	role: string;
	notify_on_product: boolean;
	notify_on_post: boolean;
	notify_new_product: boolean;
	createDate: string;
	updateDate: string;
	deletedAt?: string;
	contact: AuthUserContact;
}

export interface AuthUserContact {
	id: number;
	first_name: string;
	last_name: string;
	phone_number: string;
	address: string;
	province: string;
	post_code: string;
	birth_day: string;
	degree: string;
	occupation: string;
	current_position: string;
	business_type: string;
	personal_interest: string;
	timezone: string;
	deletedAt?: string;
}