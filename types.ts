export type ImageSize = '1K' | '2K';
export type AspectRatio = '1:1' | '16:9' | '4:3' | '3:4' | '9:16';
export type LogoLayout = 'side-by-side' | 'stacked';
export type ColorTheme = 'Modern Blue' | 'Energetic Orange' | 'Sleek Dark' | 'Vibrant Gradient' | 'Monochrome';
export type UserRole = 'admin' | 'pro' | 'user';

export interface AuthUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  role: UserRole;
  displayName?: string;
}

export interface LogoPair {
  full: string;
  icon?: string;
}

export interface LogoConfig {
  brandName: string;
  brandDescription?: string;
  imageSize: ImageSize;
  aspectRatio: AspectRatio;
  style: string;
  layout: LogoLayout;
  colorTheme: ColorTheme;
}

export interface LogoBatch {
  id: string;
  pairs: LogoPair[];
  config: LogoConfig;
  timestamp: number;
}

export interface AppState {
  user: AuthUser | null;
  isLoading: boolean;
  history: LogoBatch[];
  error: string | null;
}