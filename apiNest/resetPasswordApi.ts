import { nestHeaderAuth, NEST_API_URLS } from './models/contact';
import { RegisterContent } from './models/content/register';

export interface ResetPasswordProps {
  password: string;
  passwordConfirmation: string;
}

export interface EmailPasswordApiProps {
  code: string;
  password: string;
  passwordConfirmation: string;
}

export default async function resetPasswordApi(body: ResetPasswordProps) {
  try {
    const response = await fetch(NEST_API_URLS.resetPassword, {
      method: "POST",
      headers: nestHeaderAuth(),
      body: JSON.stringify(body),
    })
    return await response.json() as RegisterContent;
  } catch (error) {
    console.log(error);
  }
}

export async function resetPasswordWithEmail(body: EmailPasswordApiProps) {
  const token = body.code
  const data = {
    "password": body.password,
    "passwordConfirmation": body.passwordConfirmation
  }
  const response = await fetch(NEST_API_URLS.resetPassword, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  }).then((res)=>res.json())
  .catch(err=>{console.log(err);})
  return response
}