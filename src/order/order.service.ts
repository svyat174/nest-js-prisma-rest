import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderItemDto } from './dto/create-orderItem.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrderService {
  constructor(private prisma: PrismaService) {}

  async createItemOrder(createOrderItemDto: CreateOrderItemDto) {
    return await this.prisma.orderItem.create({
      data: createOrderItemDto,
    });
  }

  async createOrder(createOrderDto: CreateOrderDto, userId: number) {
    return this.prisma.order.create({
      data: {
        ...createOrderDto,
        userId,
      },
    });
  }

  async getOrderItemsByUserId(userId: number) {
    const order = await this.prisma.order.findUnique({
      where: { id: userId },
    });

    const orderItems = await this.prisma.orderItem.findMany({
      where: { orderId: order.id },
    });

    return orderItems;
  }

  async getOrderByUserIdIsPaidFalse(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
        isPaid: false,
      },
      include: {
        items: { include: { product: true } },
        address: true,
      },
    });

    const result = orders.map((order) => {
      return {
        ...order,
        items: order.items.map((item) => {
          return {
            ...item,
            product: item.product.title,
          };
        }),
        address: order.address.id,
      };
    });

    return result;
  }

  async getOrderByUserIdIsPaidTrue(userId: number) {
    const orders = await this.prisma.order.findMany({
      where: {
        userId,
        isPaid: true,
      },
      include: {
        items: { include: { product: true } },
        address: true,
      },
    });

    const result = orders.map((order) => {
      return {
        ...order,
        items: order.items.map((item) => {
          return {
            ...item,
            product: item.product.title,
          };
        }),
        address: order.address.id,
      };
    });

    return result;
  }

  async deleteOrderItemsById(orderItemId: number) {
    return this.prisma.orderItem.delete({
      where: { id: orderItemId },
    });
  }

  async deleteOrderById(orderId: number) {
    return this.prisma.orderItem.delete({
      where: { id: orderId },
    });
  }
}
