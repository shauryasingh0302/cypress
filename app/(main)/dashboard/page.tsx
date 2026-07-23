import db from "@/lib/db/db";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import DashboardSetup from "@/components/dashboard-setup/dashboard-setup";
import { getUserSubscriptionStatus } from "@/utils/supabase/queries";
import { createClient } from "@/utils/supabase/server";

const DashboardPage = async () => {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const workspace = await db.query.workspaces.findFirst({
        where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
    });

    const { data: subscription, error: subscriptionError } =
        await getUserSubscriptionStatus(user.id);

    if (subscriptionError) return;

    if (!workspace)
        return (
            <div className="bg-background h-screen w-screen flex justify-center items-center">
                <DashboardSetup user={user} subscription={subscription} />
            </div>
        );

    redirect(`/dashboard/${workspace.id}`);
};

export default DashboardPage;
