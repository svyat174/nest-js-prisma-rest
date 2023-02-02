import { IsOptional } from 'class-validator';

export class UpdateCommentsDto {
  @IsOptional()
  readonly text: string;
}
