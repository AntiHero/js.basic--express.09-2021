import app from './app';
import mongoose from 'mongoose';
import 'dotenv/config';

const PORT = process.env.PORT || 3000;

const url = process.env.MONGODB_URI as string;

app.listen(PORT, () => {
  console.log('connecting to', url);

  mongoose
    .connect(url)
    .then((_) => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
  console.log('Server is running at http://localhost:%s', PORT);
});
