import { getToken } from "../utils/auth"
import { HttpClient, HttpRequestConfig, HttpResponse } from "./httpClient"

export class ApiClient extends HttpClient {
  constructor() {
    super("https://localhost:3000/v1/api")
  }

  protected async request<T>(
    endpoint: string,
    config: HttpRequestConfig = {},
  ): Promise<HttpResponse<T>> {
    const token = getToken()
    const headers = {
      ...config.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    return super.request<T>(endpoint, { ...config, headers })
  }
}
