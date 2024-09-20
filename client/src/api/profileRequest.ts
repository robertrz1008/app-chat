import axios from './axios.ts'

export const createImagesRequest = (img: FormData) => axios.post("/profile/image", img)

export const getImageByIdRequest = (id: number) => axios.get(`/profile/image/${id}`)

type IdUser = { id: number}
export const changeImagesRequest = (id: number, idUser: IdUser) => axios.put(`/profile/image/${id}`, idUser)

export const deleteImageRequest = (id: number) => axios.delete(`/profile/image/${id}`)

export type Name={name: string}
export const updateNameProfileRequest = (id: number, name: Name) => axios.put(`/profile/name/${id}`, name)