import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateProductDto {
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

  @IsOptional()
  readonly remains: boolean;
}
