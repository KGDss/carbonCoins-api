import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './module/catModule';

@Injectable()
export class AppService {
  getHello(a: string): string {
    return `Hello ${a} `;
  }

  private readonly cats: CreateCatDto[] = [];

  create(cat: CreateCatDto) {
    this.cats.push(cat);
  }

  findAll(): CreateCatDto[] {
    return this.cats;
  }
}
