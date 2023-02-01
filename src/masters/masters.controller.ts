import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { MastersService } from './masters.service';
import { CreateMasterDto } from './dto/master-create.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { CreateSkillsDto } from './dto/sklll-create.dto';
import { CreateWorkDto } from './dto/work-create.dto';

@Controller('masters')
export class MastersController {
  constructor(private readonly masterService: MastersService) {}

  @Post('create')
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  create(@Body() createMasterDto: CreateMasterDto) {
    return this.masterService.create(createMasterDto);
  }

  @Post('create_skill')
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  createSkills(@Body() createSkillsDto: CreateSkillsDto) {
    return this.masterService.createSkills(createSkillsDto);
  }

  @Post('create_work')
  @Roles(Role.Admin)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  createWorks(@Body() createWorkDto: CreateWorkDto) {
    return this.masterService.createWorks(createWorkDto);
  }

  @Get('skills')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  getskills() {
    return this.masterService.getSkills();
  }

  @Get()
  getMasters() {
    return this.masterService.getMasters();
  }
}
