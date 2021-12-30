import { IsArray } from 'class-validator';

export class FilterDto {
  @IsArray()
  sizes?: string[];

  @IsArray()
  marks?: string[];

  @IsArray()
  colors?: string[];

  @IsArray()
  prices?: number[];
}
