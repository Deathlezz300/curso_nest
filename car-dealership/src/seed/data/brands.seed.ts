import { Brand } from "src/brands/entities/brand.entity";

export const BRAND_SEED:Brand[]=[
    {
        id:crypto.randomUUID(),
        name:"Toyota",
        createdAt:new Date().getTime()
      },
    {
        id:crypto.randomUUID(),
        name:"Mazda",
        createdAt:new Date().getTime()
      },
      {
        id:crypto.randomUUID(),
        name:"Honda",
        createdAt:new Date().getTime()
      }
]