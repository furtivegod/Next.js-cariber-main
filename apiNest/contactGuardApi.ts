import { nestHeaderAuth, NEST_API_URLS } from "./models/contact";

export interface PostContactGuard {
  first_name: string;
  last_name: string;
  phone_number: string;
  address: string;
  province: string;
  post_code: string;
  birth_day: Date;
  degree: string;
  occupation: string;
  current_position: string;
  business_type: string;
  personal_interest: string;
}

export async function postContactGuardApi(body: PostContactGuard) {
  try {
    const response = await fetch(NEST_API_URLS.contactGuard, {
      method: "POST",
      headers: nestHeaderAuth(),
      body: JSON.stringify(body),
    })
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}