interface Movie {
    id: number,
    name: string,
    description: string,
    actor: string,
    photo: string,
    user_id: number
}

interface User{
    id: number,
    name: string,
    surname: string,
    email: string,
    password: string,
}