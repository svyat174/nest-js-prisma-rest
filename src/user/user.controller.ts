import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthGuard } from './guards/auth.guard';
import { User } from './decorator/user.decorator';
import { Roles } from './decorator/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from './guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body('user') createUserDto: CreateUserDto) {
    const user = await this.userService.create(createUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body() loginUserDto: LoginUserDto) {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Get()
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Put()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async update(
    @User('id') currentUserId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const user = await this.userService.update(currentUserId, updateUserDto);
    return this.userService.buildUserResponse(user);
  }

  @Delete()
  @UseGuards(AuthGuard)
  remove(@User('id') currentUserId: number) {
    return this.userService.remove(currentUserId);
  }
}
