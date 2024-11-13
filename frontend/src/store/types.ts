export interface User {
    _id: string
    firstName: string
    lastName: string
    email: string
    avatar: string
    active: 0 | 1 | 2,
    role: 'admin' | 'user',
    lastLogin: Date
    loginIp: string
    createdAt: Date
    updatedAt: Date
}