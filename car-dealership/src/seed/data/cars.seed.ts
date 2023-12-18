import { Car } from "src/cars/interfaces/car.interface";

export const CARS_SEEED:Car[]=[
    {
        id:crypto.randomUUID(),
        carro:"Toyota"
    },
    {
        id:crypto.randomUUID(),
        carro:"Honda"
    },
    {
        id:crypto.randomUUID(),
        carro:"Mazda"
    }
]