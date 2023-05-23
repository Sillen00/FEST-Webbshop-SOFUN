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
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        // setUsernameTakenError(error.response.data);
      });
  };

  return (
    <UserContext.Provider
      value={{
        registerUser,
        open,
        handleOpen,
        handleClose,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
