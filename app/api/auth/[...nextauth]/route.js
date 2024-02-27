import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

const options = {
    session: {
        strategy: 'jwt',
    },
    secret:"thisissecret",
    providers: [
        Credentials({
            type:"credentials",
            name:"credentials",
            credentials:{
                email:{label:"email", type:"email"},
                password:{label:"password", type:"password"},
            },
            async authorize(credentials){
                const{email,password} = credentials
                if(email.includes("@student.unpar.ac.id") && password === "123"){
                    const user = {
                        id:1,
                        name: "123",
                        email: "123@gmail.com",
                        role: "mahasiswa",
                    }
                    return user
                }else if(email.includes("@lecturer.unpar.ac.id") && password ==="123"){
                    const user = {
                        id:2,
                        name: "123Lecturer",
                        email: "123@gmail.com",
                        role: "dosen",
                    }
                    return user
                }
                else{
                    return null
                }
            }
        })
    ],
    callbacks:{
        async jwt({token, account, profile, user}){
            if(account?.provider === "credentials"){
                token.email = user.email
                token.fullname = user.fullname
                token.role = user.role
            }
            return token
        },
        async session({session, token}){
            if("email" in token){
                session.user.email = token.email
            }
            if("fullname" in token){
                session.user.fullname = token.fullname
            }
            if("role" in token){
                session.user.role = token.role
            }
            return session
     }   
    },
    pages: {
        signIn:"/",
        signOut:"/"
    }
}

const handler = NextAuth(options)
export{
    handler as GET, handler as POST
}