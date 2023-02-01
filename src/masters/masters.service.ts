import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMasterDto } from './dto/master-create.dto';
import { CreateSkillsDto } from './dto/sklll-create.dto';
import { CreateWorkDto } from './dto/work-create.dto';

@Injectable()
export class MastersService {
  constructor(private prisma: PrismaService) {}

  async create(createMasterDto: CreateMasterDto) {
    const skills = await this.getSkills();

    const arr = [];

    for (const skill of createMasterDto.skills) {
      const obj = {
        skills: {
          connect: {
            id: skills[skill - 1].id,
          },
        },
      };
      arr.push(obj);
    }

    return await this.prisma.masters.create({
      data: {
        name: createMasterDto.name,
        bio: createMasterDto.bio,
        skills: {
          create: arr,
        },
      },
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
}
