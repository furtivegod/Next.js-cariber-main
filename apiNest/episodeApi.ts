import { nestHeaderAuth, NEST_API_URLS } from "./models/contact";
import { Episodes } from "./models/content/courseLms";

export async function episodeApi(id: string) {
  try {
    const response = await fetch(NEST_API_URLS.episode + `/${id}`, {
      method: "GET",
      headers: nestHeaderAuth(),
    })
    return await response.json() as Episodes;
  } catch (error) {
    console.log(error);
  }
} 