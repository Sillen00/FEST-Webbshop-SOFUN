import busboy from 'busboy';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import sharp from 'sharp';
import { fileBucket } from './image-model';

//
// GET IMAGE BY ID -------------------------------------------------------------------------------
//
export async function getImageById(req: Request, res: Response) {
  const _id = new mongoose.mongo.ObjectId(req.params.id);

  const file = await fileBucket.find({ _id }).next();
  if (!file?.contentType) {
    res.status(404).json({ error: 'File not found' });
    return;
  }

  res.setHeader('Content-Type', file.contentType);

  const downloadStream = fileBucket.openDownloadStream(_id);
  downloadStream.pipe(res);
}

//
// UPLOAD IMAGE -------------------------------------------------------------------------------
//
export async function uploadImage(req: Request, res: Response) {
  const bb = busboy({ headers: req.headers });
  req.pipe(bb);

  bb.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;

    const uploadStream = fileBucket
      .openUploadStream(filename, { contentType: mimeType })
      .on('finish', (data: mongoose.mongo.GridFSFile) => {
        res.status(201).json(data._id);
      });

    const resizer = sharp().resize(640).jpeg({ quality: 90 });

    file.pipe(resizer).pipe(uploadStream);
  });
}

//
// DELETE IMAGE -------------------------------------------------------------------------------
//
export async function deleteImageById(req: Request, res: Response) {
  const _id = new mongoose.mongo.ObjectId(req.params.id);

  const file = await fileBucket.find({ _id }).next();
  if (!file?.contentType) {
    res.status(404).json({ error: 'File not found' });
    return;
  }

  await fileBucket.delete(_id);
  res.status(204).json();
}
