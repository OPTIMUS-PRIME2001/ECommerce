//Global imports
import { redirect } from 'next/navigation';

//Local imports
import prisma from '@/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export default async function SetupLayout({
    children
}:{
    children: React.ReactNode;
}){
    //get current User details
    const currentUser = await getCurrentUser();

    //If currentUser not exists then we are not in session , redirect to signIn
    if (!currentUser) {
        redirect('/signIn');
    };

    // we are loading the first store available with currently logged in user
    const store = await prisma.store.findFirst({
        where: {
            userId: currentUser.id,
        }
    });

    // if store exists redirect to /storeId which is inside (dashboard) 
    // which we incase direct fall into (dashboard)/[storeId]/layout
    if (store) {
        redirect(`/${store.id}`);
    };

    return(
        <>
            {children}
        </>
    )
}