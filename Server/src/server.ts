import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';
dotenv.config();

const URL = process.env.MONGO_URL;

const port = 3000;

async function main() {
  mongoose.set('strictQuery', false);
  await mongoose.connect(URL!);
  console.log('Connected to Database');

  app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
  });
}

main().catch(console.error);
