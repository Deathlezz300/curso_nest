import { Injectable } from '@nestjs/common';
import { BrandsService } from 'src/brands/brands.service';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEEED } from './data/cars.seed';
import { BRAND_SEED } from './data/brands.seed';

@Injectable()
export class SeedService {


  constructor(
    private carsService:CarsService,
    private brandService:BrandsService
  ){}


  seedData(){

    this.carsService.fillCarsWithSeedData(CARS_SEEED);
    this.brandService.fillWithSeedData(BRAND_SEED);

  }


}
