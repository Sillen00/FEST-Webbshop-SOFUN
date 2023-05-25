import { Button, Card, Typography, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useImage } from '../contexts/ImageContext';
import { Product } from '../contexts/ProductContext';

const AdminSchema = Yup.object().shape({
  title: Yup.string().required('Ange titel'),
  description: Yup.string().required('Ange beskrivning'),
  imageID: Yup.string().required('Ange bild'),
  price: Yup.number()
    .typeError('Priset måste vara en siffra')
    .positive('Priset måste vara högre än 0 kr')
    .required('Ange pris'),
});

type AdminValues = Yup.InferType<typeof AdminSchema>;

export const defaultValues: AdminValues = {
  title: '',
  description: '',
  imageID: '',
  price: 0,
};

type AdminFormProps = {
  product?: Product;
  isNewProduct: boolean;
  onSubmit: (newProduct: Product) => void;
};

export default function AdminForm({ product, isNewProduct, onSubmit }: AdminFormProps) {
  const matches = useMediaQuery('(min-width:500px)');
  const navigate = useNavigate();
  const buttonText = isNewProduct ? 'Lägg till produkt' : 'Ändra produkt';
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const { uploadImage } = useImage();

  const initialValues: AdminValues = {
    title: product?.title || defaultValues.title,
    description: product?.description || defaultValues.description,
    imageID: product?.imageID || defaultValues.imageID,
    price: product?.price || defaultValues.price,
  };

  const formik = useFormik<AdminValues>({
    initialValues,
    validationSchema: AdminSchema,
    onSubmit: async values => {
      const newProduct: Product = {
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
        await onSubmit(newProduct); // Wait for the onSubmit function to complete
        navigate('/admin'); // Navigate to the desired route
      } catch (error) {
        console.error('Error creating product:', error);
      }
    },
  });
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const imageID = await uploadImage(file);
      formik.setFieldValue('imageID', imageID);
    } catch (error) {
      console.error('Error uploading image:', error);
      formik.setFieldError('imageID', 'Kunde inte ladda upp bilden');
    }
  };

  return (
    <>
      <Box
        component='form'
        sx={{
          '& > :not(style)': {
            m: 1,
            width: '25ch',
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
          type='file'
          name='image'
          label='Bild-URL'
          // value={formik.values.image}
          onChange={handleFileUpload}
          // onBlur={formik.handleBlur}
          error={formik.touched.imageID && Boolean(formik.errors.imageID)}
          helperText={formik.touched.imageID && formik.errors.imageID}
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
        <Button color='secondary' variant='contained' fullWidth type='submit'>
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
            backgroundColor: 'background.default',
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
              margin: '1rem',
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
                  <img src={formik.values.imageID} alt={formik.values.title} width='100%' />
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
              <Button
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
              </Button>
            </Box>
          </Card>
        </Box>
      )}
    </>
  );
}
