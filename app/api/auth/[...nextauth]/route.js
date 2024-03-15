import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
import pool, { loginWithGoogle } from '../../../../db';

const options = {
    session: {
        strategy: 'jwt',
    },
    secret:process.env.NEXTAUTH_SECRET,
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
                client.release()
                if(resultMahasiswa.rowCount!=0){
                    const user = {
                        id: resultMahasiswa.rows[0].idMahasiswa,
                        name: resultMahasiswa.rows[0].username,
                        email: resultMahasiswa.rows[0].username,
                        role: "mahasiswa",
                    }
                    // console.log(user);
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
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_OAUTH_CLIENT_ID || "",
            clientSecret:process.env.GOOGLE_OAUTH_CLIENT_SECRET ||"",
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
            if(account?.provider === "google"){
                const data = {
                    fullname: user.name,
                    email: user.email,
                    type: 'google',
                    role:'mahasiswa'
                }
                const client = await pool.connect()
                const result =  await client.query(`SELECT * FROM mahasiswa WHERE username='${data.email}'`)
                if(result.rowCount!=1){
                    if(data.email.includes("@student.unpar.ac.id")){
                        console.log("login pass");
                        client.query(`insert into mahasiswa (username) values ('${data.email}')`)
                        token.email = data.email
                        token.fullname = data.fullname
                        token.role = data.role
                        const resultId = client.query(`select * from mahasiswa where username='${data.email}'`)
                        token.id = resultId.rows[0].idMahasiswa
                    }
                    else{
                        return null
                    } 
                }
                if(result.rowCount==1){
                    token.email = data.email
                    token.fullname = data.fullname
                    token.role = data.role
                    token.id = result.rows[0].idMahasiswa
                }
            }
            // console.log(token);
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
            // console.log(session);
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