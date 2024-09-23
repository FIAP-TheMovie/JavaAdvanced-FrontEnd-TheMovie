/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function createMovie(prevState: any, formData: FormData) {

    const movie = {
        name: formData.get('name'),
        description: formData.get('description'),
        actor: formData.get('actor'),
    }

    const response = await fetch('http://localhost:8080/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(movie),
    })

    if (!response.ok) {
        return {
            success: false,
            name: movie.name,
            description: movie.description,
            actor: movie.actor,
        }
    } 

    return {
        success: true,
        name: '',
        description: '',
        actor: '',
    }

}

export async function uploadPhoto(formData: FormData) {
    const response = await fetch('http://localhost:8080/movies/photo', {
        method: 'POST',
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
        }
    }

    return {
        success: true,
    }
}

export async function searchMovies(name: string) {
    const response = await fetch(`http://localhost:8080/movies?name=${name}`, {
        headers: {
            "Authorization": `Bearer ${cookies().get('token')?.value}`
        }
    })

    if (response.status === 403) {
        redirect('/')
    }

    const json = await response.json()
    return json.map((movie: any) => ({
        name: movie.name,
        description: movie.description,
        actor: movie.actor,
        photo: movie.photo,
    }))
}

export async function getMovie(id: number) {
    const response = await fetch(`http://localhost:8080/movies?id=${id}`, {
        headers: {
            'Authorization': `Bearer ${cookies().get('token')?.value}`
        }
    })

    if (response.status === 403) {
        redirect('/')
    }
    
    const json = await response.json()
    return {
        name: json.name,
        description: json.description,
        actor: json.actor,
        photo: json.photo,
    }
}

export async function updateMovie(prevState: any, formData: FormData) {

    const movie = {
        name: formData.get('name'),
        description: formData.get('description'),
        actor: formData.get('actor'),
    }

    const response = await fetch('http://localhost:8080/movies', {
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
            name: json.find((error: any) => error.field === 'name')?.message,
            description: json.find((error: any) => error.field === 'description')?.message,
            actor: json.find((error: any) => error.field === 'actor')?.message,
        }
    }

    return {
        success: true,
        name: '',
        description: '',
        actor: '',
    }
}