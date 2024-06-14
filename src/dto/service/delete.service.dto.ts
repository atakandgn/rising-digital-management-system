import { IsNumber, IsNotEmpty, Min } from 'class-validator';

export class DeleteServiceDto {
    @IsNumber()
    @IsNotEmpty()
    id: number;
}