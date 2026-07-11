import TitleSection from "@/components/landing-page/title-section";
import appBanner from "../../public/appBanner.png";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const HomePage = () => {
    return (
        <section className="overflow-hidden px-4 sm:px-6 mt-10 sm:flex sm:flex-col gap-4 md:justify-center md:items-center">
            <TitleSection
                pill="Your Workspace, Perfected"
                title="All-In-One Collaboration and Productivity Platform"
            />
            <div className="bg-white p-0.5 mt-6 rounded-3xl bg-linear-to-r from-primary to-brand-primary-blue sm:w-75">
                <Button
                    variant="secondary"
                    className="w-full rounded-3xl p-6 text-2xl bg-background"
                >
                    Get Cypress Free
                </Button>
            </div>

            <div className="md:-mt-22.5 sm:w-full w-187.5 flex justify-center items-center -mt-10 relative sm:ml-0 -ml-12.5">
                <Image src={appBanner} alt="Application Banner" />
                <div className="bottom-0 top-[50%] bg-linear-to-t dark:from-background left-0 right-0 absolute z-10"></div>
            </div>
        </section>
    );
};

export default HomePage;
