import { redirect } from 'next/navigation';

//Local imports
import Navbar from '@/components/navbar'
import prisma from '@/lib/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode
    params: { storeId: string }
}) {
    //get current User details
    const currentUser = await getCurrentUser();

    //We reconfirm
    //If currentUser not exists then we are not in session , redirect to signIn
    if (!currentUser) {
        redirect('/signIn');
    }

    // basically from root we get redirected to here means inside dashboard with a store id
    // get the first Store using params storeId and currentUser id
    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId,
            userId: currentUser.id,
        }
    });

    // if somehow store not exits in combination to currently logged in user
    // if store does not exist redirect to create a store
    if (!store) {
        redirect('/');
    };

    return (
        <>
            <Navbar currentUser={currentUser}/>
            {children}
        </>
    );
};
//1:52