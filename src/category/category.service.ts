import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoriesDto } from './dto/category-create.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async createCategory(createCategoriesDto: CreateCategoriesDto) {
    return await this.prisma.category.create({
      data: createCategoriesDto,
    });
  }

  async updateCategoryById(
    updateCategoriesDto: CreateCategoriesDto,
    categoryId: number,
  ) {
    return await this.prisma.category.update({
      where: { id: categoryId },
      data: updateCategoriesDto,
    });
  }

  async getAllCategories() {
    return this.prisma.category.findMany();
  }

  async deleteCategoryById(categoryId: number) {
    return await this.prisma.category.delete({
      where: { id: categoryId },
    });
  }
}
