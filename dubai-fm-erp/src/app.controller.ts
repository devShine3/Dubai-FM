import { Controller, Get, Patch, Post, Delete, Param, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/crm.entity';
import { JobCard } from './entities/ops.entity';
import { InvoiceService } from './invoice.service';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
    @InjectRepository(JobCard) private jobRepo: Repository<JobCard>,
    private invoiceService: InvoiceService,
  ) { }

  @Get()
  getHello(): string {
    return '<h1>Dubai FM ERP is Running! 🚀</h1><p>Go to <a href="/jobs">/jobs</a> to see active jobs.</p>';
  }

  @Get('customers')
  getCustomers() {
    return this.customerRepo.find({ relations: ['properties'] });
  }

  @Get('jobs')
  getJobs() {
    return this.jobRepo.find({ relations: ['property', 'technician'] });
  }

  @Post('jobs')
  createJob(@Body() jobData: Partial<JobCard>) {
    return this.jobRepo.save(jobData);
  }

  @Delete('jobs/:id')
  deleteJob(@Param('id') id: string) {
    return this.jobRepo.delete(id);
  }

  @Patch('jobs/:id/start')
  async startJob(@Param('id') id: string) {
    await this.jobRepo.update(id, {
      status: 'IN_PROGRESS',
      startedAt: new Date()
    });
    return { success: true };
  }

  @Patch('jobs/:id/complete')
  async completeJob(@Param('id') id: string) {
    await this.jobRepo.update(id, {
      status: 'COMPLETED',
      completedAt: new Date()
    });
    return { success: true };
  }

  @Post('jobs/:id/invoice')
  async generateInvoice(@Param('id') id: string) {
    return this.invoiceService.generateInvoiceForJob(Number(id));
  }

  @Patch('invoices/:id/pay')
  async payInvoice(@Param('id') id: string) {
    return this.invoiceService.payInvoice(Number(id));
  }



  @Get('invoices')
  getInvoices() {
    return this.invoiceService.findAll();
  }
}
