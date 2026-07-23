import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function GET(req: NextRequest) {
    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
        const cookieStore = await cookies();
        const supabase = createClient(cookieStore);
        await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}
