import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'db';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // Correctly pass the URL inside the datasources object
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL || "postgresql://root:password123@localhost:5432/lms_db?schema=public",
        },
      },
    });
  }

  async onModuleInit() {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    await this.$connect();
  }
}