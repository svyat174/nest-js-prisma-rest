import { IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  readonly image: string;

  @IsOptional()
  readonly bio: string;
}
