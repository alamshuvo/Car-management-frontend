import { jwtDecode } from 'jwt-decode';

export interface CustomJwtPayload {
  userEmail: string;
  userId: string;
  role: string;
  exp?: number; // Optional expiration time
  iat?: number; // Optional issued-at time
}

export const varifyToken = (token: string): CustomJwtPayload | null => {
  try {
    return jwtDecode<CustomJwtPayload>(token);
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};
