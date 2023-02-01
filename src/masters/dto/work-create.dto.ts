import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateWorkDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly authorId: number;

  @IsOptional()
  readonly description: string;

  @IsOptional()
  readonly image: string;
}
