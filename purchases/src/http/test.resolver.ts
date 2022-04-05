import { PrismaService } from '../database/prisma/prisma.service';
import { UseGuards } from '@nestjs/common';

import { AuthorizationGuard } from './auth/authorization.guard';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver('test')
export class TestResolver {
  constructor(private prisma: PrismaService) {}

  @Query(() => String)
  @UseGuards(AuthorizationGuard)
  hello() {
    return 'Hello World!';
  }
}
