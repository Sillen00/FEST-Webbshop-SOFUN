import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { app } from './app';
dotenv.config();
// import MONGO_PASSWORD from '/.env';

const URL = process.env.MONGO_URL;

const port = 3000;

async function main() {
  mongoose.set('strictQuery', false); // Detta var bara för att inte få varning i terminalen. Den varnar för en ny version av mongoose där denna används.?
  await mongoose.connect(URL!);
  console.log('Connected to Database');

  app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
  });
}

main().catch(console.error);
