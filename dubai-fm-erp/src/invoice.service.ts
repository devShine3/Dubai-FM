import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/accounting.entity';
import { JobCard } from './entities/ops.entity';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
        @InjectRepository(JobCard) private jobRepo: Repository<JobCard>,
    ) { }

    async generateInvoiceForJob(jobId: number) {
        const job = await this.jobRepo.findOne({
            where: { id: jobId },
            relations: ['property', 'property.customer']
        });

        if (!job) throw new Error('Job not found');

        // Simple pricing logic (Mock)
        const laborCost = 150; // Standard Call-out fee
        const partsCost = 0;   // No parts for now
        const subtotal = laborCost + partsCost;
        const vatRate = 0.05;
        const vatAmount = subtotal * vatRate;
        const totalAmount = subtotal + vatAmount;

        const invoice = this.invoiceRepo.create({
            invoiceNumber: `INV-${Date.now()}`,
            customer: job.property.customer,
            jobCard: job,
            subtotal,
            vatAmount,
            totalAmount,
            status: 'UNPAID',
            issueDate: new Date()
        });

        return this.invoiceRepo.save(invoice);
    }

    findAll() {
        return this.invoiceRepo.find({
            relations: ['customer', 'jobCard'],
            order: { issueDate: 'DESC' }
        });
    }

    async payInvoice(id: number) {
        await this.invoiceRepo.update(id, { status: 'PAID' });
        return { success: true };
    }
}
