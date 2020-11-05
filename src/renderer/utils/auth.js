import Cookies from 'js-cookie'

export const setCookie = (key, val, option = {}) => {
  return Cookies.set(key, val, option)
}

export const getCookie = (key) => {
  return Cookies.get(key)
}

export const removeCookie = (key) => {
  return Cookies.remove(key)
}
