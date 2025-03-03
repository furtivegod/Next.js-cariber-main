import { WoocommerceCredentials } from "../apiNest/models/content/woocommerce";
import { NEST_API_URLS, nestHeaderAuth } from "../apiNest/models/contact";
import { notification } from "antd";
import router from "next/router";
import { validateTokenApi } from "../apiNest/authApi";


export class WoocommerceService {

  public static claimOrderIDWithCurrentUser(shopeeID: string) {
    validateTokenApi().then(
      (res)=> {
        if (!res?.email) {
          notification['error']({ message: 'Email Not Found' })
          return
        }
        const credentials: WoocommerceCredentials = {
          user_id: res?.id?.toString() || '',
          shopee_id: shopeeID,
        }
        this.checkClaimedOrNot(credentials).then(() => {});
      },
      (error) => notification['error']({ message: error.message }),
    );
  }

  private static async checkClaimedOrNot(credentials: WoocommerceCredentials) {
    try {
      const response: { message: string } = await fetch(NEST_API_URLS.users + `/claim-shopee-id`, {
        method: "POST",
        headers: nestHeaderAuth(),
        body: JSON.stringify(credentials),
      }).then(function(response) {
        return response.json();
      }).then(function(data) {
        return data;
      });
      this.redirect(response.message);
      return;
    } catch (error) {
      console.log(error);
    }
  }

  private static redirect(type: string) {
    type === 'Shopee ID has claimed'
      ? notification['success']({message: 'Successfully Claimed'})
      : notification['error']({message: 'This Course has been Claimed'});
    setTimeout( () => {
      router.replace("/library").then(() => {});
    }, 1000);
  }

}
