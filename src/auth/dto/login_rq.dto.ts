import { ApiProperty } from '@nestjs/swagger';

export class loginrqDto {
  @ApiProperty({
    example: 'qwer1234@ajou.ac.kr',
    required: true
  })
  email: string;

  @ApiProperty({
    example: 'qwer1234',
    required: true
  })
  password: string;
}
