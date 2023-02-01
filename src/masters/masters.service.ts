import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMasterDto } from './dto/master-create.dto';
import { CreateSkillsDto } from './dto/sklll-create.dto';
import { CreateWorkDto } from './dto/work-create.dto';
import { UpdateMasterDto } from './dto/master-update.dto';
import { UpdateWorkDto } from './dto/work-update.dto';

@Injectable()
export class MastersService {
  constructor(private prisma: PrismaService) {}

  async create(createMasterDto: CreateMasterDto) {
    const skills = await this.getSkills();

    const arrSkills = [];

    for (const skill of createMasterDto.skills) {
      arrSkills.push({
        skills: {
          connect: {
            id: skills[skill - 1].id,
          },
        },
      });
    }

    return await this.prisma.masters.create({
      data: {
        name: createMasterDto.name,
        bio: createMasterDto.bio,
        skills: {
          create: arrSkills,
        },
      },
    });
  }

  // don't forget to fix update by skills!!!
  async updateMaster(masterId: number, updateMasterDto: UpdateMasterDto) {
    return await this.prisma.masters.update({
      where: { id: masterId },
      data: {
        name: updateMasterDto.name,
        bio: updateMasterDto.bio,
        image: updateMasterDto.image,
      },
    });
  }

  async updateWork(workId: number, updateWorkDto: UpdateWorkDto) {
    return this.prisma.works.update({
      where: { id: workId },
      data: updateWorkDto,
    });
  }

  async getSkills() {
    return await this.prisma.skills.findMany();
  }

  async getMasters() {
    const masters = await this.prisma.masters.findMany({
      include: { skills: { include: { skills: true } } },
    });

    const result = masters.map((master) => {
      return { ...master, skills: master.skills.map((skill) => skill.skills) };
    });

    return result;
  }

  async getBySkill(id: number) {
    const skill = await this.prisma.skills.findUnique({
      where: { id },
      include: { master: { include: { master: true } } },
    });

    const result = {
      ...skill,
      master: skill.master.map((x) => x.master),
    };

    return result;
  }

  async getByMaster(authorId: number) {
    const works = await this.prisma.works.findMany({
      where: { authorId },
    });

    if (!works[0]) {
      throw new HttpException('Works not found', HttpStatus.NOT_FOUND);
    }

    return works;
  }

  async getWork() {
    return this.prisma.works.findMany();
  }

  async createSkills(createSkillsDto: CreateSkillsDto) {
    return await this.prisma.skills.create({
      data: createSkillsDto,
    });
  }

  async createWorks(createWorkDto: CreateWorkDto) {
    return await this.prisma.works.create({
      data: createWorkDto,
    });
  }

  async deleteWork(workId: number) {
    try {
      return await this.prisma.works.delete({
        where: { id: workId },
      });
    } catch (e) {
      throw new HttpException('Work not found', HttpStatus.NOT_FOUND);
    }
  }
}
