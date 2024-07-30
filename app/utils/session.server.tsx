import { createCookieSessionStorage } from "@remix-run/node";
import { createThemeSessionResolver } from "remix-themes";

const sessionStorage = createCookieSessionStorage({
    cookie:{
        name: "__remix-themes",
        domain: process.env.NODE_ENV !== "development" ? "asdas": undefined,
        path:"/",
        httpOnly:true,
        sameSite:"lax",
        secrets:["secrets"],
        secure: process.env.NODE_ENV === "development"? false: true,

    }
});

export const themeSessionResolver = createThemeSessionResolver(sessionStorage);