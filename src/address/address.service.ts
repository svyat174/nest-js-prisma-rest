import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateAddressDto } from './dto/address-create.dto';

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}

  async createAddress(createAddressDto: CreateAddressDto, userId: number) {
    return this.prisma.address.create({
      data: {
        ...createAddressDto,
        user: {
          create: {
            user: { connect: { id: userId } },
          },
        },
      },
    });
  }

  async getAddress() {
    const address = await this.prisma.address.findMany({
      include: { user: { include: { user: true } } },
    });

    const result = address.map((address) => {
      return {
        ...address,
        user: address.user.map((user) => {
          return {
            name: user.user.name,
            nickname: user.user.nickname,
          };
        }),
      };
    });

    return result;
  }

  async deleteAddress(adressId: number) {
    try {
      return await this.prisma.address.delete({
        where: { id: adressId },
      });
    } catch (e) {
      throw new HttpException('Address not found', HttpStatus.NOT_FOUND);
    }
  }
}
