import React, { createContext, useState, useCallback, useContext } from 'react';
import { login } from '../services/api';

interface AuthState {
  token: string;
  user: any;
}

interface SignInCredentials {
  email: string;
  password: any;
}

interface AuthContextData {
  user: any;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@AJS:token');
    const user = localStorage.getItem('@AJS:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    // const response = await api.post('/sessions', {
    //   email,
    //   password,
    // });

    const { token, user } = login({ email, password });

    localStorage.setItem('@AJS:token', token);
    localStorage.setItem('@AJS:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@AJS:token');
    localStorage.removeItem('@AJS:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
