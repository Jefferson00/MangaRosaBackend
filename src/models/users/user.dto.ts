import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEmail,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';
import Knowledges from '../knowledges/knowledges.entity';

export class CreateUserDTO {
  @IsNotEmpty()
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  cpf: string;
  @IsNotEmpty()
  phone: string;
  @IsArray()
  @ValidateNested({ each: true })
  @ArrayMinSize(1)
  @ArrayMaxSize(3)
  @Type(() => Knowledges)
  knowledges: Knowledges[];
}
