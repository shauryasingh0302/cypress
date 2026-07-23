import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/middleware";

export async function proxy(req: NextRequest) {
    const { supabase, response: res } = createClient(req);

    const {
        data: { session },
    } = await supabase.auth.getSession();

    if (req.nextUrl.pathname.startsWith("/dashboard")) {
        if (!session) {
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }

    const emailLinkError = "Email link is invalid or has expired";
    
    if (
        req.nextUrl.searchParams.get("error_description") === emailLinkError &&
        req.nextUrl.pathname !== "/signup"
    ) {
        return NextResponse.redirect(
            new URL(
                `/signup?error_description=${req.nextUrl.searchParams.get(
                    "error_description",
                )}`,
                req.url,
            ),
        );
    }

    if (["/login", "/signup"].includes(req.nextUrl.pathname)) {
        if (session) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }
    }

    return res;
}
