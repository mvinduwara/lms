import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

@Module({
  imports: [
    PrismaModule,
    UsersModule,
    InstitutionsModule,
    // Initialize Keycloak
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:8080',
      realm: 'lms-realm',
      clientId: 'api-client',
      secret: 'ileedUCIcdtx5t6g6Q929NfDaOMZ5Pdq', // Your active client secret
      
      // Force NestJS to verify the token directly with the Keycloak server
      tokenValidation: TokenValidation.ONLINE,
      // Prevent the ResourceGuard from strictly requiring mapped resources
      policyEnforcement: PolicyEnforcementMode.PERMISSIVE,
    }),
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // These guards will globally protect all endpoints by default
    {
      provide: APP_GUARD,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      useClass: AuthGuard,
    },
    {
      provide: APP_GUARD,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      useClass: ResourceGuard,
    },
    {
      provide: APP_GUARD,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      useClass: RoleGuard,
    },
  ],
})
export class AppModule {}