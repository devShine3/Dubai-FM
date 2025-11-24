import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Customer, Contract } from './crm.entity';
import { JobCard } from './ops.entity';

@Entity('invoices')
export class Invoice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'invoice_number', unique: true })
    invoiceNumber: string;

    @Column({ name: 'customer_id' })
    customerId: number;

    @ManyToOne(() => Customer)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column({ name: 'job_card_id', nullable: true })
    jobCardId: number;

    @ManyToOne(() => JobCard)
    @JoinColumn({ name: 'job_card_id' })
    jobCard: JobCard;

    @Column({ name: 'contract_id', nullable: true })
    contractId: number;

    @ManyToOne(() => Contract)
    @JoinColumn({ name: 'contract_id' })
    contract: Contract;

    @Column({ name: 'issue_date', type: 'date', default: () => 'CURRENT_DATE' })
    issueDate: Date;

    @Column({ name: 'due_date', type: 'date', nullable: true })
    dueDate: Date;

    @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
    subtotal: number;

    @Column({ name: 'vat_amount', type: 'decimal', precision: 10, scale: 2, nullable: true })
    vatAmount: number;

    @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2, nullable: true })
    totalAmount: number;

    @Column({ default: 'UNPAID' })
    status: string;

    @Column({ name: 'payment_method', nullable: true })
    paymentMethod: string;
}

@Entity('payments')
export class Payment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'invoice_id' })
    invoiceId: number;

    @ManyToOne(() => Invoice)
    @JoinColumn({ name: 'invoice_id' })
    invoice: Invoice;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    amount: number;

    @Column({ name: 'payment_date', type: 'date', default: () => 'CURRENT_DATE' })
    paymentDate: Date;

    @Column({ name: 'reference_number', nullable: true })
    referenceNumber: string;
}
