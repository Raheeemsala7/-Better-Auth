"use client";

import { TrashIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useTransition } from "react";
import { tryCatch } from "@/hooks/tryCatch";
import { deleteUserAction } from "@/app/actions/delete-user";


interface IProps {
    userId: string;
}

export function DeleteButtonAction({ userId }: IProps) {
    const [isPending, startTransition] = useTransition();

    function handelClick() {
        startTransition(async () => {
            await tryCatch(deleteUserAction({ userId }));

        });
    }

    return (
        <Button size={"icon"} variant={"destructive"} className="size-7 rounded-sm" disabled={isPending} onClick={handelClick}>
            <span className="sr-only">Delete User</span>
            <TrashIcon className="size-4" />
        </Button>
    );
}

export function PlaceholderDeleteUserButton() {
    return (
        <Button size={"icon"} variant={"destructive"} className="size-7 rounded-sm" disabled>
            <span className="sr-only">Delete User</span>
            <TrashIcon className="size-4" />
        </Button>
    )
}