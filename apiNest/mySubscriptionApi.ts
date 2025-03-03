import { NEST_API_URLS, nestHeaderAuth } from "./models/contact";
import { MySubscription } from "./models/content/mySubscription";

export default async function mySubscriptionApi() {
  const response = await fetch(NEST_API_URLS.mySubscription, {
    method: "GET",
    headers: nestHeaderAuth()
  })
  return await response.json() as MySubscription[];
}