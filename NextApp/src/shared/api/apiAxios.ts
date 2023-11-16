import axios from "axios";

export const apiInstance = axios.create({
  baseURL: 'https://fakerapi.it/api/v1',
  headers: {
    "Content-Type": "application/json",
  },
});

// apiInstance.interceptors.request.use((config) => {
//   if (config.headers) {
//       config.headers.Authorization =
//           localStorage.getItem(USER_LOCALSTORAGE_KEY) || '';
//   }
//   return config;
// });
