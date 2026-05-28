import {
  IsString,
  IsNumber,
  IsArray,
  ValidateNested,
  IsEmail,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class TicketDto {
  @IsString() film: string;
  @IsString() session: string;
  @IsString() daytime: string;
  @IsNumber() @Min(1) row: number;
  @IsNumber() @Min(1) seat: number;
  @IsNumber() price: number;
}

export class CreateOrderDto {
  @IsEmail() email: string;
  @IsString() phone: string;
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TicketDto)
  tickets: TicketDto[];
}
