import { nestHeaderAuth, NEST_API_URLS } from './models/contact';
import {LastWatchedEp, MyCourseContent} from "./models/content/myCourse";

export async function myCourseApi() {
  try {
    const response = await fetch(NEST_API_URLS.myCourse, {
      method: "GET",
      headers: nestHeaderAuth(),
    })
    return await response.json() as MyCourseContent;
  } catch (error) {
    console.log(error);
  }
}

export async function submitEvaluation(body: {score: number | null, feedback: string, course: number}) {
  try {
    const response = await fetch(NEST_API_URLS.courseEvaluation, {
      method: "POST",
      headers: nestHeaderAuth(),
      body: JSON.stringify(body),
    })
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function getLastWatchedEpisode(): Promise<LastWatchedEp | null> {
  try {
    const response = await fetch(NEST_API_URLS.lastWatchedEpisode, {
      method: "GET",
      headers: nestHeaderAuth(),
    })
    return await response.json() as LastWatchedEp;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getCertificate(id: number): Promise<any> {
  try {
    const response = await fetch(`${NEST_API_URLS.getCertificate}/${id}`, {
        method: "GET",
        headers: nestHeaderAuth(),
      })
        .then(async (res)=>{  
          return await res.blob();})
        .catch((err)=>err)
    return await response
  } catch(err) {
    console.log(err);
    return null
  }
}
