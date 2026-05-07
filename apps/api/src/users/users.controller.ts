import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { Roles } from 'nest-keycloak-connect';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles({ roles: ['ADMIN'] })
  async create(@Body() body: { email: string; role: any; institutionId: string }) {
    return this.usersService.createUser(body);
  }

  @Get()
  @Roles({ roles: ['ADMIN'] })
  async findAll() {
    return this.usersService.getAllUsers();
  }
}