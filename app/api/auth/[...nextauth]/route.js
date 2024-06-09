import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from 'next-auth/providers/google'
// import pool, { loginWithGoogle } from '../../../../db';
import {query} from '@/db'

const options = {
    session: {
        strategy: 'jwt',
    },
    secret:process.env.NEXTAUTH_SECRET,
    providers: [
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
                }
                // const client = await pool.connect()
                const result =  await query(`SELECT * FROM "user" WHERE email='${data.email}'`)
                // console.log(result);
                if(result.rowCount!=1){
                    if(data.email.includes("@student.unpar.ac.id") && data.email.includes("618")){
                        console.log("login pass");
                        console.log(data.email);
                        query(`insert into "user" (email, fullname, role) values ('${data.email}','${data.fullname}','Mahasiswa')`)
                        const resultId = await query(`select * from "user" where email='${data.email}'`)
                        // console.log(resultId);
                        token.email = resultId.rows[0].email
                        token.fullname = resultId.rows[0].fullname
                        token.role = resultId.rows[0].role
                        token.id = resultId.rows[0].idUser
                    }
                    else{
                        return null
                    } 
                }
                if(result.rowCount==1){
                    // console.log(result);
                    if(result.rows[0].role=="Admin" && (result.rows[0].fullname=="" || result.rows[0].fullname!= data.fullname)){
                        query(`UPDATE "user" set fullname = '${data.fullname}' where email = '${data.email}'`)
                        const resultUpdate =  await query(`select * from "user" where email='${data.email}'`)
                        token.email = resultUpdate.rows[0].email
                        token.fullname = resultUpdate.rows[0].fullname
                        token.role = resultUpdate.rows[0].role
                        token.id = resultUpdate.rows[0].idUser
                    }
                    else{
                        token.email = result.rows[0].email
                        token.fullname = result.rows[0].fullname
                        token.role = result.rows[0].role
                        token.id = result.rows[0].idUser
                    }
                }
                
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