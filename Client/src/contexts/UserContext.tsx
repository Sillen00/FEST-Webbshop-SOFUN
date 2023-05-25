import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

interface User {
  _id: string;
  username: string;
  password: string;
  isAdmin: boolean;
}

interface UserContextValue {
  registerUser: (values: User) => void;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  loginUser: (values: User) => void;
  isLoggedIn: boolean;
  isNotValid: boolean;
  fetchAllUsers: () => void;
  allUsers: User[];
  assignAsAdmin: (userId: string) => void;
  removeAsAdmin: (userId: string) => void;
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
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = async () => {
    axios
      .get('/api/users', { withCredentials: true })
      .then(function (response) {
        setAllUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const registerUser = async (values: User) => {
    await axios
      .post(
        '/api/users/signup',
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
        '/api/users/login',
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

  const assignAsAdmin = async (userId: string) => {
    axios
      .put(`/api/users/${userId}/assignAsAdmin`, {}, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        setAllUsers(prevUsers =>
          prevUsers.map(user => (user._id === userId ? { ...user, isAdmin: true } : user))
        );
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const removeAsAdmin = async (userId: string) => {
    axios
      .put(`/api/users/${userId}/removeAsAdmin`, {}, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        setAllUsers(prevUsers =>
          prevUsers.map(user => (user._id === userId ? { ...user, isAdmin: false } : user))
        );
      })
      .catch(function (error) {
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
        fetchAllUsers,
        allUsers,
        assignAsAdmin,
        removeAsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
