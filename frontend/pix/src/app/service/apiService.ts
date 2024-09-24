
const apiService = {
  get: async function <T>(
    url: string,
    accept?: string,
    contentType?: string
  ): Promise<{ status: number; data: T }> {
    console.log("GET", url);

    
    return new Promise<{ status: number; data: T }>((resolve, reject) => {
      const headers: { [key: string]: string } = {};

      if (accept) {
        headers["Accept"] = accept;
      }
      if (contentType) {
        headers["Content-Type"] = contentType;
      }

      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "GET",
        headers: headers,
      })
        .then((response) => {
          const status = response.status;
          response
            .json()
            .then((data) => {
              resolve({ status, data });
            })
            .catch((error) => {
              reject(error);
            });
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  post: async function <T> (
    url: string,
    data: any,
    contentType?: any,
    accept?: any
  ): Promise<T> {
    console.log("POST", url);
    console.log("data", data);
    const headers: { [key: string]: string } = {};


    if (contentType) {
      headers["Content-Type"] = contentType;
    }
    if (accept) {
      headers["Accept"] = accept;
    }

    return new Promise((resolve, reject) => {
      fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
        method: "POST",
        body: data,
        headers: headers,
      })
        .then((response) => response.json())
        .then((json) => {
          console.log("response", json);

          resolve(json);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default apiService;