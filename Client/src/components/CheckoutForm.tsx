import { Button, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useCart } from '../contexts/CartContext';
import { Order, useOrder } from '../contexts/OrderContext';
import { useUser } from '../contexts/UserContext';

const CheckoutSchema = Yup.object().shape({
  firstName: Yup.string().required('Ange ditt förnamn'),
  lastName: Yup.string().required('Ange ditt efternamn'),
  address: Yup.string().required('Ange din adress'),
  zipCode: Yup.number().required('Ange ditt postnummer'),
  city: Yup.string().required('Ange din stad'),
  phoneNumber: Yup.number()
    .typeError('Telefonnumret måste bestå av siffror')
    .required('Ange ditt telefonnummer'),
});

type CheckoutValues = Yup.InferType<typeof CheckoutSchema>;

export default function CheckoutForm() {
  const navigate = useNavigate();
  const { createOrder } = useOrder();
  const { cart, clearCart } = useCart();
  const { currentUser } = useUser();

  const formik = useFormik<CheckoutValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      zipCode: 0,
      city: '',
      phoneNumber: 0,
    },
    validationSchema: CheckoutSchema,
    onSubmit: async values => {
      console.log('cart:', cart);
      console.log('currentUser:', currentUser);
      const orderItems = cart.map(item => ({ productID: item.id, quantity: item.quantity }));
      const totalPrice = cart.reduce((total, item) => total + item.quantity * item.price, 0);

      const newOrder: Order = {
        userID: currentUser ? currentUser._id : '',
        totalPrice,
        deliveryAddress: values,
        isShipped: false,
        orderItems,
      };

      await createOrder(newOrder);
      navigate('/confirmation');
      clearCart();
    },
  });

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}
    >
      <Typography variant='h5'>Leveransuppgifter </Typography>

      <Box
        component='form'
        sx={{
          '& > :not(style)': {
            m: 1,
            width: '16rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
        noValidate
        autoComplete='on'
        onSubmit={formik.handleSubmit}
        data-cy='customer-form'
      >
        <TextField
          fullWidth
          id='firstName'
          type='text'
          name='firstName'
          label='Förnamn'
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
          inputProps={{ 'data-cy': 'customer-first-name' }}
          FormHelperTextProps={{ 'data-cy': 'customer-first-name-error' } as any}
          autoComplete='firstName'
        />
        <TextField
          fullWidth
          id='lastName'
          type='text'
          name='lastName'
          label='Efternamn'
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
          inputProps={{ 'data-cy': 'customer-last-name' }}
          FormHelperTextProps={{ 'data-cy': 'customer-last-name-error' } as any}
          autoComplete='lastName'
        />

        <TextField
          fullWidth
          id='address'
          type='text'
          name='address'
          label='Adress'
          value={formik.values.address}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.address && Boolean(formik.errors.address)}
          helperText={formik.touched.address && formik.errors.address}
          inputProps={{ 'data-cy': 'customer-address' }}
          FormHelperTextProps={{ 'data-cy': 'customer-address-error' } as any}
          autoComplete='street-address'
        />
        <TextField
          fullWidth
          id='zipcode'
          type='number'
          name='zipCode'
          label='Postnummer'
          value={formik.values.zipCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.zipCode && Boolean(formik.errors.zipCode)}
          helperText={formik.touched.zipCode && formik.errors.zipCode}
          inputProps={{ 'data-cy': 'customer-zipcode' }}
          FormHelperTextProps={{ 'data-cy': 'customer-zipcode-error' } as any}
          autoComplete='postal-code'
        />
        <TextField
          fullWidth
          id='city'
          type='city'
          name='city'
          label='Stad'
          value={formik.values.city}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.city && Boolean(formik.errors.city)}
          helperText={formik.touched.city && formik.errors.city}
          inputProps={{ 'data-cy': 'customer-city' }}
          FormHelperTextProps={{ 'data-cy': 'customer-city-error' } as any}
          autoComplete='address-level2'
        />
        <TextField
          fullWidth
          id='phoneNumber'
          type='number'
          name='phoneNumber'
          label='Telefonnummer'
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
          helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          inputProps={{ 'data-cy': 'customer-phone' }}
          FormHelperTextProps={{ 'data-cy': 'customer-phone-error' } as any}
          autoComplete='tel'
        />

        <Button
          variant='contained'
          fullWidth
          type='submit'
          color='primary'
          sx={{
            fontSize: '12px',
            border: '1px solid',
            padding: '0.5rem',
            backgroundColor: 'secondary.main',
            color: 'secondary.contrastText',
            '&:hover': {
              backgroundColor: 'primary.main',
            },
          }}
        >
          Beställ
        </Button>
      </Box>
    </Box>
  );
}
