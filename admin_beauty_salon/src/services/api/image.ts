import http from '../http'

import { API_URL } from '../urls'

export const ImageApi = {
  uploadImage: (folderName: string, formData: FormData) =>
    http.post<ResponseUploadImageType>(
      `${API_URL.uploadImage}/${folderName}`,
      formData,
      {
        headers: { 'content-type': 'multipart/form-data' },
      },
    ),

  uploadImages: (folderName: string, formData: FormData) =>
    http.post<ResponseUploadImagesType>(
      `${API_URL.uploadImages}/${folderName}`,
      formData,
      {
        headers: { 'content-type': 'multipart/form-data' },
      },
    ),

  getAllImages: (folderName: string) =>
    http.get<ResponseGetAllImagesType>(`${API_URL.getAllImages}/${folderName}`),

  deleteImages: (folderName: string, imageNames: string) =>
    http.delete<ResponseDeleteImagesType>(
      `${API_URL.deleteImages}/${folderName}`,
      {
        params: { imageNames: imageNames },
      },
    ),
}
