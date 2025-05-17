import {
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  IsInt,
  IsArray,
  ArrayMinSize,
  ArrayMaxSize,
  IsOptional,
  Min,
  Max,
  IsDate,
} from "class-validator";
import { Transform } from "class-transformer";

export class CreateUpdateProductDto {
  @IsNotEmpty({ message: "The name is required" })
  @IsString({ message: "The name must be a string" })
  @MinLength(2, { message: "The name must be at least 2 characters long" })
  @MaxLength(100, { message: "The name must have a maximum of 100 characters" })
  name: string;

  @IsOptional()
  @IsString({ message: "The description must be a string" })
  @MinLength(2, { message: "The description must be at least 2 characters long" })
  @MaxLength(256, { message: "The description must have a maximum of 256 characters" })
  description?: string;

  @IsNotEmpty({ message: "The price is required" })
  @IsInt({ message: "The price must be an integer" })
  @Min(1, { message: "The price must be at least 1" })
  @Max(100000000, { message: "The price must be less than or equal to 100.000.000" })
  @Transform(({ value }) => Number(value))
  regularPrice: number;

  @Transform(({ value }) => {
    if (value === undefined || value === null || value === "") return undefined
    return Number(value)
  })
  @IsOptional()
  @IsInt({ message: "The promotional price must be an integer" })
  @Min(1, { message: "The promotional price must be at least 1" })
  @Max(100000000, { message: "The promotional price must be less than or equal to 100.000.000" })
  promotionalPrice?: number;

  @Transform(({ value }) => {
    if (value === undefined || value === null || value === "") return undefined
    return new Date(value)
  })
  @IsOptional()
  @IsDate({ message: "The promotionalExpiration must be a date" })
  promotionExpiration?: Date

  @Transform(({ value }) => {
    if (value === undefined || value === null || value === "") return undefined
    return new Date(value)
  })
  @IsOptional()
  @IsDate({ message: "The promotionalStart must be a date" })
  promotionStart?: Date

  @IsArray({ message: "The subcategorys must be an array" })
  @ArrayMinSize(1, { message: "The subcategorys array must have at least 1 element" })
  @ArrayMaxSize(5, { message: "The subcategorys array must have at most 5 elements" })
  subCategorys: string[];

  @IsArray({ message: "The categorys must be an array" })
  @ArrayMinSize(1, { message: "The categorys array must have at least 1 element" })
  @ArrayMaxSize(5, { message: "The categorys array must have at most 5 elements" })
  categorys: string[];

  @IsNotEmpty({ message: "The stock is required" })
  @IsInt({ message: "The stock must be an integer" })
  @Min(1, { message: "The stock must be at least 1" })
  @Max(10000000, { message: "The stock must be less than or equal to 100.000.000" })
  @Transform(({ value }) => Number(value))
  stock: number;
}
