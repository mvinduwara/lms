import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import {
  KeycloakConnectModule,
  ResourceGuard,
  RoleGuard,
  AuthGuard,
  TokenValidation,
  PolicyEnforcementMode
} from 'nest-keycloak-connect';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { InstitutionsModule } from './institutions/institutions.module';
import { CoursesModule } from './courses/courses.module'; 
import { ModulesModule } from './modules/modules.module';

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    InstitutionsModule,
    ModulesModule,
    CoursesModule, 

    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'lms-realm',
      clientId: 'api-client',
      secret: 'OgInpQstBcjlB9SaUWen5YF9fOTmNsYT', 
      tokenValidation: TokenValidation.ONLINE,
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
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