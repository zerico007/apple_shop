interface User {
  userId: string;
  username: string;
  password: string;
  email: string;
  role: string;
  token: string;
  isLoggedIn: boolean;
  isLoading: boolean;
  error: unknown;
}
