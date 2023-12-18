import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post,Put,RawBodyRequest,Req } from '@nestjs/common';
import { CarsService } from './cars.service';
import {Request} from 'express'
import { CreateCarDTO } from './DTO/CreateCar.dto';
 
@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService:CarsService
    ){}

    @Get()
    getAllCars(){
        return this.carsService.findAll()
    }

    @Get(':id')
    getCarById(@Param('id',ParseUUIDPipe) id:string){
        
        return this.carsService.findById(id)
    }

    @Post()
    addCar(@Body() createCarDTO:CreateCarDTO){

        const carAdd=this.carsService.newCar(createCarDTO);

        return{
            ok:true,
            ...carAdd
        }

    }

    @Put(':id')
    ActualizarCard(
        @Param('id',ParseUUIDPipe) id, 
        @Body() updateCar:CreateCarDTO
    ){

        this.carsService.updateCarById(id,updateCar);

        return{
            ok:true,
        }
    }

    @Delete(':id')
    EliminarCar(
        @Param('id',ParseUUIDPipe) id
    ){

        this.carsService.deleteCarById(id);

        return{
            ok:true,
        }
    }

}
