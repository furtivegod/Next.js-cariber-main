import { NEST_API_URLS, NEST_HEADERs } from "./models/contact";

interface ForgotPasswordProps{
  email: string
}

export async function forgotPasswordApi(body: ForgotPasswordProps) {
  try {
    const response = await fetch(NEST_API_URLS.forgotPassword, {
      method: "POST",
      headers: NEST_HEADERs.default,
      body: JSON.stringify(body)
    })
    return await response.json();
  } catch (error) {
    console.log(error);
  }
} 