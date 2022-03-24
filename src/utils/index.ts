import mongoose from "mongoose";

export async function connectToMongoDB(url: string): Promise<void> {
  console.log('connecting to', url);

  await mongoose
    .connect(url)
    .then((_) => {
      console.log('connected to MongoDB');
    })
    .catch((error) => {
      console.log('error connecting to MongoDB:', error.message);
    });
}


