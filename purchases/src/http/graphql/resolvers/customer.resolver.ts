import { PurchasesService } from './../../../services/purchase.service';

import { AuthUser } from './../../auth/current-user';
import { CurrentUser } from 'src/http/auth/current-user';
import { CustomersService } from './../../../services/customers.service';
import { Customer } from './../models/customer';

import { UseGuards } from '@nestjs/common';

import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/auth/authorization.guard';

@Resolver(() => Customer)
export class CustomersResolver {
  constructor(
    private customersService: CustomersService,
    private purchasesService: PurchasesService,
  ) {}
  @UseGuards(AuthorizationGuard)
  @Query(() => Customer)
  me(@CurrentUser() user: AuthUser) {
    return this.customersService.getCustomerByIdAuthUserId(user.sub);
  }
  @ResolveField()
  purchases(@Parent() customer: Customer) {
    return this.purchasesService.listAllFromCustomer(customer.id);
  }
}
