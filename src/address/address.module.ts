import { Module } from '@nestjs/common';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/user/guards/roles.guard';

@Module({
  providers: [
    AddressService,
    PrismaService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  controllers: [AddressController],
  exports: [AddressService],
})
export class AddressModule {}
