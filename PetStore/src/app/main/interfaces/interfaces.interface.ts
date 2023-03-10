export interface Pet{
    name:String,
    status:String,
    image:String
}

export interface NewPet{
    id: number,
    name: String,
    category: Category[],
    photoUrls: string,
    tags: Tag[],
    status: String
}

interface Category{
    id: number,
    name: String;
}

interface Tag{
    id: number,
    name: String
}