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

export async function login(prevState: any, formData: FormData) {

    const credentials = {
        email: formData.get('email'),
        password: formData.get('password'),
    }

    const response = await fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
        cache: 'no-store'
    })

    if (!response.ok) {
        return {
            message: 'Falha no login. ' + response.status,
            success: false,
            email: formData.get('email')
        }
    } 

    const json = await response.json()
    const token = json.token
    const email = json.email

    cookies().set('token', token)
    cookies().set('email', email)

    redirect('/')

    return {
        success: true,
        id: json.id,
        name: formData.get('name'),
        surname: formData.get('surname'),
        email: formData.get('email'),
        user_id: json.user_id,
    }

}

export async function logout() {
    cookies().delete("token")
    cookies().delete("email")
    redirect('/')
}