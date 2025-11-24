import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Contract, Property } from './crm.entity';

@Entity('technicians')
export class Technician {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ name: 'mobile_number', nullable: true })
    mobileNumber: string;

    @Column({ nullable: true })
    specialization: string;

    @Column({ default: 'AVAILABLE' })
    status: string;
}

@Entity('job_cards')
export class JobCard {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'contract_id', nullable: true })
    contractId: number;

    @ManyToOne(() => Contract)
    @JoinColumn({ name: 'contract_id' })
    contract: Contract;

    @Column({ name: 'property_id', nullable: true })
    propertyId: number;

    @ManyToOne(() => Property)
    @JoinColumn({ name: 'property_id' })
    property: Property;

    @Column({ name: 'technician_id', nullable: true })
    technicianId: number;

    @ManyToOne(() => Technician)
    @JoinColumn({ name: 'technician_id' })
    technician: Technician;

    @Column({ name: 'job_type', nullable: true })
    jobType: string;

    @Column({ default: 'NORMAL' })
    priority: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column({ name: 'scheduled_date', type: 'timestamp', nullable: true })
    scheduledDate: Date;

    @Column({ name: 'started_at', type: 'timestamp', nullable: true })
    startedAt: Date;

    @Column({ name: 'completed_at', type: 'timestamp', nullable: true })
    completedAt: Date;

    @Column({ default: 'OPEN' })
    status: string;

    @Column({ name: 'customer_sign_off', default: false })
    customerSignOff: boolean;

    @Column({ name: 'technician_notes', type: 'text', nullable: true })
    technicianNotes: string;
}

@Entity('inventory_items')
export class InventoryItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true, nullable: true })
    sku: string;

    @Column({ name: 'unit_cost', type: 'decimal', precision: 10, scale: 2, nullable: true })
    unitCost: number;

    @Column({ name: 'selling_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
    sellingPrice: number;

    @Column({ name: 'stock_quantity', nullable: true })
    stockQuantity: number;
}

@Entity('job_materials')
export class JobMaterial {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'job_card_id' })
    jobCardId: number;

    @ManyToOne(() => JobCard)
    @JoinColumn({ name: 'job_card_id' })
    jobCard: JobCard;

    @Column({ name: 'inventory_item_id' })
    inventoryItemId: number;

    @ManyToOne(() => InventoryItem)
    @JoinColumn({ name: 'inventory_item_id' })
    inventoryItem: InventoryItem;

    @Column()
    quantity: number;

    @Column({ name: 'unit_price_charged', type: 'decimal', precision: 10, scale: 2 })
    unitPriceCharged: number;

    @Column({ name: 'total_price', type: 'decimal', precision: 10, scale: 2 })
    totalPrice: number;
}
