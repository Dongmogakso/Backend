import { ApiProperty } from '@nestjs/swagger';


export class SignupRsDto {
  @ApiProperty({
    example: '0',
    required: true
  })
  error_code: number;
}
