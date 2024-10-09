
class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = "ApiError";
  }
}

export class ApiService {
  async get<T>(url: string, options: Record<string, any>): Promise<{ data: T; status: number }> {
    const res = await fetch(url, { ...options, method: 'GET' });
    const status = res.status;

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch: ${errorMessage}`);
    }

    let data: T;
    if (options.responseType === 'blob') {
      data = (await res.blob()) as unknown as T;
    } else {
      data = (await res.json()) as T;
    }

    return { data, status };
  }

  async post<T>(url: string, options: RequestInit): Promise<{ data: T; status: number }> {
    const res = await fetch(url, { ...options, method: 'POST' });
    const status = res.status;

    if (!res.ok) {
      const errorMessage = await res.text();
      const status = res.status;
      throw new ApiError(`Failed to fetch: ${errorMessage}`, status);
    }

    let data: T;
    const contentType = res.headers.get('content-type');
    if (contentType?.includes('application/xml') || contentType?.includes('text/xml')) {
      data = (await res.text()) as unknown as T;
    } else {
      data = (await res.json()) as T;
    }

    return { data, status };
  }
}