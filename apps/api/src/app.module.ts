import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
} from 'nest-keycloak-connect';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { InstitutionsModule } from './institutions/institutions.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    InstitutionsModule,
    // Initialize Keycloak
    KeycloakConnectModule.register({
      authServerUrl:
        process.env.KEYCLOAK_AUTH_SERVER_URL || 'http://localhost:8080',
      realm: process.env.KEYCLOAK_REALM || 'lms-realm',
      clientId: process.env.KEYCLOAK_CLIENT_ID || 'api-client',
      secret: process.env.KEYCLOAK_SECRET || 'secret-placeholder',
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}
