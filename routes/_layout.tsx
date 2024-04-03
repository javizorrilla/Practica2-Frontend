import { FreshContext } from "$fresh/server.ts";
import Footer from "../components/Footer.tsx";


const Layout = async (req: Request, ctx: FreshContext) => {
    const Component = ctx.Component;
    return (
        <>
            <Component/>
            <Footer/>
        </>
    )
}

export default Layout;