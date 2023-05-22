

import argon2 from 'argon2';
import { InferSchemaType, model, Schema } from 'mongoose';

const userSchema = new Schema(
  {
    username: {
      type: String,
      require: true,
      min: 3,
      max: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 4,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  this.password = await argon2.hash(this.password, {
    timeCost: 2, // FÖR ATT SNABBA PÅ HASHNINGEN FÖR TESTERNA
    memoryCost: 1024, // FÖR ATT SNABBA PÅ HASHNINGEN FÖR TESTERNA
  });
  next();
});

export type User = InferSchemaType<typeof userSchema>;

export const UserModel = model('User', userSchema);