import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
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

  @ApiProperty({
    example: 'qwer',
    required: true
  })
  name: string;
}
