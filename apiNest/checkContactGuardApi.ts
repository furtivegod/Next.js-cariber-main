import { nestHeaderAuth, NEST_API_URLS } from './models/contact';
import { CheckContactGuard } from './models/content/checkContactGuard';

export async function checkContactGuardApi() {
  try {
    const response = await fetch(NEST_API_URLS.checkContactGuard, {
      method: "GET",
      headers: nestHeaderAuth(),
    })
    return await response.json() as CheckContactGuard;
  } catch (error) {
    console.log(error);
  }
}