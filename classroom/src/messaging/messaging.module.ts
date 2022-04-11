import { PurchaseController } from './controllers/purchases.controller';
import { Module } from '@nestjs/common';

@Module({
  controllers: [PurchaseController],
})
export class MessagingModule {}
