interface IUserProfile {
    email: string, 
    gender: "male" | "female",
    id: number,
    name: string
}

interface IProfilePayload{
    data: IUserProfile,
    success: boolean,
    message: string
}

interface IProductList{
    data: any[],
    success: string, 
    message: string
}

interface IProductItem{
    description: string,
    image: string,
    name: string,
    price: any,
    id?: number | null,
}

export type {IUserProfile, IProfilePayload, IProductList, IProductItem};