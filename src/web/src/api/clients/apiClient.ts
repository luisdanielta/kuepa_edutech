import { TokenStorage } from "../../utils/tokenStorage"
import { HttpClient, HttpRequestConfig, HttpResponse } from "./httpClient"

export class ApiClient extends HttpClient {
  private static instance: ApiClient

  private constructor() {
    super("http://192.168.1.4:3000/v1/api")
  }

  public static getInstance(): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient()
    }
    return ApiClient.instance
  }

  public async request<T>(
    endpoint: string,
    config: HttpRequestConfig = {},
  ): Promise<HttpResponse<T>> {
    const token = TokenStorage.getToken()
    const headers = {
      ...config.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    return super.request<T>(endpoint, { ...config, headers })
  }
}
