import axios from 'axios';
import { createContext, ReactNode, useContext, useState } from 'react';

interface User {
  username: string;
  password: string;
}

interface UserContextValue {
  registerUser: (values: User) => void;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  loginUser: (values: User) => void;
  isLoggedIn: boolean;
  isNotValid: boolean;
}

export const UserContext = createContext<UserContextValue>(null as any);
export const useUser = () => useContext(UserContext);

interface Props {
  children: ReactNode;
}

export default function UserProvider({ children }: Props) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [isLoggedIn, setIsLoggedIn] = useState(false); // or false, depending on the user's login status
  const [isNotValid, setIsNotValid] = useState(false);

  const registerUser = async (values: User) => {
    await axios
      .post(
        'http://localhost:3000/api/users/signup',
        {
          username: values.username,
          password: values.password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(function (response) {
        handleClose();
        setIsLoggedIn(true);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        setIsNotValid(true);
        // setUsernameTakenError(error.response.data);
      });
  };

  const loginUser = async (values: User) => {
    axios
      .post(
        'http://localhost:3000/api/users/login',
        {
          username: values.username,
          password: values.password,
        },
        { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
      )
      .then(function (response) {
        if (response) {
          handleClose();
          setIsLoggedIn(true);
          console.log(response);
        }
      })
      .catch(function (error) {
        setIsNotValid(true);
        console.log(error);
      });
  };

  return (
    <UserContext.Provider
      value={{
        registerUser,
        open,
        handleOpen,
        handleClose,
        loginUser,
        isLoggedIn,
        isNotValid,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
