export class ApiService {
  async get<T>(url: string, options: Record<string, any>): Promise<T> {
    const res = await fetch(url, { ...options, method: 'GET' });
    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch: ${errorMessage}`);
    }

    if (options.responseType === 'blob') {
      return (await res.blob()) as unknown as T;
    }

    return (await res.json()) as T;
  }

  async post<T>(url: string, options: RequestInit): Promise<T> {
    const res = await fetch(url, { ...options, method: 'POST' });

    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(`Failed to fetch: ${errorMessage}`);
    }

    const contentType = res.headers.get('content-type');
    if (
      contentType?.includes('application/xml') ||
      contentType?.includes('text/xml')
    ) {
      return (await res.text()) as unknown as T;
    }

    return (await res.json()) as T;
  }
}