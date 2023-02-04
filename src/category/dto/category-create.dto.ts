import { IsNotEmpty } from 'class-validator';

export class CreateCategoriesDto {
  @IsNotEmpty()
  readonly categoryName: string;
}
