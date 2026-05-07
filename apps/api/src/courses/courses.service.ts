import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CoursesService {
  constructor(private readonly prisma: PrismaService) {}

  // Create a course (Requires an Instructor ID and Institution ID)
  async createCourse(data: { title: string; description: string; instructorId: string; institutionId: string }) {
    return this.prisma.course.create({
      data,
    });
  }

  // Get all courses for a specific institution
  async getCoursesByInstitution(institutionId: string) {
    return this.prisma.course.findMany({
      where: { institutionId },
      include: {
        instructor: true, // Pulls the instructor's profile details
      },
    });
  }
}