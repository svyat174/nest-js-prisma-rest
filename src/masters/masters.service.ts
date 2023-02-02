import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateMasterDto } from './dto/master-create.dto';
import { CreateSkillsDto } from './dto/sklll-create.dto';
import { CreateWorkDto } from './dto/work-create.dto';
import { UpdateMasterDto } from './dto/master-update.dto';
import { UpdateWorkDto } from './dto/work-update.dto';
import slugify from 'slugify';

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

  async createSkills(createSkillsDto: CreateSkillsDto) {
    return await this.prisma.skills.create({
      data: createSkillsDto,
    });
  }

  async createWorks(createWorkDto: CreateWorkDto) {
    const work = await this.prisma.works.create({
      data: createWorkDto,
    });

    const slug = this.getSlug(work.title);

    return this.prisma.works.update({
      where: { id: work.id },
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

  // don't forget to fix update by skills!!!
  async updateMaster(masterId: number, updateMasterDto: UpdateMasterDto) {
    try {
      return await this.prisma.masters.update({
        where: { id: masterId },
        data: {
          name: updateMasterDto.name,
          bio: updateMasterDto.bio,
          image: updateMasterDto.image,
        },
      });
    } catch (e) {
      throw new HttpException('Master not found', HttpStatus.NOT_FOUND);
    }
  }

  async updateWork(workId: number, updateWorkDto: UpdateWorkDto) {
    try {
      return await this.prisma.works.update({
        where: { id: workId },
        data: updateWorkDto,
      });
    } catch (e) {
      throw new HttpException('Work not found', HttpStatus.NOT_FOUND);
    }
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

  async getWorksBySlug(slug: string) {
    const works = await this.prisma.works.findMany({
      where: { slug },
    });

    if (!works[0]) {
      throw new HttpException('Works not found', HttpStatus.NOT_FOUND);
    }

    return works;
  }

  async getWork() {
    return this.prisma.works.findMany();
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
