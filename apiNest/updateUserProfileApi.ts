import { nestHeaderAuth, NEST_API_URLS } from './models/contact';

interface UpdateUserProfileProps {
  id?: number;
  email: string;
  bio: string;
  contact: Contact;
  createDate?: string;
  updateDate?: string;
  deletedAt?: string;
}

interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  current_position: string;
}

function removeProperty(obj: UpdateUserProfileProps) {
  let objLocal: UpdateUserProfileProps = obj;
  delete objLocal.id;
  delete objLocal.createDate;
  delete objLocal.updateDate;
  delete objLocal.deletedAt;
  return objLocal;
}

export default async function updateUserProfileApi(body: UpdateUserProfileProps, id: number) {
  try {
    const response = await fetch(NEST_API_URLS.users + `/${id}`, {
      method: "PATCH",
      headers: nestHeaderAuth(),
      body: JSON.stringify(removeProperty(body)),
    })
    return await response.json() as UpdateUserProfileProps;
  } catch (error) {
    console.log(error);
  }
}
