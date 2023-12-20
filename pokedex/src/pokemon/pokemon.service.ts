import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { paginationDTO } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const encontrarPokemon = await this.pokemonModel.findOne({
        $or:[
          {name:createPokemonDto.name},
          {no:createPokemonDto.no}
        ]
      });

      if (encontrarPokemon) {
        return new BadRequestException(`Pokemon already exists in db`)
      }

      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;

    } catch (error) {
      return{
        ok:false,
        message:'Check server logs'
      }
    }

  }

  async findAll(parameters:paginationDTO) {
    
    try{

      const {limit=10,offset=0}=parameters;

      const Pokemons=await this.pokemonModel
      .find()
      .limit(limit)
      .skip(offset)
      .select('-__v');

      return Pokemons;

    }catch(error){

      console.log(error);

    }



  }

  async findOne(id: string) {
    
      if(isNaN(+id) && !isValidObjectId(id)) throw new BadRequestException('Is not a number or mongo ID')

      let pokemonToFind:Pokemon;

      if(isValidObjectId(id)){
        pokemonToFind=await this.pokemonModel.findById(id)
      }else{
         pokemonToFind=await this.pokemonModel.findOne({no:id})
      }

      if(!pokemonToFind ) throw new NotFoundException(`No existe pokemon ${id}`)

      return pokemonToFind;


  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    

    try{

      const pokemon=await this.findOne(id) as Pokemon;

      if(pokemon.name){
        pokemon.name=pokemon.name.toLowerCase();
      }

      const newPokemon=await pokemon.updateOne(updatePokemonDto,{new:true});

      return newPokemon;

    }catch(error){
        this.handleException(error);
        
    }

  }

  async remove(id: string) {
          
      // const pokemon=await this.findOne(id) as Pokemon;

      // await pokemon.deleteOne();

      // return {
      //   ok:true
      // }

      const {deletedCount}=await this.pokemonModel.deleteOne({_id:id});

      if(deletedCount===0){
        throw new BadRequestException(`Pokemon with ${id} doesn't exists`)
      }

      return{
        ok:true
      }

  }


  private handleException(error:any){
    if(error.code===11000){
      throw new BadRequestException(`Pokemon exist in db ${JSON.stringify(error.keyValue)}`)
    }
    
    console.log(error);

    throw new InternalServerErrorException('Check server logs for more information');
    
  }

}
