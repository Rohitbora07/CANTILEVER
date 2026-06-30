import { create } from "zustand"


const userAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,

    setUser: (user) =>
        set({
            user,
            isAuthenticated: true
        }),
    logout: () =>
        set({
            user: null,
            isAuthenticated: false,
        })
}))

export default userAuthStore