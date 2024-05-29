interface HTTPInstance {
  get<T>(url: string, config?: RequestInit): Promise<T>;
  delete<T>(url: string, config?: RequestInit): Promise<T>;
  post<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
  patch<T>(url: string, data?: unknown, config?: RequestInit): Promise<T>;
}

class Service {
  public http: HTTPInstance;
  private baseURL: string;
  private headers: Record<string, string>;
  constructor() {
    this.baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
    this.headers = {
      csrf: 'token',
      Referer: this.baseURL,
    };

    this.http = {
      get: this.get.bind(this),
      delete: this.delete.bind(this),
      post: this.post.bind(this),
      patch: this.patch.bind(this),
    };
  }

  private async request<T = unknown>(
    method: string,
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    try {
      const response = await fetch(this.baseURL + url, {
        method,
        headers: {
          ...this.headers,
          ...config?.headers,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: data ? JSON.stringify(data) : undefined,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      return await response.json();
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  }

  private get<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('GET', url, undefined, config);
  }

  private delete<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('DELETE', url, undefined, config);
  }

  private head<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('HEAD', url, undefined, config);
  }

  private options<T>(url: string, config?: RequestInit): Promise<T> {
    return this.request<T>('OPTIONS', url, undefined, config);
  }

  private post<T>(
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    return this.request<T>('POST', url, data, config);
  }

  private put<T>(
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    return this.request<T>('PUT', url, data, config);
  }

  private patch<T>(
    url: string,
    data?: unknown,
    config?: RequestInit
  ): Promise<T> {
    return this.request<T>('PATCH', url, data, config);
  }
}

export default Service;
