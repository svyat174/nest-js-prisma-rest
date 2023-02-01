import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { compare, hash } from 'bcrypt';
import { User } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { JWT_SECRET } from './user.config/user.config';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseInterface } from './types/buildResponse.types';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashPassword = await hash(createUserDto.password, 10);
    createUserDto.password = hashPassword;

    return await this.prisma.user.create({ data: createUserDto });
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    delete user.password;
    return user;
  }

  buildUserResponse(user: User): UserResponseInterface {
    return {
      users: {
        ...user,
        token: this.generateJWT(user),
      },
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new HttpException(
        'Credential are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const isPasswordCorrect = await compare(
      loginUserDto.password,
      user.password,
    );

    if (!isPasswordCorrect) {
      throw new HttpException(
        'Credential are not valid',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    delete user.password;
    return user;
  }

  private generateJWT(user: User): string {
    return sign(
      {
        id: user.id,
        username: user.nickname,
        password: user.password,
      },
      JWT_SECRET,
    );
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: number) {
    try {
      return await this.prisma.user.delete({
        where: { id },
      });
    } catch (e) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
  }
}
