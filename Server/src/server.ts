import mongoose from 'mongoose';
import { app } from './app';

const port = 3000;

async function main() {
  mongoose.set('strictQuery', false); // Detta var bara för att inte få varning i terminalen. Den varnar för en ny version av mongoose där denna används.?
  await mongoose.connect('mongodb://127.0.0.1:27017/Rhinogram');
  console.log('Connected to Database');

  app.listen(port, () => {
    console.log(`Server running on: http://localhost:${port}`);
  });
}

main().catch(console.error);
