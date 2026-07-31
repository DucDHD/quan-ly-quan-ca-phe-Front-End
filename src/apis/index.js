import { API_ROOT } from '~/utils/constants'
import authorizeAxiosInstance from '~/utils/authorizeAxios'


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


export const getAllUserAPI = async (params) => {
    const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/users`, { params })
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


export const getAllTableAPI = async () => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/sales`)
  return response.data
}


export const bookingTableAPI = async (updateData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/sales/booking_table`, updateData)
  return response.data
}

export const getAllProductAPI = async () => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/sales/products`)
  return response.data
}


export const orderProductAPI = async (updateData) => {
  const response = await authorizeAxiosInstance.post(`${API_ROOT}/v1/sales/orders`, updateData)
  return response.data
}

export const getTableDetailAPI = async (TableId) => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/sales/view/${TableId}`)
  return response.data
}

export const getPaymentInfoAPI = async (TableId) => {
  const response = await authorizeAxiosInstance.get(`${API_ROOT}/v1/sales/payment/${TableId}`)
  return response.data
}

export const paymentAPI = async (TableId) => {
  const response = await authorizeAxiosInstance.put(`${API_ROOT}/v1/sales/payment/${TableId}`)
  return response.data
}





