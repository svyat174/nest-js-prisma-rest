import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  readonly image: string;

  @IsNotEmpty()
  readonly bio: string;
}
