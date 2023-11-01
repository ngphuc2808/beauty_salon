import http from '../http'

import { API_URL } from '../urls'

export const ImageApi = {
  uploadImage: (formData: FormData) =>
    http.post<ResponseUploadImageType>(API_URL.uploadImage, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    }),

  uploadImages: (formData: FormData) =>
    http.post<ResponseUploadImagesType>(API_URL.uploadImages, formData, {
      headers: { 'content-type': 'multipart/form-data' },
    }),
}
