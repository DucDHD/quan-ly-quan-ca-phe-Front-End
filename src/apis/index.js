import { API_ROOT } from '../utils/constants'
import authorizeAxiosInstance from '../utils/authorizeAxios'


/** User APIS */
export const fetchUserDetailByIdAPI = async (userId) => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/users/${userId}`)
    return response.data
}


export const updateUserDetailByIdAPI = async (userId, updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/profile/${userId}`, updateData)
    return response.data
}

export const updatedAvatarAPI =  async (userId, updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/avatar/${userId}`, updateData)
    return response.data
}


export const createdUserAPI = async (updateData) => {
    const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/users`, updateData)
    return response.data
}


export const getAllUserAPI = async () => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/users`)
    return response.data
}

export const deleteUserAPI = async (userId) => {
    const response = await authorizeAxiosInstance.delete(`${API_ROOT}/v1/users/${userId}`)
    return response.data
}


export const updateUserAPI = async (userId, updateData) => {
    const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/users/${userId}`, updateData)
    return response.data
}


export const refreshTokenAPI = async () => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/users/refresh_token`)
  return response.data
}