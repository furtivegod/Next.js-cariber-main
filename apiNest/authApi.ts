import { NEST_HEADERs, NEST_API_URLS, nestHeaderAuth } from './models/contact';
import { Auth, AuthUser } from './models/content/auth';

export interface AuthApiProps {
  username: string;
  password: string;
}

export interface NextAuthResponse {
  error: string;
  ok: boolean;
  status: number;
  url: string | null;
}

export async function loginApi(body: AuthApiProps) {
  try {
    const response = await fetch(NEST_API_URLS.auth, {
      method: "POST",
      headers: NEST_HEADERs.default,
      body: JSON.stringify(body),
    })
    return await response.json() as Auth;
  } catch (error) {
    console.log(error);
  }
}

export async function loginOrCreateApi(body: any) {
  try {
    const response = await fetch(NEST_API_URLS.checkExists, {
      method: "POST",
      headers: NEST_HEADERs.default,
      body: JSON.stringify(body),
    })
    return await response.json() as any;
  } catch (error) {
    console.log(error);
  }
}

export async function getGoogleAuthToken(body: any) {
  try {
    const response = await fetch(NEST_API_URLS.googleAuth, {
      method: 'POST',
      headers: NEST_HEADERs.default,
      body: JSON.stringify(body),
    })
    return await response.json() as Auth;
  } catch (error) {
    console.log(error);
  }
}

export async function getFacebookAuthToken(body: any) {
  try {
    const response = await fetch(NEST_API_URLS.facebookAuth, {
      method: 'POST',
      headers: NEST_HEADERs.default,
      body: JSON.stringify(body),
    })
    return await response.json() as Auth;
  } catch (error) {
    console.log(error);
  }
}

export async function validateTokenApi() {
  try {
    const response = await fetch(NEST_API_URLS.auth, {
      method: "GET",
      headers: nestHeaderAuth(),
    })
    return await response.json() as AuthUser;
  } catch (error) {
    console.log(error)
  }
}
