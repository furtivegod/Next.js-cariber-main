import { nestHeaderAuth, NEST_API_URLS } from "./models/contact";

interface ProfileImageBody{
  profile_image: File
}

export default async function ProfileImageApi(id: number, body: ProfileImageBody){
  const formData = new FormData();
  formData.append("profile_image", body.profile_image, body.profile_image.name)
  try {
    const response = await fetch(NEST_API_URLS.users + `/${id}/profile_image`, {
      method: "POST",
      headers: nestHeaderAuth(true),
      body: formData,
    })
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}