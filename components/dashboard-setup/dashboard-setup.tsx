"use client";
import { AuthUser } from "@supabase/supabase-js";
import React, { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { FieldValues, Form, useForm } from "react-hook-form";
import EmojiPicker from "../global/emoji-picker";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Subscription } from "@/utils/supabase/supabase-types";
import { CreateWorkspaceFormSchema } from "@/lib/types";
import { z } from "zod";
import { v4 } from "uuid";
interface DashboardSetupProps {
    user: AuthUser;
    subscription: Subscription | null;
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
    subscription,
    user,
}) => {
    const [selectedEmoji, setSelectedEmoji] = useState("💼");
    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting: isLoading, errors },
    } = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
        mode: "onChange",
        defaultValues: {
            workspaceLogo: "",
            workspaceName: "",
        },
    });

    const onSubmit:SumbitHandler<z.infer<typeof CreateWorkspaceFormSchema>> = async (value) =>{
        const file = value.worksapceLogo?.[0];
        let filePath = null;
        const workspaceUUID = v4();
    }

    return (
        <Card className="w-[800px] h-screen sm:h-auto">
            <CardHeader>
                <CardTitle>Create A Workspace</CardTitle>
                <CardDescription>
                    Lets create a private workspace to get you started. You can
                    add collaborators later from the workspace settings tab.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={() => {}}>
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="text-5xl">
                                <EmojiPicker
                                    getValue={(emoji) =>
                                        setSelectedEmoji(emoji)
                                    }
                                >
                                    {selectedEmoji}
                                </EmojiPicker>
                            </div>
                            <div className="w-full">
                                <Label
                                    htmlFor="workspaceLogo"
                                    className="text-sm text-muted-foreground mb-1 ml-2"
                                >
                                    Workspace Logo
                                </Label>
                                <Input
                                    id="workspaceLogo"
                                    type="file"
                                    accept="image/*"
                                    placeholder="Workspace Logo"
                                    className="bg-transparent"
                                    disabled={
                                        isLoading ||
                                        subscription?.status !== "active"
                                    }
                                    {...register("workspaceLogo", {
                                        required: "Workspace Logo is required",
                                    })}
                                />
                                <small className="text-red-600">
                                    {errors?.workspaceLogo?.message?.toString()}
                                </small>
                            </div>
                        </div>
                        <div className="">
                            <Label
                                htmlFor="workspaceName"
                                className="text-sm text-muted-foreground mb-1 ml-2"
                            >
                                Name
                            </Label>
                            <Input
                                id="workspaceName"
                                type="text"
                                placeholder="Workspace Name"
                                className="bg-transparent"
                                disabled={isLoading}
                                {...register("workspaceName", {
                                    required: "Workspace name is required",
                                })}
                            />
                            <small className="text-red-600">
                                {errors?.workspaceName?.message?.toString()}
                            </small>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default DashboardSetup;
