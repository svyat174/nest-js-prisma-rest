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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
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
  @UseGuards(AuthGuard)
  findAll(@User('nickname') currentUserId: string) {
    return this.userService.findAll(currentUserId);
  }

  @Get(':id')
  @UsePipes(new ValidationPipe())
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }

  @Put()
  @UseGuards(AuthGuard)
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
