import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { LoginDataDto } from 'src/auth/dto/auth.request.dto';
import { JwtAuthGuard } from 'src/auth/jwt/jwt.guard';
import { CatsRepository } from './cats.repository';
import { CatRequestDto, CreateCheckDto } from './dto/cats.request.dto';

@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsRepository: CatsRepository,
    private readonly authService: AuthService,
  ) {}

  @ApiOperation({ summary: '현재 유저 정보 조회' })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: String,
  })
  @UseGuards(JwtAuthGuard)
  @Get()
  getCurrntUser(@Req() req: Request) {
    return req.user;
  }

  @ApiOperation({
    summary: '이메일 중복체크',
  })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
  })
  @Post('/signup/check')
  async isExistUser(@Body() body: CreateCheckDto) {
    const result = await this.catsRepository.existsByEmail(body.email);
    return result;
  }

  @ApiOperation({ summary: '회원가입' })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: Boolean,
  })
  @Post('/signup')
  async signUp(@Body() body: CatRequestDto) {
    const result = this.catsRepository.createUser(body);
    return result;
  }

  @ApiOperation({ summary: '로그인' })
  @ApiResponse({
    status: 500,
    description: 'Server Error...',
  })
  @ApiResponse({
    status: 200,
    description: '성공',
    type: String,
  })
  @Post('/login')
  async login(@Body() body: LoginDataDto) {
    const { accessToken } = await this.authService.jwtLogIn(body);
    return accessToken;
  }
}
