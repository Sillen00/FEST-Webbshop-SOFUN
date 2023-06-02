import mongoose from 'mongoose';

export let fileBucket: mongoose.mongo.GridFSBucket;

mongoose.connection.on('open', () => {
  fileBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
    bucketName: 'files',
  });
});
