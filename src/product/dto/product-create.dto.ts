import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly categoryId: number;

  @IsNotEmpty()
  readonly article: string;

  @IsNotEmpty()
  readonly price: number;

  @IsNotEmpty()
  readonly image: string;

  @IsNotEmpty()
  readonly description: string;

  @IsOptional()
  readonly sale: string;
}
