//Global imports
import { User } from "@prisma/client";
import { redirect } from "next/navigation";

// Local imports
import prisma from '@/lib/prismadb';
import { MainNav } from "@/components/customUi/mainNav";
import  UserMenu   from "@/components/customUi/userMenu";
import StoreSwitcher from "@/components/customUi/store-switcher";
import { ThemeModeToggle } from "@/components/customUi/themeToggler";


interface NavbarProps {
    currentUser?: User | null;
}

const Navbar: React.FC<NavbarProps> = async ({
    currentUser,
}) =>{
    if(!currentUser){
        redirect("/signIn");
    }

    // fetch all the stores belongs to current user
    const myStores = await prisma.store.findMany({
        where: {
            userId: currentUser.id,
        }
    })

    return(
        <div className=" border-b">
            <div className="h-16 flex items-center px-4">
                {/* Store Swtcher */}
                <StoreSwitcher items={myStores}/>
                {/* Navigation Tabs */}
                <MainNav className="mx-6"/>
                {/* User menu */}
                <div className="ml-auto flex items-center space-x-4 gap-3">
                    <UserMenu currentUser={currentUser}/>
                    <ThemeModeToggle />
                </div>
            </div>
        </div>
    )
}
export default Navbar;