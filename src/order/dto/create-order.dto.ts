import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  readonly totalAmount: number;

  @IsNotEmpty()
  readonly isPaid: boolean;

  @IsNotEmpty()
  readonly addressId: number;
}
