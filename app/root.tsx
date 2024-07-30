import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";


import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import stylesheet from "~/tailwind.css?url";
import { themeSessionResolver } from "./utils/session.server";
import { PreventFlashOnWrongTheme, ThemeProvider, useTheme } from "remix-themes";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesheet },
];

export async function loader({request}: LoaderFunctionArgs){
  const {getTheme} = await themeSessionResolver(request);

  return {
    theme: getTheme(),
  }
}

export default function AppwithProvider(){
  const {theme} = useLoaderData<typeof loader>();
  return (
    <ThemeProvider specifiedTheme={theme} themeAction="/action/set-theme">
      <App/>
    </ThemeProvider>
  )
}

export function Layout({ children }: { children: React.ReactNode }) {
  const {theme} = useLoaderData<typeof loader>();
  const themeX = useTheme();
  return (
    <html lang="en" data-theme={themeX?? ""}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <PreventFlashOnWrongTheme ssrTheme={Boolean(theme)}/>
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === 'development' && <LiveReload/>}
      </body>
    </html>
  );
}

function App() {
  return <Outlet />;
}
