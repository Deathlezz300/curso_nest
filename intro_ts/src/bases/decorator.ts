const MyDecorator=()=>{
    return (target:Function)=>{
        console.log(target)
    }
}

@MyDecorator()
export class PokemonDecorator{


    constructor(
        public readonly id:number,
        public name:string
    ){}

    scream(){
        console.log(`${this.name.toUpperCase()}`)
    }

    speak(){
        console.log(`Hola, soy ${this.name}`)
    }

}

export const charmander=new PokemonDecorator(1,'Charmander')