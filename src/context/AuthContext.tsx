import React, { createContext, useContext, useState } from 'react';

interface User {
    id: number
    name: string
    email: string
    enterprise_id: number
    crew_role: string
    role_specific: RoleSpecific
}

export interface RoleSpecific {
    checks: Checks
    analytics: Analytics
    can_access: string[]
    current_sector: CurrentSector
    defects: Defects
}

export interface Checks { }

export interface Analytics { }

export interface CurrentSector { }

export interface Defects { }

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isLoggedIn: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

    const login = (userData: User) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    };

    const value = {
        user,
        login,
        logout,
        isLoggedIn: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within AuthProvider');
    return context;
};
