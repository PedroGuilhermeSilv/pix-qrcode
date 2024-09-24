// const apiService = {
//   get: async function <T>(
//     url: string,
//     accept?: string,
//     contentType?: string,
//     responseType?: 'json' | 'blob' // Adiciona um parâmetro para o tipo de resposta
//   ): Promise<{ status: number; data: T }> {
//     console.log("GET", url);

//     return new Promise<{ status: number; data: T }>((resolve, reject) => {
//       const headers: { [key: string]: string } = {};

//       if (accept) {
//         headers["Accept"] = accept;
//       }
//       if (contentType) {
//         headers["Content-Type"] = contentType;
//       }

//       fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//         method: "GET",
//         headers: headers,
//       })
//         .then((response) => {
//           const status = response.status;
//           if (responseType === 'blob') {
//             response.blob()
//               .then((data) => {
//                 resolve({ status, data: data as unknown as T });
//               })
//               .catch((error) => {
//                 reject(error);
//               });
//           } else {
//             response.json()
//               .then((data) => {
//                 resolve({ status, data });
//               })
//               .catch((error) => {
//                 reject(error);
//               });
//           }
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   },
//   post: async function <T> (
//     url: string,
//     data: any,
//     contentType?: any,
//     accept?: any
//   ): Promise<T> {
//     console.log("POST", url);
//     console.log("data", data);
//     const headers: { [key: string]: string } = {};

//     if (contentType) {
//       headers["Content-Type"] = contentType;
//     }
//     if (accept) {
//       headers["Accept"] = accept;
//     }

//     return new Promise((resolve, reject) => {
//       fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
//         method: "POST",
//         body: data,
//         headers: headers,
//       })
//         .then((response) => response.json())
//         .then((json) => {
//           console.log("response", json);

//           resolve(json);
//         })
//         .catch((error) => {
//           reject(error);
//         });
//     });
//   },
  
// };

// export default apiService;



export class ApiService {
  async get<T>(url: string, options: Record<string, any>): Promise<T> {
    const res = await fetch(url, {headers: {
      "Content-Type": "application/json",
  }, ...options})
    if (!res.ok) {
      const errorMessage = await res.text()
      throw new Error(`Failed to fetch: ${errorMessage}`)
    }
    return (await res.json()) as T
  }

  async post<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(url, { ...options, method: 'POST' })

    if (!res.ok) {
      const errorMessage = await res.text()
      throw new Error(`Failed to fetch: ${errorMessage}`)
    }

    const contentType = res.headers.get('content-type')
    if (
      contentType?.includes('application/xml') ||
      contentType?.includes('text/xml')
    ) {
      return (await res.text()) as unknown as T
    }

    return (await res.json()) as T
  }
}