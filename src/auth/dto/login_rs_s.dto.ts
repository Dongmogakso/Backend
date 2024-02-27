import { ApiProperty } from '@nestjs/swagger';

export class loginrssdto {
  @ApiProperty({
    example: 'sdflkjlsfajkjrowiperu903',
    required: true
  })
  token: Promise<string>;

  @ApiProperty({
    example: 'qwer1234@ajou.ac.kr',
    required: true
  })
  email: string;

  @ApiProperty({
    example: 'qwer1234',
    required: true
  })
  name: string;

  @ApiProperty({
    example: '0',
    required: true
  })
  error_code: number;
}
