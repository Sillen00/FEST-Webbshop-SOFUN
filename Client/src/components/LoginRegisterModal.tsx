import { Box } from '@mui/material';

import { Button, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useUser } from '../contexts/UserContext';

function LoginRegisterModal() {
  const [register, setRegister] = useState(true);
  const navigate = useNavigate();

  const { registerUser, loginUser, isNotValid } = useUser();

  interface FormValues {
    username: string;
    password: string;
  }

  const handleLoginSubmit = (values: FormValues) => {
    loginUser(values);
    if (isNotValid === false) {
      navigate('/checkout');
    }
  };
  const handleRegisterSubmit = (values: FormValues) => {
    registerUser(values);
    if (isNotValid === false) {
      navigate('/checkout');
    }
  };

  //Form validation with Yup and Formik ----------------------------------------------------------

  const schemaLogin = Yup.object().shape({
    username: Yup.string().min(6, 'Wrong password or username'),
    password: Yup.string().min(4, 'Wrong password or username'),
  });
  const schemaRegister = Yup.object().shape({
    username: Yup.string().min(6, 'Name should have at least 6 letters'),
    password: Yup.string().min(4, 'Your password must be at least 4 to create an account'),
  });

  const formikLogin = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schemaLogin,
    onSubmit: handleLoginSubmit,
  });

  const formikRegister = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: schemaRegister,
    onSubmit: handleRegisterSubmit,
  });

  return (
    <>
      {register ? (
        <Box sx={{ background: 'white', padding: '4em' }}>
          <form onSubmit={formikLogin.handleSubmit}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Logga in
            </Typography>
            {isNotValid && (
              <Typography variant='h6' component='h2' color='error.main'>
                Fel användarnamn eller lösenord
              </Typography>
            )}
            <Box>
              <TextField
                id='username'
                name='username'
                label='Användarnamn'
                variant='standard'
                value={formikLogin.values.username}
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
                error={formikLogin.touched.username && Boolean(formikLogin.errors.username)}
                helperText={formikLogin.touched.username && formikLogin.errors.username}
              />
            </Box>
            <Box>
              <TextField
                id='password'
                name='password'
                label='Lösenord'
                variant='standard'
                type='password'
                value={formikLogin.values.password}
                onChange={formikLogin.handleChange}
                onBlur={formikLogin.handleBlur}
                error={formikLogin.touched.password && Boolean(formikLogin.errors.password)}
                helperText={formikLogin.touched.password && formikLogin.errors.password}
              />
            </Box>

            <Button
              type='submit'
              sx={{ width: '100%', marginTop: '1em' }}
              variant='contained'
              color='secondary'
            >
              Logga in
            </Button>
          </form>

          <Box sx={{ border: '1px solid gray', marginTop: '2em' }}></Box>

          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Har du inte ett konto?
          </Typography>
          <Button
            onClick={() => setRegister(false)}
            sx={{ width: '100%' }}
            variant='contained'
            color='secondary'
          >
            Skapa Konto
          </Button>
        </Box>
      ) : (
        <Box sx={{ background: 'white', padding: '4em' }}>
          <form onSubmit={formikRegister.handleSubmit}>
            <Typography id='modal-modal-title' variant='h6' component='h2'>
              Registrera dig
            </Typography>
            <Box>
              <TextField
                id='username'
                name='username'
                label='Användarnamn'
                variant='standard'
                value={formikRegister.values.username}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                error={formikRegister.touched.username && Boolean(formikRegister.errors.username)}
                helperText={formikRegister.touched.username && formikRegister.errors.username}
              />
            </Box>
            <Box>
              <TextField
                id='password'
                name='password'
                label='Lösenord'
                variant='standard'
                type='password'
                value={formikRegister.values.password}
                onChange={formikRegister.handleChange}
                onBlur={formikRegister.handleBlur}
                error={formikRegister.touched.password && Boolean(formikRegister.errors.password)}
                helperText={formikRegister.touched.password && formikRegister.errors.password}
              />
            </Box>

            <Button
              type='submit'
              sx={{ width: '100%', marginTop: '1em' }}
              variant='contained'
              color='secondary'
            >
              Registrera dig
            </Button>
          </form>

          <Box sx={{ border: '1px solid gray', marginTop: '2em' }}></Box>

          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Har redan ett konto?
          </Typography>
          <Button
            onClick={() => setRegister(true)}
            sx={{ width: '100%' }}
            variant='contained'
            color='secondary'
          >
            Logga in
          </Button>
        </Box>
      )}
    </>
  );
}

export default LoginRegisterModal;
