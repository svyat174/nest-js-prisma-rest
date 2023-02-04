/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/product-create.dto';
import { UpdateProductDto } from './dto/product-update.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination.query.dto';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async createProduct(createProductDto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: createProductDto,
    });

    const slug = this.getSlug(product.title);

    return await this.prisma.product.update({
      where: { id: product.id },
      data: { slug: { set: slug } },
    });
  }

  private getSlug(title: string) {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }

  async updateProduct(
    updateProductDto: UpdateProductDto,
    productId: number,
  ) {
    try {
      return await this.prisma.product.update({
      where: {id: productId},
      data: updateProductDto,
    })
  } catch(e) {
    throw new HttpException('Product not found', HttpStatus.NOT_FOUND)
    }
  }

  async deleteProduct(productId: number) {
    const product = await this.prisma.product.findUnique({
      where: {id: productId}
    })

    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }

    return this.prisma.product.delete({
      where: { id: productId }
    })
  }

  async getAllProduct(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.prisma.product.findMany({
      orderBy: { price: 'asc'},
      take: limit,
      skip: offset >= 0 ? offset : 0
    })
  }

  async getProductByCategory(
    categoryId: number, 
    paginationQuery: PaginationQueryDto
  ) {
    const { limit, offset } = paginationQuery
    return this.prisma.product.findMany({
      where: { categoryId },
      orderBy: { price: 'desc' },
      take: limit,
      skip: offset >= 0 ? offset : 0
    })
  }

  async getProductById(
    productSlug: string, 
    paginationQuery: PaginationQueryDto
  ) {
    const { limit, offset } = paginationQuery
    return this.prisma.product.findMany({
      where: { slug: productSlug },
      orderBy: { price: 'desc' },
      take: limit,
      skip: offset >= 0 ? offset : 0,
    })
  }
}
