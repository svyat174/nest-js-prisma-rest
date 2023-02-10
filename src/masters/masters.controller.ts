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
import { MastersService } from './masters.service';
import { CreateMasterDto } from './dto/master-create.dto';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { RolesGuard } from 'src/user/guards/roles.guard';
import { Roles } from 'src/user/decorator/roles.decorator';
import { Role } from '@prisma/client';
import { CreateSkillsDto } from './dto/sklll-create.dto';
import { CreateWorkDto } from './dto/work-create.dto';
import { UpdateMasterDto } from './dto/master-update.dto';
import { UpdateWorkDto } from './dto/work-update.dto';
import { User } from 'src/user/decorator/user.decorator';

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

  @Get('by_skill/:id')
  getBySkill(@Param('id') id: number) {
    return this.masterService.getBySkill(id);
  }

  @Get('by_master/:id')
  getByMaster(@Param('id') id: number) {
    return this.masterService.getByMaster(id);
  }

  @Get('works')
  getWorks() {
    return this.masterService.getWork();
  }

  @Put('update/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateMaster(
    @Param('id') masterId: number,
    @Body() updateMasterDto: UpdateMasterDto,
  ) {
    return this.masterService.updateMaster(masterId, updateMasterDto);
  }

  @Put('update_work/:id')
  @UsePipes(new ValidationPipe())
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  updateWork(
    @Param('id') workId: number,
    @Body() updateWorkDto: UpdateWorkDto,
  ) {
    return this.masterService.updateWork(workId, updateWorkDto);
  }

  @Delete('delete_work/:id')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  deleteWork(@Param('id') workId: number) {
    return this.masterService.deleteWork(workId);
  }

  @Get('works/:slug')
  getWorksBySlug(@Param('slug') slug: string) {
    return this.masterService.getWorksBySlug(slug);
  }

  @Post('work/:slug/favorite')
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  addWorkToFavourite(
    @User('id') userId: number,
    @Param('slug') workSlug: string,
  ) {
    return this.masterService.addWorkToFavourite(userId, workSlug);
  }

  @Delete('work/:slug/favorite')
  @Roles(Role.User)
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard, RolesGuard)
  deleteWorkFromFavourite(
    @User('id') userId: number,
    @Param('slug') workSlug: string,
  ) {
    return this.masterService.deleteWorkFromFavourite(userId, workSlug);
  }
}
