import axios from 'axios';

export interface HttpAdapter{

    get<T>(url:string):Promise<T>

}

export class PokeApiAdapter implements HttpAdapter{
    
    async get<T>(url:string){
        const {data}=await axios.get<T>(url);
        return data;
    }

    async post(url:string){

        return ;

    }

    async patch(url:string){

        return ;

    }

    async delete(url:string){
        return ;
    }

    async put(url:string){

    }


}

export class PokeFetchAdapter implements HttpAdapter{
    

    async get<T>(url:string){
        const response=await fetch(url);
        const data:T=await response.json();
    
        return data;
    
    }

}