import mongoose from "mongoose";

export let fileBucket:mongoose.mongo.GridFSBucket;

// Skapa bucketen först efter att mongoose har kopplat upp sig mot databasen.
mongoose.connection.on("open", () => {
    fileBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
        bucketName: "files",
    });
});

// This will not work because the connection to database is not open yet.
//fileBucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
//   bucketName: "files",
// });