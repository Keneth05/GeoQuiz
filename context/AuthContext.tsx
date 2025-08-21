import { Users } from "@/data/users";
import { AuthContextType, User } from "@/interfaces/LoginInfo.interface";
import { create } from 'zustand';

type AuthState = AuthContextType &{
    setLoading: (loading: boolean) => void;
    setUser: (user: User) => void;
}

export const useAuthentication = create<AuthState>((set) => ({
    user: null,
    loadingUser:false,

    setLoading: (loading) => set({ loadingUser: loading }),
    setUser: (user) => set({ user }),

    login: async(username: string, password: string) =>{
        set({loadingUser: true})
        try {
            const userFound = Users.find(user => user.userName === username && user.password === password)
            
            if(userFound){
                set({user: {userName: userFound.userName}, loadingUser: false})
                return true
            }
            else{
                return false
            }
        } finally{
            set({loadingUser: false})
        }
    },

    logout: () => set({user: null}),

}))
    
