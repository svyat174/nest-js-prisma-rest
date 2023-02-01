import { IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMasterDto {
  @IsOptional()
  readonly bio: string;

  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly image: string;
}
