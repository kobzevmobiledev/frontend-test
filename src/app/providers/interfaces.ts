export interface Credentials {
    username:string,
    password?:string
}

export interface Token {
    token:string
}

export interface AuthResponse {
    token:string,
    success:string,
    message?:any
}

export interface Product {
    id: number,
    img: string,
    text: string,
    title: string
}
export interface Rate{
    id: number,
    active: boolean
}
export interface Review{
    text: string,
    rate: number
}
export interface RateResponse{
    review_id: number,
}
