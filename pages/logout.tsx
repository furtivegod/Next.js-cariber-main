import { useRouter } from "next/router";
import UserManager from "../auth/userManager";


export default function Logout() {
  const router = useRouter();
  const userManager = new UserManager();
  userManager.destroyToken();
  router.replace("/")
  return(
    <div></div>
  )
}