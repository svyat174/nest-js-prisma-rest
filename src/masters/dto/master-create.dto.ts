import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateMasterDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly bio: string;

  @IsOptional()
  readonly skills: number[];
}
