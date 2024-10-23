import { Controller, Get } from '@nestjs/common';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';

@Controller()
export class AppController {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  @Get()
  async getUsers() {
    // const users = await this.knex.table('users');
    // console.log(users);
    console.log('hi');
  }
}
