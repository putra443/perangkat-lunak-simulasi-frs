import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import pool from '../../../../db';

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
                const client = await pool.connect();
                const resultAdmin = await client.query(`SELECT "idAdmin", username, password from admin 
                where "username"='${email}' and "password"='${password}'`)
                const resultMahasiswa = await client.query(`SELECT "idMahasiswa",username, password from mahasiswa
                where "username"='${email}' and "password"='${password}'`)
                // console.log(resultAdmin);
                // console.log(resultMahasiswa.rows[0].idMahasiswa);
                if(resultMahasiswa.rowCount!=0){
                    const user = {
                        id: resultMahasiswa.rows[0].idMahasiswa,
                        name: resultMahasiswa.rows[0].username,
                        email: resultMahasiswa.rows[0].username,
                        role: "mahasiswa",
                    }
                    console.log(user);
                    return user
                }else if(resultAdmin.rowCount!=0){
                    const user = {
                        id: resultAdmin.rows[0].idAdmin,
                        name: resultAdmin.rows[0].username,
                        email: resultAdmin.rows[0].username,
                        role: "admin",
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
                token.id = user.id
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
            if("id" in token) {
                session.user.id = token.id
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