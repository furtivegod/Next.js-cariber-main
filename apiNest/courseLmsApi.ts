import {CourseLMS, OnGoingEpisodes} from './models/content/courseLms';
import { nestHeaderAuth, NEST_API_URLS } from './models/contact';

export interface WatchedEpisodeResponse {
  watchedEpisode: number[];
}

export async function allCourseLmsApi() {
  try {
    const response = await fetch(NEST_API_URLS.courseLms, {
      method: "GET",
      headers: nestHeaderAuth(),
    })
    return await response.json() as CourseLMS[];
  } catch (error) {
    console.log(error);
  }
}

export async function getEpisodesAndQuiz(id: string) {
  try {
    const response = await fetch(NEST_API_URLS.courseLms + `/${id}/get-episode-and-quiz`, {
      method: "POST",
      headers: nestHeaderAuth(),
    })
    return await response.json() as CourseLMS;
  } catch (error) {
    console.log(error);
  }
}

export async function getWatchedEpisodes(courseID: number | null): Promise<WatchedEpisodeResponse> {
  const blankResponse = { watchedEpisode: [] };
  if (!courseID) {
    return blankResponse;
  }
  try {
    const response = await fetch(NEST_API_URLS.watchedEpisode + `?course=${courseID}` , {
      method: "GET",
      headers: nestHeaderAuth(),
    })
    return await response.json() as WatchedEpisodeResponse;
  } catch (error) {
    console.log(error);
    return blankResponse;
  }
}

export async function saveWatchedEpisode(data: {course_id: number, episode_id: number}): Promise<void> {
  try {
    await fetch(NEST_API_URLS.watchedEpisode, {
      method: "POST",
      headers: nestHeaderAuth(),
      body: JSON.stringify(data)
    })
  } catch (error) {
    console.log(error);
  }
}

export function saveLastSecondOfEpisode(): void {
  const courseID = localStorage.getItem('courseID');
  const episodeID = localStorage.getItem('episodeID');
  const lastSecond = localStorage.getItem('lastSecond');
  if (!courseID || !episodeID || !lastSecond) {
    console.log('Cannot Save Last Second');
    !courseID && console.log('Course ID is Missing');
    !episodeID && console.log('Episode ID is Missing');
    !lastSecond && console.log('Last Second is Missing');
    return;
  }
  const data = {
    course_id: +courseID,
    episode_id: +episodeID,
    last_second: lastSecond,
  }
  try {
    fetch(NEST_API_URLS.onGoingEpisode, {
      method: "POST",
      headers: nestHeaderAuth(),
      body: JSON.stringify(data)
    }).then(
      () => {
        localStorage.removeItem('courseID');
        localStorage.removeItem('episodeID');
        localStorage.removeItem('lastSecond');
        console.log('Can Save Successfully');
      },
      (err) => {
        console.error(err);
      }
    )
  } catch (error) {
    console.log(error);
  }
}

export async function getOnGoingEpisodesForCourse(courseID: number): Promise<OnGoingEpisodes[]> {
  try {
    const response = await fetch(NEST_API_URLS.onGoingEpisode + `?course=${courseID}` , {
      method: "GET",
      headers: nestHeaderAuth(),
    })
    return await response.json() as OnGoingEpisodes[];
  } catch (error) {
    console.log(error);
    return [];
  }
}
