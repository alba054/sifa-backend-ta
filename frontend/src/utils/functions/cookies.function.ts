import Cookies from "js-cookie";
import { COOKIES_KEY } from "../const/cookies.constant";

export function cookieGetLoggedInUserRole(): number | undefined {
  const data = __getCookie(COOKIES_KEY.LOGIN_ROLE);

  return !!data ? parseInt(data) : undefined;
}

export function cookieGetLoggedInUserNim() {
  // N011171001
  return __getCookie(COOKIES_KEY.LOGIN_NIM);
}

export function cookieGetLoggedInUserToken() {
  return __getCookie(COOKIES_KEY.LOGIN_TOKEN);
}

export function cookieSetLoginToken(token: string) {
  __setCookie(COOKIES_KEY.LOGIN_TOKEN, token);
}

export function cookieSetLoginNim(nim: string) {
  __setCookie(COOKIES_KEY.LOGIN_NIM, nim);
}

export function cookieSetLoginRole(role: number) {
  __setCookie(COOKIES_KEY.LOGIN_ROLE, role.toString());
}

function __getDomain() {
  return "";
}

function __setCookie(key: string, value: string) {
  Cookies.set(key, value, { domain: __getDomain() });
}

function __getCookie(key: string) {
  return Cookies.get(key);
}
