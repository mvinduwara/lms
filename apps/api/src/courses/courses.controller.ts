import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Roles } from 'nest-keycloak-connect';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  // Only Instructors and Admins can create new courses
  @Post()
  @Roles({ roles: ['realm:INSTRUCTOR', 'realm:ADMIN'] })
  async create(@Body() body: { title: string; description: string; instructorId: string; institutionId: string }) {
    return this.coursesService.createCourse(body);
  }

  // Students, Instructors, and Admins can all view courses
  @Get('institution/:id')
  @Roles({ roles: ['realm:STUDENT', 'realm:INSTRUCTOR', 'realm:ADMIN'] })
  async findByInstitution(@Param('id') institutionId: string) {
    return this.coursesService.getCoursesByInstitution(institutionId);
  }
}