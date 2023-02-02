import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { PrismaService } from 'src/prisma.service';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from 'src/user/guards/roles.guard';

@Module({
  controllers: [CommentsController],
  providers: [
    CommentsService,
    PrismaService,
    AuthGuard,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
  exports: [CommentsModule],
})
export class CommentsModule {}
