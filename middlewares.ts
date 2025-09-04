import NextAuth from "next-auth";

import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrifix,
  privateRoute,
  publicRoute,
} from "./routes";

import authConfig from "./auth.config";

const {auth} = NextAuth(authConfig)

export default auth((req)=>{
    const {nextUrl} = req;
    const isloggedIn = !!req.auth

    const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrifix)
    const isPrivateRoute = privateRoute.includes(nextUrl.pathname)
    const isPublicRoute = publicRoute.includes(nextUrl.pathname)

    if(isApiRoute){
        return null
    }

})