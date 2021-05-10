import { Document } from "mongoose";

export interface BaseDocumentJSON {
  createdAt: Date;
  updatedAt: Date;
  __v?: number;
  _id: string;
}

export interface BaseDocument extends Document {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
}

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;