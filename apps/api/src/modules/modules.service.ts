import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ModulesService {
  constructor(private readonly prisma: PrismaService) {}

  async createModule(data: { title: string; courseId: string; order: number }) {
    return this.prisma.module.create({
      data,
    });
  }

  async getModulesByCourse(courseId: string) {
    return this.prisma.module.findMany({
      where: { courseId },
      orderBy: { order: 'asc' },
    });
  }
}