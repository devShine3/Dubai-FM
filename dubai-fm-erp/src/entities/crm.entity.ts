import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';

@Entity('customers')
export class Customer {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ nullable: true })
    type: string; // RESIDENTIAL, COMMERCIAL, STRATA

    @Column({ nullable: true })
    email: string;

    @Column({ nullable: true })
    phone: string;

    @Column({ name: 'trn_number', nullable: true })
    trnNumber: string;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @OneToMany(() => Property, (property) => property.customer)
    properties: Property[];

    @OneToMany(() => Quote, (quote) => quote.customer)
    quotes: Quote[];

    @OneToMany(() => Contract, (contract) => contract.customer)
    contracts: Contract[];
}

@Entity('properties')
export class Property {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'customer_id' })
    customerId: number;

    @ManyToOne(() => Customer, (customer) => customer.properties)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column({ nullable: true })
    name: string;

    @Column({ type: 'text', nullable: true })
    address: string;

    @Column({ name: 'google_maps_link', nullable: true })
    googleMapsLink: string;

    @Column({ nullable: true })
    community: string;

    @Column({ nullable: true })
    type: string;
}

@Entity('quotes')
export class Quote {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'customer_id' })
    customerId: number;

    @ManyToOne(() => Customer, (customer) => customer.quotes)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column({ name: 'property_id', nullable: true })
    propertyId: number;

    @ManyToOne(() => Property)
    @JoinColumn({ name: 'property_id' })
    property: Property;

    @Column({ default: 'DRAFT' })
    status: string;

    @Column({ name: 'total_amount', type: 'decimal', precision: 10, scale: 2, nullable: true })
    totalAmount: number;

    @Column({ name: 'valid_until', type: 'date', nullable: true })
    validUntil: Date;

    @Column({ name: 'scope_of_work', type: 'text', nullable: true })
    scopeOfWork: string;
}

@Entity('contracts')
export class Contract {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'quote_id', nullable: true })
    quoteId: number;

    @Column({ name: 'customer_id' })
    customerId: number;

    @ManyToOne(() => Customer, (customer) => customer.contracts)
    @JoinColumn({ name: 'customer_id' })
    customer: Customer;

    @Column({ name: 'property_id', nullable: true })
    propertyId: number;

    @ManyToOne(() => Property)
    @JoinColumn({ name: 'property_id' })
    property: Property;

    @Column({ name: 'start_date', type: 'date' })
    startDate: Date;

    @Column({ name: 'end_date', type: 'date' })
    endDate: Date;

    @Column({ nullable: true })
    type: string;

    @Column({ name: 'total_value', type: 'decimal', precision: 10, scale: 2, nullable: true })
    totalValue: number;

    @Column({ name: 'visits_per_year', nullable: true })
    visitsPerYear: number;

    @Column({ default: 'ACTIVE' })
    status: string;
}
