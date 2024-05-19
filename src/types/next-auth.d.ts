import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            fullName: string;
            phone: number;
            email: string;
            password: string;
            dateOfBirth: string;
            role: string;
            image: string;
            enabled: boolean;
            username: string;
            access_cookie: string;
            refresh_cookie: string;
        };
    }
}