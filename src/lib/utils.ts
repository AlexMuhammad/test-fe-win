import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const putAccessToken = (token: string) => {
  localStorage.setItem('token', token);
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('token');
};
