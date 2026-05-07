import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { Roles } from 'nest-keycloak-connect';

@Controller('course-modules')
export class ModulesController {
  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @Roles({ roles: ['realm:INSTRUCTOR', 'realm:ADMIN'] })
  async create(@Body() body: { title: string; courseId: string; order: number }) {
    return this.modulesService.createModule(body);
  }

  @Get('course/:id')
  @Roles({ roles: ['realm:STUDENT', 'realm:INSTRUCTOR', 'realm:ADMIN'] })
  async findByCourse(@Param('id') courseId: string) {
    return this.modulesService.getModulesByCourse(courseId);
  }
}