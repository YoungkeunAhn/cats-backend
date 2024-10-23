import { ApiProperty } from '@nestjs/swagger';

export class CreateCatDto {
  name: string;
  email: string;
  password: string;
}
