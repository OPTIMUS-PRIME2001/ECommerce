//Global imports
import { redirect } from "next/navigation";

//Local imports
import prisma from "@/lib/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser";
import { SettingsForm } from "./components/settingForm";


interface SettingPageProps {
    params: {
        storeId: string;
    }
}
const SettingPage: React.FC<SettingPageProps> = async ({
    params
}) => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        redirect('/signIn')
    }

    //To check the url's storeid if present inside datanase and if present then fetch it
    const store = await prisma.store.findFirst({
        where: {
            id: params.storeId,
            userId: currentUser.id,
        }
    })

    // If no store returned from database then redirect to storeModel page where we have to create the Modal
    if (!store) {
        redirect("/");
    }
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SettingsForm initialData={store}/>
            </div>
        </div>
    )
}

export default SettingPage;