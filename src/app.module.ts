import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthMiddleware } from './user/middleware/auth.middleware';
import { MastersModule } from './masters/masters.module';
import { CommentsModule } from './comments/comments.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { EducationModule } from './education/education.module';

@Module({
  imports: [
    UserModule,
    MastersModule,
    CommentsModule,
    CategoryModule,
    ProductModule,
    AddressModule,
    OrderModule,
    EducationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
