import { Injectable } from '@nestjs/common';
import { CatRequestDto, CreateCheckDto } from './dto/cats.request.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

@Injectable()
export class CatsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async isExistUser(params: CreateCheckDto) {
    const user = this.knex('users').where(params).first();

    return user;
  }

  async signUp(body: CatRequestDto) {
    // this.knex('table').insert(body);
  }

  findAll() {
    return `This action returns all cats`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cat`;
  }

  update(id: number, updateCatDto: UpdateCatDto) {
    return `This action updates a #${id} cat`;
  }

  remove(id: number) {
    return `This action removes a #${id} cat`;
  }
}
