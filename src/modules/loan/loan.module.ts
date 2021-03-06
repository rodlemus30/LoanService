import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/repositories/user.repository';
import { UserModule } from '../user/user.module';
import { LoanController } from './controller/loan.controller';
import { LoanRepository } from './repositories/loan.repository';
import { LoanService } from './services/loan.service';

@Module({
  imports: [
    UserModule,
    UserRepository,
    TypeOrmModule.forFeature([LoanRepository]),
  ],
  exports: [LoanService],
  providers: [LoanService],
  controllers: [LoanController],
})
export class LoanModule {}
