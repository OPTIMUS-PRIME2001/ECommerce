import prisma from "@/lib/prismadb";

interface DashboardPageProps{
    params: {storeId: string}
};

const DashboardPage:React.FC<DashboardPageProps> = async ({
    params
}) =>{
    //get the store details from storeId
    const store = await prisma.store.findFirst({
        where:{
            id: params.storeId
        }
    })

    return(
        <div> Active Store: {store?.name}</div>
    )

}
export default DashboardPage;