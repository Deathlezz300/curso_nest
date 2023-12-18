import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { Brand } from './entities/brand.entity';

@Injectable()
export class BrandsService {


  private Brands:Brand[]=[
    // {
    //   id:crypto.randomUUID(),
    //   name:"Toyota",
    //   createdAt:new Date().getTime()
    // },
  ]


  create(createBrandDto: CreateBrandDto) {
    
    const newBrand:Brand={
      id:crypto.randomUUID(),
      name:createBrandDto.name,
      createdAt:new Date().getTime()
    }

    this.Brands.push(newBrand);

    return newBrand;

  }

  findAll() {
    return this.Brands;
  }

  findOne(id: string) {
    

    const brand=this.Brands.find(Brand=>Brand.id===id);

    if(!brand) throw new NotFoundException(`Brand with ${id} doesn't exists`);

    return brand;

  }

  update(id: string, updateBrandDto: UpdateBrandDto) {
    
    let BrandDB=this.findOne(id);

    this.Brands=this.Brands.map(Brand=>{
        
      if(Brand.id===id){
        BrandDB.updatedAt=new Date().getTime()
        BrandDB={
          ...BrandDB,
          ...updateBrandDto
        }

        return BrandDB;
      }

      return Brand;

    })


    return {
      ok:true,
      ...BrandDB
    }

  }

  remove(id: string) {
    this.Brands=this.Brands.filter((Brand)=>Brand.id!=id);

    return {
      ok:true,
      message:`Deleted brand with id: ${id}`
    }
  }

  fillWithSeedData(Brands:Brand[]){
    this.Brands=Brands;
  }
}
