import { uuid } from 'uuidv4';

import AppError from '../errors/AppError';

interface LoginProps {
  email: string;
  password: string;
}

interface UserDTO {
  user: User;
  token: string;
}

export interface User {
  name: string;
  email: string;
  confirmEmail: string;
  password: string;
  confirmPassword: string;
}

const createUser = (data: User): void => {
  const users = localStorage.getItem('@AJS:users');
  const newUsers = users ? (JSON.parse(users) as Array<User>) : [];

  const findUser = newUsers.find(user => user.email === data.email);

  if (findUser) {
    throw new AppError('E-mail já existente');
  }

  newUsers.push(data);

  localStorage.setItem('@AJS:users', JSON.stringify(newUsers));
};

const login = ({ email, password }: LoginProps): UserDTO => {
  const users = localStorage.getItem('@AJS:users');

  if (!users) {
    throw new AppError('E-mail e/ou senha inválidos');
  }

  const usersArray = JSON.parse(users) as Array<any>;

  const user = usersArray.find(
    userData => userData.email === email && userData.password === password,
  );

  if (!user) {
    throw new AppError('E-mail e/ou senha inválidos');
  }

  return {
    token: uuid(),
    user,
  };
};

const getUsers = (): User[] => {
  const users = localStorage.getItem('@AJS:users');

  return users ? (JSON.parse(users) as Array<User>) : [];
};

export { createUser, login, getUsers };
