import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { CreateProductDto } from './dto/product-create.dto';
import { UpdateProductDto } from './dto/product-update.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination.query.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('create')
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  createProduct(@Body() createProductDto: CreateProductDto) {
    return this.productService.createProduct(createProductDto);
  }

  @Put('update/:id')
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') productId: number,
  ) {
    return this.productService.updateProduct(updateProductDto, productId);
  }

  @Delete('delete/:id')
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  deleteProduct(@Param('id') productId: number) {
    return this.productService.deleteProduct(productId);
  }

  @Get()
  getAllProduct(@Query() paginationQuery: PaginationQueryDto) {
    return this.productService.getAllProduct(paginationQuery);
  }

  @Get('category/:id')
  getProductByCategory(
    @Param('id') categoryId: number,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.productService.getProductByCategory(
      categoryId,
      paginationQuery,
    );
  }

  @Get(':slug')
  getProductById(
    @Param('slug') productSlug: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    return this.productService.getProductById(productSlug, paginationQuery);
  }
}
