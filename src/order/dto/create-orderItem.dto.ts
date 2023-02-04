import { IsNotEmpty } from 'class-validator';

export class CreateOrderItemDto {
  @IsNotEmpty()
  readonly productId: number;

  @IsNotEmpty()
  readonly orderId: number;

  @IsNotEmpty()
  readonly count: number;

  @IsNotEmpty()
  readonly amount: number;
}
