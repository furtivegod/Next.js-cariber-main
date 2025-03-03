import { nestHeaderAuth, NEST_API_URLS } from "./models/contact";

interface CheckPasswordProps{
  password: string;
}

interface CheckPasswordResponse{
  match: boolean;
}

export default async function checkPasswordApi(body: CheckPasswordProps){
  try {
    const response = await fetch(NEST_API_URLS.checkPassword, {
      method: "POST",
      headers: nestHeaderAuth(),
      body: JSON.stringify(body)
    })
    return await response.json() as CheckPasswordResponse;
  } catch (error) {
    console.log(error);
  }
}