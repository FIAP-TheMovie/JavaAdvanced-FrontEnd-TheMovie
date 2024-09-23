/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function createUser(prevState: any, formData: FormData) {

    const user = {
        name: formData.get('name'),
        surname: formData.get('surname'),
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const response = await fetch('http://localhost:8080/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })

    if (!response.ok) {
        return {
            success: false,
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
        }
    } 

    return {
        success: true,
        name: '',
        surname: '',
        email: '',
        password: '',
    }

}

export async function login(prevState: any, formData: FormData) {

    const user = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })

    if (!response.ok) {
        return {
            message: "Acesso negado"
        }
    } 

    const data = await response.json()
    cookies().set('token', data.token)
    cookies().set('email', data.email)

    redirect('/feed') // Verificar o que é no Back-End

    return {
        success: true,
        email: '',
        password: '',
    }

}

export async function getUserProfile() {
    const response = await fetch('http://localhost:8080/users/profile', {
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
        surname: json.surname,
        email: json.email,
    }
}

export async function updateUser(prevState: any, formData: FormData) {

    const user = {
        name: formData.get('name'),
        surname: formData.get('surname'),
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const response = await fetch('http://localhost:8080/users', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies().get('token')?.value}`
        },
        body: JSON.stringify(user),
    })

    if (response.status === 403) {
        redirect('/')
    }

    if (response.status === 400) {
        const json = await response.json()
        return {
            success: false,
            name: json.find((error: any) => error.field === 'name')?.message,
            surname: json.find((error: any) => error.field === 'surname')?.message,
            email: json.find((error: any) => error.field === 'email')?.message,
            password: json.find((error: any) => error.field === 'password')?.message
        }
    }

    return {
        success: true,
        name: '',
        surname: '',
        email: '',
        password: '',
    }
}

export async function logout() {
    cookies().delete("token")
    redirect('/')
}