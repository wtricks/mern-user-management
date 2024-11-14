import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/auth',
            children: [
                {
                    path: 'signin',
                    name: 'signin',
                    component: () => import('../views/auth/SigninView.vue')
                },
                {
                    path: 'signup',
                    name: 'signup',
                    component: () => import('../views/auth/SignupView.vue')
                },
                {
                    path: 'forget-password',
                    name: 'forget-password',
                    component: () => import('../views/auth/forgetPasswordView.vue')
                },
                {
                    path: 'reset-password',
                    name: 'reset-password',
                    component: () => import('../views/auth/resetPasswordView.vue')
                },
                {
                    path: 'verify',
                    name: 'verify-token',
                    component: () => import('../views/auth/VerifyEmailView.vue')
                }
            ]
        },
        {
            path: '/users',
            children: [
                {
                    path: '',
                    name: 'users',
                    component: () => import('../views/UsersListView.vue')
                },
                {
                    path: ':id',
                    name: 'user',
                    component: () => import('../views/profile/ProfileEditView.vue')
                }
            ]
        },
        {
            path: '/profile',
            children: [
                {
                    path: '',
                    name: 'profile',
                    component: () => import('../views/profile/ProfileView.vue')
                },
                {
                    path: 'edit',
                    name: 'profile-edit',
                    component: () => import('../views/profile/ProfileEditView.vue')
                }
            ]
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('../views/NotFoundView.vue')
        }
    ]
})

export default router