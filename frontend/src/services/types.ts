export interface UserSignUpData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export interface UserSignInData {
    email: string;
    password: string;
}

export interface ForgetPasswordData {
    email: string;
}

export interface ResetPasswordData {
    token: string;
    password: string;
}

export interface VerifyTokenData {
    token: string;
}

export interface UserUpdateData {
    role?: 'admin' | 'user';
    avatar?: any; // Avatar could be a file or URL
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface GetAllUsersParams {
    search?: string;
    page?: number;
    limit?: number;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
}
