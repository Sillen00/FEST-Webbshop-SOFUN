import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import { ZodError } from 'zod';

export const app = express();
// app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));
app.use(express.json());

// COOKIE SESSION --------------------------------------------------------------------------------------------------------------------
// app.use(
//   cookieSession({
//     name: 'login',
//     secure: false,
//     httpOnly: true,
//     secret: 'ashdjasdk12351j',
//     maxAge: 1000 * 60 * 20,
//   })
// );

// ROUTES ----------------------------------------------------------------------------------------------------------------------------

// app.use('/api/users', userRouter);
// app.use('/api/products', productRouter);
// app.use('/api/orders', orderRouter);

// ERROR HANDLING --------------------------------------------------------------------------------------------------------------------
app.use((req, res, next) => {
  res.status(401).json('The resource you are looking for does not exist');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  if (err instanceof ZodError) {
    res.status(400).json(err.message);
  } else if (err instanceof Error) {
    res.status(500).json(err.message);
  } else {
    res.status(500).json('Unknown server error');
  }
});
