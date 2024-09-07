import { Controller, Get } from '@nestjs/common';

@Controller({ host: 'admin.com' })
export class AdminController {
  @Get()
  index(): string {
    return 'admin page';
  }
}
