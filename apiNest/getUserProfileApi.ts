import { nestHeaderAuth, NEST_API_URLS } from './models/contact';
import { AccountContent } from './models/content/account';

export default async function getUserProfileApi() {
  const response = await fetch(NEST_API_URLS.auth, {
    method: "GET",
    headers: nestHeaderAuth()
  })
  return await response.json() as AccountContent;
}