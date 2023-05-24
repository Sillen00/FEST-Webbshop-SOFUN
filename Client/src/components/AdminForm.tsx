import { Button, Card, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { Product } from '../data/index';

const AdminSchema = Yup.object().shape({
  title: Yup.string().required('Ange titel'),
  description: Yup.string().required('Ange beskrivning'),
  image: Yup.string().required('Ange bild').url('Bilden måste vara en giltig URL'),
  price: Yup.number()
    .typeError('Priset måste vara en siffra')
    .positive('Priset måste vara högre än 0 kr')
    .required('Ange pris'),
});

type AdminValues = Yup.InferType<typeof AdminSchema>;

export const defaultValues: AdminValues = {
  title: '',
  description: '',
  image: '',
  price: 0,
};

type AdminFormProps = {
  product?: Product;
  isNewProduct: boolean;
};

export default function AdminForm({ product, isNewProduct }: AdminFormProps) {
  const matches = useMediaQuery('(min-width:500px)');
  const buttonText = isNewProduct ? 'Lägg till produkt' : 'Ändra produkt';
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const initialValues: AdminValues = {
    title: product?.title || defaultValues.title,
    description: product?.description || defaultValues.description,
    image: product?.image || defaultValues.image,
    price: product?.price || defaultValues.price,
  };

  const formik = useFormik<AdminValues>({
    initialValues,
    validationSchema: AdminSchema,
    onSubmit: async values => {
      const product = {
        categoryIDs: [],
        title: values.title,
        description: values.description,
        imageID: 'hardcoded-image-id',
        price: values.price,
        stockLevel: 100,
        imageURL: 'placeholder',
        isArchived: false,
      };

      try {
        const response = await fetch('/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(product),
        });

        console.log('Response status:', response.status);

        if (response.ok) {
          const createdProduct = await response.json();
          console.log('Product created successfully:', createdProduct);
        } else {
          const message = await response.text();
          throw new Error(message);
        }
      } catch (error) {
        console.error('Error creating product:', error);
      }
    },
  });

  return (
    <>
      <Box
        component='form'
        sx={{
          '& > :not(style)': {
            m: 1,
            display: 'flex',
            flexDirection: 'column',
          },
        }}
        noValidate
        onSubmit={formik.handleSubmit}
        data-cy='product-form'
      >
        <TextField
          fullWidth
          id='title'
          type='title'
          name='title'
          label='Titel'
          value={formik.values.title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.title && Boolean(formik.errors.title)}
          helperText={formik.touched.title && formik.errors.title}
          inputProps={{ 'data-cy': 'product-title' }}
          FormHelperTextProps={{ 'data-cy': 'product-title-error' } as any}
        />
        <TextField
          fullWidth
          id='description'
          type='description'
          name='description'
          label='Beskrivning'
          value={formik.values.description}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
          inputProps={{ 'data-cy': 'product-description' }}
          FormHelperTextProps={{ 'data-cy': 'product-description-error' } as any}
        />

        <TextField
          fullWidth
          id='image'
          type='text'
          name='image'
          label='Bild-URL'
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
          inputProps={{ 'data-cy': 'product-image' }}
          FormHelperTextProps={{ 'data-cy': 'product-image-error' } as any}
        />
        <TextField
          fullWidth
          id='price'
          type='number'
          name='price'
          label='Pris'
          value={formik.values.price}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
          inputProps={{ 'data-cy': 'product-price' }}
          FormHelperTextProps={{ 'data-cy': 'product-price-error' } as any}
        />
        <Button
          variant='contained'
          color='primary'
          fullWidth
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
          {buttonText}
        </Button>
      </Box>
      {!isSmallScreen && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            '& a': {
              color: 'black',
              textDecoration: 'none',
            },
          }}
        >
          <Card
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginLeft: '1.5rem',
              padding: '2rem',
              maxHeight: matches ? '29.6rem' : 'none',
              justifyContent: 'center',
              height: '100%',
              width: matches ? '22rem' : '100%',
            }}
          >
            <Link to={'/product/'}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '5rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '250px',
                    height: '150px',
                    overflow: 'hidden',
                  }}
                >
                  <img src={formik.values.image} alt={formik.values.title} width='100%' />
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'start',
                  marginTop: '2rem',
                }}
              >
                <Box sx={{ paddingTop: '0.2rem' }}>
                  <Typography variant='subtitle2'>2024</Typography>
                </Box>
                <Box>
                  <Typography variant='h5'>{formik.values.title}</Typography>
                </Box>
                <Box
                  sx={{
                    marginBottom: '0.5rem',
                  }}
                >
                  <Typography variant='subtitle2'>Pris {formik.values.price} kr</Typography>
                </Box>
                <Box
                  sx={{
                    maxWidth: '30rem',
                    height: '12rem',
                  }}
                >
                  <Typography variant='body1'>{formik.values.description}</Typography>
                </Box>
              </Box>
            </Link>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                padding: '0.5rem',
              }}
            >
              {/* <Button
                variant='contained'
                color='secondary'
                sx={{
                  backgroundColor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText,
                  '&:hover': {
                    backgroundColor: theme.palette.secondary.light,
                  },
                }}
              >
                Lägg till i kundvagnen
              </Button> */}
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
}
