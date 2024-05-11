'use client'

import {useFormStatus} from "react-dom";
import {Button} from "@/components/ui/button";

export default function LogoutButton({ from }: { from: string }) {
    const { pending } = useFormStatus();
    return <Button className={'w-full whitespace-pre-line py-8'} disabled={pending}>
        {pending ? 'Logging out...' : `Log out from \n ${from}`}
    </Button>
}