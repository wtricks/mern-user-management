import api from "../utils/api";
import { ForgetPasswordData, GetAllUsersParams, ResetPasswordData, UserSignInData, UserSignUpData, UserUpdateData, VerifyTokenData } from "./types";

// handle Sign Up
export const signUp = (data: UserSignUpData) => {
    return api.post('/users/signup', data);
};

// handle Sign In
export const signIn = (data: UserSignInData) => {
    return api.post('/users/signin', data);
};

// handle Forget Password
export const forgetPassword = (data: ForgetPasswordData) => {
    return api.post('/users/forget-password', data);
};

// handle Reset Password
export const resetPassword = (data: ResetPasswordData) => {
    return api.post('/users/reset-password', data);
};

// handle Verify Token
export const verifyToken = (data: VerifyTokenData) => {
    return api.post('/users/verify-token', data);
};

// get current user information (Me)
export const getMe = () => {
    return api.get('/users/me');
};

// get all users (Admin only)
export const getAllUsers = (params: GetAllUsersParams) => {
    const queryParams = new URLSearchParams(params as Record<string, string>).toString();
    return api.get(`/users/`, { params: queryParams });
};

// get a user by ID (Admin only)
export const getUserById = (id: string) => {
    return api.get(`/users/${id}`);
};

// update a user
export const updateUser = (id: string, data: UserUpdateData) => {
    return api.put(`/users/${id}`, data);
};

// delete a user (Admin only)
export const deleteUser = (id: string) => {
    return api.delete(`/users/${id}`);
};