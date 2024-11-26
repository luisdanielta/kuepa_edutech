import { ApiClient } from "../core/apiClient"

interface LoginResponse {
  token: string
  user: {
    id: string
    name: string
  }
}

export class AuthService {
  private apiClient: ApiClient

  constructor() {
    this.apiClient = new ApiClient()
  }

  async login(email: string, password: string): Promise<LoginResponse> {}

  logout(): void {}
}
