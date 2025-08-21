export interface User{
    userName:string;
    password?:string;
}

export interface AuthContextType{
    user: User | null;
    loadingUser:boolean;
    login:(username:string, password:string) => Promise<boolean>;
    logout: () => void;
}