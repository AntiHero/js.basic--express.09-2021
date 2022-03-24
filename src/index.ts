import app from './app';
import mongoose from 'mongoose';
import 'dotenv/config';
import { connectToMongoDB } from './utils';

const PORT = process.env.PORT || 3000;

const url = process.env.MONGODB_URI as string;

app.listen(PORT, async () => {
  connectToMongoDB(url);
  console.log('Server is running at http://localhost:%s', PORT);
});
