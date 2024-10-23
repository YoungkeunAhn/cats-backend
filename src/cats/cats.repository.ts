import { HttpException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Knex } from 'knex';
import { InjectConnection } from 'nest-knexjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cats } from './entities/cats.entity';

export class CatsRepository {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async existsByEmail(email: string): Promise<boolean> {
    try {
      const result = await this.knex('users')
        .select('*')
        .where({ email })
        .first();

      return result ? true : false;
    } catch (err) {
      console.error(err);
      throw new HttpException('db error', 400);
    }
  }

  async createUser(
    data: CreateCatDto,
  ): Promise<Omit<CreateCatDto, 'password'>> {
    try {
      const { email, name, password } = data;

      const hashedPassword = await bcrypt.hash(password, 10);
      await this.knex('users').insert({
        email,
        name,
        password: hashedPassword,
      });

      return { email, name };
    } catch (err) {
      console.error(err);
      throw new HttpException('db error', 400);
    }
  }

  async findUserByEmail(email: string): Promise<Cats> {
    try {
      const user = this.knex('users').where({ email: email }).first();
      return user;
    } catch (err) {
      console.error(err);
      throw new HttpException('db error', 400);
    }
  }

  async findUserByPk(pk: string): Promise<Omit<Cats, 'password'>> {
    try {
      const user: Cats = await this.knex('users').where({ pk }).first();

      const { password, ...withoutPasswordUser } = user;
      return withoutPasswordUser;
    } catch (err) {
      console.error(err);
      throw new HttpException('db error', 400);
    }
  }
}
