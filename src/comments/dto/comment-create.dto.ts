import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCommentsDto {
  @IsOptional()
  readonly text: string;

  @IsNotEmpty()
  readonly workSlug: string;
}
