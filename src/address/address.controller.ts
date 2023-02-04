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
import { Role } from '@prisma/client';
import { Roles } from 'src/user/decorator/roles.decorator';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/address-create.dto';
import { User } from 'src/user/decorator/user.decorator';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  createAddress(
    @Body() createAddressDto: CreateAddressDto,
    @User('id') userId: number,
  ) {
    return this.addressService.createAddress(createAddressDto, userId);
  }

  @Get()
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  getAddress() {
    return this.addressService.getAddress();
  }

  @Delete(':id')
  @Roles(Role.User)
  @UseGuards(AuthGuard, RolesGuard)
  deleteAddress(@Param('id') adressId: number) {
    return this.addressService.deleteAddress(adressId);
  }
}
