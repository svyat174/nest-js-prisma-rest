import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from './guards/auth.guard';

@Module({
  controllers: [UserController],
  providers: [UserService, AuthGuard, PrismaService],
  exports: [UserService],
})
export class UserModule {}
