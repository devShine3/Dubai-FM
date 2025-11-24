import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InvoiceService } from './invoice.service';
import { Customer, Property, Quote, Contract } from './entities/crm.entity';
import { Technician, JobCard, InventoryItem, JobMaterial } from './entities/ops.entity';
import { Invoice, Payment } from './entities/accounting.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5433,
      username: 'admin',
      password: 'secret',
      database: 'dubai_fm_erp',
      entities: [
        Customer, Property, Quote, Contract,
        Technician, JobCard, InventoryItem, JobMaterial,
        Invoice, Payment
      ],
      synchronize: true, // Auto-create tables (Dev only)
    }),
    TypeOrmModule.forFeature([Customer, JobCard, Invoice]),
  ],
  controllers: [AppController],
  providers: [AppService, InvoiceService],
})
export class AppModule { }
