import { Controller, Post } from '@nestjs/common';

@Controller()
export class UserController {
  @Post('/')
  createUser() {
    return 'hello';
  }
}