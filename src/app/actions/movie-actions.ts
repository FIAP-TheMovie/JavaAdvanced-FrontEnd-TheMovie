/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function createMovie(userId: number, prevState: any, formData: FormData) {

    const movie = {
        name: formData.get('name'),
        description: formData.get('description'),
        actors: formData.get('actors'),
        user_id: userId,
    }

    const response = await fetch('http://localhost:8080/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies().get('token')?.value}`
        },
        body: JSON.stringify(movie),
    })

    if (!response.ok) {
        return {
            success: false,
            message: 'Erro ao criar o filme.' + response.status,
            name: movie.name,
            description: movie.description,
            actors: movie.actors,
        }
    } 

    return {
        success: true,
        message: 'Filme criado com sucesso.',
        name: movie.name,
        description: movie.description,
        actors: movie.actors,
    }

}

export async function searchMovies(name: string) {
    const response = await fetch(`http://localhost:8080/movies/search?name=${name}`, {
        cache: 'no-store'
    })

    if (response.status === 403) {
        redirect('/')
    }

    const json = await response.json()
    return json.map((movie: any) => ({
        name: movie.name,
        description: movie.description,
        actors: movie.actors,
        photo: movie.photo,
    }))
}

export async function getMovie(id: number) {
    const response = await fetch(`http://localhost:8080/movies/${id}`, {
        cache: 'no-store'
    })
    
    const movie = await response.json()
    return movie
}

export async function getMovies() {
    const response = await fetch(`http://localhost:8080/movies`, {
        cache: 'no-store'
    })

    const movie = await response.json()
    return movie
}

export async function updateMovie(id: number, formData: FormData) {

    const movie = {
        id: id,
        name: formData.get('name'),
        description: formData.get('description'),
        actors: formData.get('actors'),
        photo: formData.get('photo'),
    }

    const response = await fetch(`http://localhost:8080/movies/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies().get('token')?.value}`
        },
        body: JSON.stringify(movie),
    })

    if (response.status === 403) {
        redirect('/')
    }

    if (response.status === 400) {
        const json = await response.json()
        return {
            success: false,
            id: id,
            name: json.find((error: any) => error.field === 'name')?.message,
            description: json.find((error: any) => error.field === 'description')?.message,
            actors: json.find((error: any) => error.field === 'actors')?.message,
            photo: json.find((error: any) => error.field === 'photo')?.message,
        }
    }

    return {
        success: true,
        id: id,
        name: '',
        description: '',
        actors: '',
        photo: '',
    }
}

export async function uploadPhoto(id: number, formData: FormData) {
    const response = await fetch(`http://localhost:8080/movies/${id}/photo`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${cookies().get('token')?.value}`
        },
        body: formData,
        
    })

    if (response.status === 403) {
        redirect('/')
    }

    if(!response.ok) {
        return {
            success: false,
            message: 'Ocorreu um erro ao publicar a imagem' + response.status,
        }
    }

    return {
        success: true,
        message: '',
    }
}

export async function deleteMovie(id: number) {
    const response = await fetch(`http://localhost:8080/movies/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${cookies().get('token')?.value}`
        }
    })
    
    if (!response.ok) {
        const json = await response.json()
        return {
            success: false,
            message: 'Erro ao deletar o filme.' + response.status,
            id: id,
            name: json.name,
            description: json.description,
            actors: json.actors,
            photo: json.photo,
            user_id: json.user_id,
        }
    }

    return {
        success: true,
        id: id,
        name: '',
        description: '',
        actors: '',
        photo: '',
        user_id: '',
    }
}
