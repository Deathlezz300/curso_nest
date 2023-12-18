import { HttpAdapter, PokeApiAdapter, PokeFetchAdapter } from "../api/PokeApiAdapter";

export class Pokemon{

    // public id:number;
    // public name:string;


    // constructor(id:number,name:string){
    //     this.id=id;
    //     this.name=name;
    // }


    constructor(
        public id:number,
        public name:string,
        private readonly http:HttpAdapter
    ){}

    get Getname():string{
        return this.name;
    }

    scream(){
        console.log(`Tu nombre es el siguiente ${this.name.toUpperCase()}`)
    }

    async esperar(){
        return await new Promise(resolve=>resolve(10));
    }

    async peticion(){
        return await this.http.get<string>('sapo')
    }


}

const pokemon1=new Pokemon(1,"hola",new PokeFetchAdapter());

pokemon1.scream();
