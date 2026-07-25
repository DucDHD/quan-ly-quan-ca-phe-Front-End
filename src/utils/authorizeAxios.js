import axios from 'axios'
import { toast } from 'react-toastify'

import { logoutUserAPI } from '../redux/user/userSlice'
import { refreshTokenAPI } from '../apis'

let axiosReduxStore
export const injectStore = mainStore => {
  axiosReduxStore = mainStore
}

let authorizeAxiosInstance = axios.create()

authorizeAxiosInstance.defaults.timeout = 1000*60*10 // 10p

authorizeAxiosInstance.defaults.withCredentials = true


let refreshTokenPromise = null


// Add a response interceptor
// Interceptors response: Intercept API response
authorizeAxiosInstance.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      axiosReduxStore.dispatch(logoutUserAPI(false))
    }

    const originalRequests = error.config

    if (error.response?.status === 410 && !originalRequests._retry ) {
      originalRequests._retry = true

      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshTokenAPI()
          .then( data => {
            return data?.accessToken
          })
          .catch((_error) => {
            axiosReduxStore.dispatch(logoutUserAPI(false))
            window.location.replace('/login')
            return Promise.reject(_error)
          } )
          .finally(() => {
            refreshTokenPromise = null
          })
      }
      // eslint-disable-next-line no-unused-vars
      return refreshTokenPromise.then( accessToken => {
        return authorizeAxiosInstance(originalRequests)
      })
    }


    let errorMessage = error?.message
    if (error.response?.data?.message) {
      errorMessage = error.response?.data?.message
    }

    if (![404,406, 409, 410, 422].includes(error.response?.status)) {
      toast.error(errorMessage)
    }

    // if (error.response?.status !== 410 && error.response?.status !== 409 ) {
    //   toast.error(errorMessage)
    // }

    return Promise.reject(error)
  }
)

export default authorizeAxiosInstance