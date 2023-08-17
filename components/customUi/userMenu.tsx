'use client';
//icons
import { Settings } from "lucide-react";
import { LogOut } from "lucide-react";
import { User } from "@prisma/client";

// Global import
import { signOut } from "next-auth/react";

// Local imports
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserMenuProps {
    currentUser?: User | null;
}


export default function UserMenu({currentUser}: UserMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={currentUser?.image || '/avatars/01.png'} alt="@shadcn" />
                        <AvatarFallback className="bg-green-600  text-white ">SC</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-row space-x-2">
                        <Avatar className="h-8 w-8">
                            <AvatarImage src={currentUser?.image || '/avatars/01.png'} alt="@shadcn" />
                            <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">{currentUser?.name}</p>
                            <p className="text-xs leading-none text-muted-foreground">{currentUser?.email}</p>
                        </div>
                    </div>
                </DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuGroup className="text-neutral-700 my-5">
                    <DropdownMenuItem onClick={() => { }}>
                        <Settings className="mr-2 h-4 w-4" />
                        Manage Account
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={() => { signOut() }}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuGroup>

                <DropdownMenuSeparator />
                <div className="m-2 font-light text-neutral-400 text-xs">
                    Secured by @nextauth
                </div>                
            </DropdownMenuContent>
        </DropdownMenu>
    )
};