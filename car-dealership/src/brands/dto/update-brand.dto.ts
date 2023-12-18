import { PartialType } from '@nestjs/mapped-types';
import { CreateBrandDto } from './create-brand.dto';
import { IsString } from 'class-validator';

export class UpdateBrandDto extends PartialType(CreateBrandDto) {
    
    @IsString()
    name:string;
}
