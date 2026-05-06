import { Controller, Get, Post, Body } from '@nestjs/common';
import { InstitutionsService } from './institutions.service';

@Controller('institutions')
export class InstitutionsController {
  constructor(private readonly institutionsService: InstitutionsService) {}

  @Post()
  async create(@Body() body: { name: string }) {
    return this.institutionsService.createInstitution(body);
  }

  @Get()
  async findAll() {
    return this.institutionsService.getAllInstitutions();
  }
}
