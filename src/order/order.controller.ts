import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { CreateOrderItemDto } from './dto/create-orderItem.dto';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/user/decorator/user.decorator';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('create/item')
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  createOrderItems(@Body() createOrderItemDto: CreateOrderItemDto) {
    return this.orderService.createItemOrder(createOrderItemDto);
  }

  @Post('create')
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  createOrder(
    @Body() createOrderDto: CreateOrderDto,
    @User('id') userId: number,
  ) {
    return this.orderService.createOrder(createOrderDto, userId);
  }

  @Get('order-items')
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  getOrderItemsByOrderId(@User('id') userId: number) {
    return this.orderService.getOrderItemsByUserId(userId);
  }

  @Get('unpaid')
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  getOrderByUserIdIsPaidFalse(@User('id') userId: number) {
    return this.orderService.getOrderByUserIdIsPaidFalse(userId);
  }

  @Get('paid')
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  getOrderByUserIdIsPaidTrue(@User('id') userId: number) {
    return this.orderService.getOrderByUserIdIsPaidTrue(userId);
  }

  @Delete('order-items/:id')
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  deleteOrderItemsById(@Param('id') orderItemId: number) {
    return this.orderService.deleteOrderItemsById(orderItemId);
  }

  @Delete('order/:id')
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  deleteOrderById(@Param('id') orderId: number) {
    return this.orderService.deleteOrderById(orderId);
  }
}
