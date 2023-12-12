import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsArray, IsDate, IsOptional } from 'class-validator';

export class EditCoinDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  symbol?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsArray()
  websites?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDate()
  creationDate?: string;
}
