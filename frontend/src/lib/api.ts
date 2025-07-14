import { User, AuthTokens } from '../types/auth';

const API_BASE_URL = '/api';

interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}


class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get auth token
    const token = localStorage.getItem('accessToken');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      // Handle 401 Unauthorized - try to refresh token
      if (response.status === 401) {
        const refreshed = await this.refreshToken();
        if (refreshed) {
          // Retry the original request with new token
          const newToken = localStorage.getItem('accessToken');
          if (newToken) {
            config.headers = {
              ...config.headers,
              Authorization: `Bearer ${newToken}`,
            };
            const retryResponse = await fetch(url, config);
            if (retryResponse.ok) {
              return await retryResponse.json();
            }
          }
        }
        // If refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
        throw new Error('Authentication failed');
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Network error' }));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error');
    }
  }

  private async refreshToken(): Promise<boolean> {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        return false;
      }

      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data: ApiResponse<AuthTokens> = await response.json();
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        return true;
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }
    return false;
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.request<ApiResponse<{ user: User; tokens: AuthTokens }>>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    return response.data;
  }

  async register(email: string, password: string, name: string): Promise<{ user: User; tokens: AuthTokens }> {
    const response = await this.request<ApiResponse<{ user: User; tokens: AuthTokens }>>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    });
    return response.data;
  }

  async logout(): Promise<void> {
    try {
      await this.request('/auth/logout', { method: 'POST' });
    } catch (error) {
      // Ignore logout errors
    }
  }

  async getProfile(): Promise<User> {
    const response = await this.request<ApiResponse<{ user: User }>>('/auth/profile');
    return response.data.user;
  }

  async updateProfile(data: { name?: string; email?: string }): Promise<User> {
    const response = await this.request<ApiResponse<{ user: User }>>('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data.user;
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    await this.request('/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ currentPassword, newPassword }),
    });
  }
}

export const apiClient = new ApiClient(); 