import type { User } from '../types';
import { request, setToken } from './client';

interface UserResponse {
  id: string;
  email: string;
  user_name: string;
}

interface AuthResponse {
  message: string;
  user: UserResponse;
  token?: string;
}

function toUser(data: UserResponse): User {
  return {
    id: data.id,
    name: data.user_name,
    email: data.email,
    role: 'SOLICITANTE',
    active: true,
  };
}

export async function login(
  email: string,
  password: string,
): Promise<User> {
  const response = await request<AuthResponse>(
    '/users/login',
    {
      email,
      password,
    },
  );

  if (response.token) {
    setToken(response.token);
  }

  return toUser(response.user);
}

export async function register(
  name: string,
  email: string,
  password: string,
): Promise<User> {
  const response = await request<AuthResponse>(
    '/users/register',
    {
      email,
      user_name: name,
      password,
    },
  );

  if (response.token) {
    setToken(response.token);
  }

  return toUser(response.user);
}

export function logout(): void {
  setToken(null);
}