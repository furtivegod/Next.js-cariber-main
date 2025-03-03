import { NextRouter } from 'next/router';
import { setCookies, getCookie, removeCookies, checkCookies } from 'cookies-next';
import { CookieValueTypes } from 'cookies-next/lib/types';
import getUserProfileApi from '../apiNest/getUserProfileApi';

export default class UserManager {
    tokenKey: string = "token";
    profileImage: string = "img-profile";
    userId: string = "uid";

    constructor() { }

    async saveToken(token: string): Promise<void> {
        await setCookies(this.tokenKey, token, { sameSite: "none", secure: true });
        const user = await getUserProfileApi();
        await this.saveProfileImage();
        await this.saveUserId(user.id);
    }

    getToken(): CookieValueTypes {
        return getCookie(this.tokenKey, { sameSite: "none", secure: true });
    }

    getJwtToken(): string {
        return "Bearer " + getCookie(this.tokenKey, { sameSite: "none", secure: true });
    }

    destroyToken(): void {
        removeCookies(this.tokenKey, { sameSite: "none", secure: true });
        this.deleteUserId();
        this.deleteProfileImage();
    }

    isLoggedIn(): boolean {
        return checkCookies(this.tokenKey);
    }

    saveProfileImage(): void {
        getUserProfileApi().then((value) => {
            setCookies(this.profileImage, value.profile_image, { sameSite: "none", secure: false });
        })
    }

    getProfileImage(): CookieValueTypes {
        return getCookie(this.profileImage, { sameSite: "none", secure: false });
    }

    deleteProfileImage(): void {
        removeCookies(this.profileImage, { sameSite: "none", secure: false });
    }

    saveUserId(id: number): void {
        setCookies(this.userId, id, { sameSite: "none", secure: true });
    }

    getUserId(): CookieValueTypes {
        return getCookie(this.userId, { sameSite: "none", secure: true });
    }

    deleteUserId(): void {
        removeCookies(this.userId, { sameSite: "none", secure: true });
    }

    async redirectCheckout(router: NextRouter, sku: string) {
        const userID = Buffer.from(this.getUserId()?.toString() || "", 'utf8').toString('base64');
        router.push(`https://careerfact.wpcomstaging.com/?add-sku=${sku}&cid=${userID}`);
    }
}