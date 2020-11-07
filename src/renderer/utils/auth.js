// import Cookies from 'js-cookie'

// export const setCookie = (key, val, option = {}) => {
//   return Cookies.set(key, val, option)
// }

// export const getCookie = (key) => {
//   return Cookies.get(key)
// }

// export const removeCookie = (key) => {
//   return Cookies.remove(key)
// }

export const setCookie = (key, val, option = {}) => {
  return sessionStorage.setItem(key, val, option)
}

export const getCookie = (key) => {
  return sessionStorage.getItem(key)
}

export const removeCookie = (key) => {
  return sessionStorage.removeItem(key)
}

export const removeAllCookie = () => {
  return sessionStorage.clear()
}
