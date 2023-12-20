import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios'
import { APIResult } from './interface/ApiInterface';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';

@Injectable()
export class SeedService {
  
  private readonly Axios:AxiosInstance=axios;

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon>,
  ){}

  async executeSeed(){

    await this.pokemonModel.deleteMany();

    let objectSeedPromise=[];

    const {data}=await this.Axios.get<APIResult>('https://pokeapi.co/api/v2/pokemon?limit=650');

    data.results.forEach(resul=>{
      const objectSeed:CreatePokemonDto={
        name:resul.name,
        no:parseInt(resul.url.split("/")[6])
      }

      objectSeedPromise.push(objectSeed);
      // objectSeedPromise.push(this.pokemonModel.create(objectSeed));

    })

    // await Promise.all(objectSeedPromise);

    await this.pokemonModel.insertMany(objectSeedPromise);

    return {
      ok:true
    };

  }


}
