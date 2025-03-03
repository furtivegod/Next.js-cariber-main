import { NEST_API_URLS, nestHeaderAuth } from "./models/contact";

interface Response {
  is_purchased: boolean,
  has_annual: boolean,
}

export default async function checkCoursePurchasedApi(id: number) {
  try {
    const response = await fetch(NEST_API_URLS.checkCoursePurchased + `/${id}`, {
      method: "GET",
      headers: nestHeaderAuth(),
    })
    return await response.json() as Response;
  } catch (error) {
    console.log(error);
  }
}