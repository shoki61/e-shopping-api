import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Categories, MainCategories, Sizes, SubCategories } from '../constants';

export type ProductDocument = Product & Document;

@Schema({ collection: 'products', timestamps: true })
export class Product {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ required: true, type: Number })
  price: number;

  @Prop({ type: Array })
  colors: string[];

  @Prop({ enum: MainCategories })
  mainCategory: MainCategories;

  @Prop({ required: true, enum: Categories })
  category: Categories;

  @Prop({ required: true, enum: SubCategories })
  subCategory: SubCategories;

  @Prop({ type: Number })
  rating: number;

  @Prop({ type: Number })
  ratingCount: number;

  @Prop({ required: true, type: String })
  seller: string;

  @Prop({ required: true, enum: Sizes })
  size: Sizes;

  @Prop({ required: true, type: String })
  mark: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
