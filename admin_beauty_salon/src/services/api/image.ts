import http from "../http";

import { API_URL } from "../urls";

export const ImageApi = {
  uploadImage: async function (formData: FormData): Promise<any> {
    return await http.post(API_URL.uploadImage, formData, {
      headers: { "content-type": "multipart/form-data" },
    });
  },
};
