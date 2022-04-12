import { EnrollmentsService } from './../../services/enrollments.service';
import { CoursesService } from './../../services/courses.service';
import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { StudentsService } from '../../services/students.service';

export interface Customer {
  authUserId: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
}

export interface IPurchaseCreatedPayload {
  customer: Customer;
  product: Product;
}

@Controller('purchases')
export class PurchaseController {
  constructor(
    private studentsService: StudentsService,
    private coursesService: CoursesService,
    private enrollmentsService: EnrollmentsService,
  ) {}

  @EventPattern('purchases.new-purchase')
  async purchaseCreated(@Payload('value') payload: IPurchaseCreatedPayload) {
    const { customer, product } = payload;

    const student = await this.studentsService.getStudentByAuthUserId(
      customer.authUserId,
    );

    if (!student) {
      await this.studentsService.createStudent({
        authUserId: customer.authUserId,
      });
    }

    let course = await this.coursesService.getCourseBySlug(product.slug);

    if (!course) {
      course = await this.coursesService.createCourse({
        title: product.title,
        slug: product.slug,
      });
    }

    await this.enrollmentsService.createEnrollment({
      studentId: student.id,
      courseId: course.id,
    });
  }
}
