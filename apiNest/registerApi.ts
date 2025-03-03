import { NEST_API_URLS, NEST_HEADERs } from './models/contact';
import { RegisterContent } from './models/content/register';

export interface RegisterApiProps {
  email: string,
  password: string
}

export default async function registerApi(body: RegisterApiProps) {
  try {
    const response = await fetch(NEST_API_URLS.users, {
      method: "POST",
      headers: NEST_HEADERs.default,
      body: JSON.stringify(body),
    })
    return await response.json() as RegisterContent;
  } catch (error) {
    console.log(error);
  }
}