export interface AccountContent {
  id: number;
  email: string;
  bio: string;
  profile_image: string;
  role: string;
  notify_on_product: boolean;
  notify_on_post: boolean;
  notify_new_product: boolean;
  contact: Contact;
  createDate: string;
  updateDate: string;
  deletedAt: string;
}

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  current_position: string;
  timezone: string;
}