import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';

import { Categories, MainCategories, Sizes, SubCategories } from '../constants';

export class ProductDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  price: number;

  @IsArray()
  colors: string[];

  @IsEnum(MainCategories)
  mainCategory: MainCategories;

  @IsEnum(Categories)
  category: Categories;

  @IsEnum(SubCategories)
  subCategory: SubCategories;

  @IsNumber()
  rating: number;

  @IsNumber()
  ratingCount: number;

  @IsString()
  seller: string;

  @IsEnum(Sizes)
  size: Sizes;

  @IsString()
  mark: string;
}
