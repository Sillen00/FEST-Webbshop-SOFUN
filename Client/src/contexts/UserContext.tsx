import axios from 'axios';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

export interface User {
  _id: string;
  username: string;
  isAdmin: boolean;
}

interface UserContextValue {
  registerUser: (values: { username: string; password: string }) => void;
  open: boolean;
  handleOpen: () => void;
  handleClose: () => void;
  loginUser: (values: { username: string; password: string }) => void;
  isLoggedIn: boolean;
  isNotValid: boolean;
  allUsers: User[];
  assignAsAdmin: (userId: string) => void;
  removeAsAdmin: (userId: string) => void;
  logoutUser: () => void;
  currentUser: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  adminStatusUpdated: boolean;
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
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminStatusUpdated, setAdminStatusUpdated] = useState(false);

  useEffect(() => {
    const fetchAllUsers = async () => {
      if (isAdmin) {
        try {
          const response = await axios.get('/api/users', { withCredentials: true });
          setAllUsers(response.data);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchAllUsers();
  }, [isAdmin]);

  const loginUser = async (values: { username: string; password: string }) => {
    await axios
      .post(
        '/api/users/login',
        {
          username: values.username,
          password: values.password,
        },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then(function (response) {
        handleClose();
        setIsLoggedIn(true);
        setCurrentUser(response.data);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
        setIsNotValid(true);
      });
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get('/api/users/checkSession', { withCredentials: true })
      .then(response => {
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
          setCurrentUser(response.data.user);
          setIsAdmin(response.data.isAdmin);
        } else {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
        setIsLoading(false);
      });
  }, []);

  const registerUser = async (values: { username: string; password: string }) => {
    axios
      .post(
        '/api/users/signup',
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

  const logoutUser = async () => {
    await axios
      .post('/api/users/logout', {}, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        setIsLoggedIn(false);
        setAllUsers([]);
        setCurrentUser(null);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const assignAsAdmin = async (userId: string) => {
    axios
      .put(`/api/users/${userId}/assignAsAdmin`, {}, { withCredentials: true })
      .then(function (response) {
        console.log(response);
        setAdminStatusUpdated(prev => !prev);
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
        setAdminStatusUpdated(prev => !prev);
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
        allUsers,
        assignAsAdmin,
        removeAsAdmin,
        logoutUser,
        currentUser,
        isLoading,
        isAdmin,
        adminStatusUpdated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
