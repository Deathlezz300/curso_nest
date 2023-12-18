import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { CreateCarDTO } from './DTO/CreateCar.dto';

@Injectable()
export class CarsService {

    private carros:Car[];


    findAll(){
        return this.carros;
    }

    findById(id:string){
        const car=this.carros.find((car)=>car.id===id);

        if(!car){
            throw new NotFoundException(`Car with ${id} not found`)
        }

        return car;

    }

    newCar(carro:CreateCarDTO){

        const newCar={
            id:crypto.randomUUID(),
            carro:carro.nombre
        }

        this.carros.push(newCar);

        return newCar;

    }

    deleteCarById(id:string){


        this.findById(id);

        this.carros=this.carros.filter((carro)=>carro.id!=id)


    }

    updateCarById(id:string,Car:CreateCarDTO){

        this.findById(id);

        this.carros=this.carros.map(car=>{
            if(car.id===id){
                return {
                    ...car,
                    carro:Car.nombre
                }
            }

            return car;
        })


    }

    fillCarsWithSeedData(cars:Car[]){
        this.carros=cars;
    }


}
