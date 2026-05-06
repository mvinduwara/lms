import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InstitutionsService {
  constructor(private readonly prisma: PrismaService) {}

  async createInstitution(data: { name: string }) {
    return this.prisma.institution.create({
      data,
    });
  }

  async getAllInstitutions() {
    return this.prisma.institution.findMany({
      include: {
        users: true, // Includes the related users in the response
      },
    });
  }
}
