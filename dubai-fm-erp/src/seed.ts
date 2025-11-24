import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Customer, Property } from './entities/crm.entity';
import { JobCard, Technician } from './entities/ops.entity';
import { DataSource } from 'typeorm';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    console.log('🌱 Starting Seed...');

    // 1. Create a Customer
    const customerRepo = dataSource.getRepository(Customer);
    const newCustomer = customerRepo.create({
        name: 'Ahmed Al Mansoori',
        type: 'RESIDENTIAL',
        phone: '+971501234567',
        email: 'ahmed@example.com'
    });
    await customerRepo.save(newCustomer);
    console.log('✅ Created Customer: Ahmed Al Mansoori');

    // 2. Create a Property
    const propertyRepo = dataSource.getRepository(Property);
    const newProperty = propertyRepo.create({
        customer: newCustomer,
        name: 'Villa 101',
        community: 'Arabian Ranches',
        type: 'Villa'
    });
    await propertyRepo.save(newProperty);
    console.log('✅ Created Property: Villa 101, Arabian Ranches');

    // 3. Create a Technician
    const techRepo = dataSource.getRepository(Technician);
    const newTech = techRepo.create({
        name: 'John Doe',
        specialization: 'AC Technician',
        mobileNumber: '+971559876543'
    });
    await techRepo.save(newTech);
    console.log('✅ Created Technician: John Doe');

    // 4. Create a Job Card
    const jobRepo = dataSource.getRepository(JobCard);
    const newJob = jobRepo.create({
        property: newProperty,
        technician: newTech,
        jobType: 'REACTIVE',
        description: 'AC not cooling in Master Bedroom',
        status: 'OPEN',
        priority: 'HIGH'
    });
    await jobRepo.save(newJob);
    console.log('✅ Created Job Card: #1 - AC not cooling');

    console.log('🚀 Seed Complete! System is ready.');
    await app.close();
}
bootstrap();
