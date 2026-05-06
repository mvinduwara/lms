import { defineConfig } from '@prisma/config';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Explicitly point to the .env file in this package
dotenv.config({ path: join(__dirname, '.env') });

export default defineConfig({
  migrate: {
    url: process.env.DATABASE_URL,
  },
});