import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  async createCourse(data: { title: string; description: string; instructorId: string; institutionId: string }) {
    return this.prisma.course.create({
      data,
    });
  }

  async getCoursesByInstitution(institutionId: string) {
    return this.prisma.course.findMany({
      where: { institutionId },
      include: {
        instructor: true, 
      },
    });
  }
}