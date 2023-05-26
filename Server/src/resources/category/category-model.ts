import { InferSchemaType, model, Schema } from "mongoose";


const categorySchema = new Schema({
 name: { type: String, required: true },
});


export type Category = InferSchemaType<typeof categorySchema>;


export const CategoryModel = model("Category", categorySchema);