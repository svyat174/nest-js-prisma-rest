import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateCategoriesDto } from './dto/category-create.dto';
import { CategoryService } from './category.service';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  createCategory(@Body() createCategoriesDto: CreateCategoriesDto) {
    return this.categoryService.createCategory(createCategoriesDto);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getAllCategories() {
    return this.categoryService.getAllCategories();
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateCategoryById(
    @Body() updateCategoriesDto: CreateCategoriesDto,
    @Param('id') categoryId: number,
  ) {
    return this.categoryService.updateCategoryById(
      updateCategoriesDto,
      categoryId,
    );
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe())
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteCategoryById(@Param('id') categoryId: number) {
    return this.categoryService.deleteCategoryById(categoryId);
  }
}
