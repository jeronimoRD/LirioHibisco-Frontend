/**
 * Endpoints de autenticación (prefijo /api/auth) y la traducción entre el
 * español del servidor y el inglés de la app.
 */

import type { Role, User } from '../types';
import { request } from './client';

/** Forma en que el backend devuelve un usuario en este proyecto. */
interface UserResponse {
  id: string;
  email: string;
  user_name: string;
}

interface SessionResponse {
  message: string;
  user: UserResponse;
}

/** Convierte la respuesta del servidor al tipo `User` de la app. */
function toUser(data: UserResponse): User {
  return {
    id: data.id,
    name: data.user_name,
    email: data.email,
    // El backend no devuelve rol/activo: asignamos valores por defecto.
    role: 'SOLICITANTE',
    active: true,
  };
}

/** POST /users/login -> token de sesión y usuario que entró. */
export async function login(email: string, password: string): Promise<User> {
  const session = await request<SessionResponse>('/users/login', {
    email,
    password,
  });
  return toUser(session.user);
}

/** POST /users/register -> el usuario creado (201). Ojo: NO devuelve token. */
export async function register(name: string, email: string, password: string): Promise<User> {
  const res = await request<SessionResponse>('/users/register', {
    email,
    user_name: name,
    password,
  });
  return toUser(res.user);
}

/** GET /auth/perfil -> el usuario de la sesión actual. Requiere token. */
export async function profile(): Promise<User> {
  return toUser(await request<UserResponse>('/auth/perfil'));
}
