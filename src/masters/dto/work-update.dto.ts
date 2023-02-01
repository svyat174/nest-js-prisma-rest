import { IsOptional } from 'class-validator';

export class UpdateWorkDto {
  @IsOptional()
  readonly title: string;

  @IsOptional()
  readonly image: string;

  @IsOptional()
  readonly description: string;

  @IsOptional()
  readonly authorId: number;
}
