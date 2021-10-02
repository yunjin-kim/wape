
export function getCookie(){
  let cookie = document.cookie;
  cookie = decodeURI(cookie.split(',')[0].replace('nick=', ''));
  return cookie;
}