/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export async function login(prevState: any, formData: FormData) {

    const credentials = {
        id: formData.get('id'),
        email: formData.get('email'),
        password: formData.get('password'),
        message: '',
    }

    try{
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
                success: false,
                email: credentials.email,
                message: 'Erro ao fazer login. ' + response.status,
            }
        } 
    
        const json = await response.json()
        const token = json.token
    
        cookies().set('token', token)
        cookies().set('email', json.email)
    
        return {
            success: true,
            id: json.id,
            name: json.name,
            surname: json.surname,
            email: json.email,
            message: 'Login efetuado com sucesso.',
        }
    } catch (error) {
        return {
            message: 'Erro na conexão: ' + error,
            success: false,
        };
    }

}

export async function logout() {
    cookies().delete("token")
    cookies().delete("email")

    return { success: true };
}

export async function createUser(prevState: any, formData: FormData) {

    const user = {
        id: formData.get('id'),
        name: formData.get('name'),
        surname: formData.get('surname'),
        email: formData.get('email'),
        password: formData.get('password'),
        message: '',
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
            id: user.id,
            name: user.name,
            surname: user.surname,
            email: user.email,
            password: user.password,
            message: 'Erro ao criar usuário. ' + response.status,
        }
    } 

    return {
        success: true,
        id: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        message: 'Usuário criado com sucesso.',
    }

}

export async function getUser(id: number) {
    const token = cookies().get('token')?.value;

    if (!token) {
        return null;
    }

    const response = await fetch(`http://localhost:8080/users/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if (response.status === 403) {
        redirect('/')
    }
    
    const user = await response.json()
    return user
}

export async function updateUser(id: number, formData: FormData) {

    const user = {
        id: formData.get('id'),
        name: formData.get('name'),
        surname: formData.get('surname'),
        email: formData.get('email'),
        password: formData.get('password'),
        message: '',
    }

    const response = await fetch(`http://localhost:8080/users/${id}`, {
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
            id: user.id,
            name: json.find((error: any) => error.field === 'name')?.message,
            surname: json.find((error: any) => error.field === 'surname')?.message,
            email: json.find((error: any) => error.field === 'email')?.message,
            password: json.find((error: any) => error.field === 'password')?.message,
            message: 'Erro ao atualizar usuário. ' + response.status,
        }
    }

    return {
        success: true,
        id: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        message: 'Usuário atualizado com sucesso.',
    }
}

export async function deleteUser(id: number) {
    const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${cookies().get('token')?.value}`
        }
    })
    
    if (!response.ok) {
        const json = await response.json()
        return {
            success: false,
            id: json.id,
            name: json.name,
            surname: json.surname,
            email: json.email,
            password: json.password,
            message: 'Erro ao excluir usuário. ' + response.status,
        }
    }

    return {
        success: true,
        id: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        message: 'Usuário excluído com sucesso.',
    }
}
