import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateAddressDto {
  @IsNotEmpty()
  readonly country: string;

  @IsNotEmpty()
  readonly region: string;

  @IsNotEmpty()
  readonly city: string;

  @IsNotEmpty()
  readonly street: string;

  @IsNotEmpty()
  readonly house: string;

  @IsOptional()
  readonly corp: string;

  @IsOptional()
  readonly apart: string;

  @IsNotEmpty()
  readonly phone: string;
}
