'use client';

//icons
import { Trash } from "lucide-react";

// Global imports
import { useState } from "react";
import * as z from "zod";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useParams, useRouter } from "next/navigation";

// Local imports
//Type
import { Store } from "@prisma/client";
// Components
import Heading from "@/components/ui/Heading";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from '@/components/ui/form';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertModal } from "@/components/modals/alert-modal";
import { ApiAlert } from "@/components/customUi/apiAlert";
import { useOrigin } from "@/hooks/use-origin";




interface SettingFormProps {
    initialData: Store;
}

const formSchema = z.object({
    name: z.string().min(2),
});

// type SettingFormValues = z.infer<typeof formSchema>;

export const SettingsForm: React.FC<SettingFormProps> = ({
    initialData,
}) => {
    const params = useParams();
    const router = useRouter();
    const origin = useOrigin();

    const [open , setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (data:z.infer<typeof formSchema>) => {
        try {
            setLoading(true);
            await axios.patch(`/api/stores/${params.storeId}`,data);
            router.refresh();
            toast.success("Store updated!");
        } catch (error) {
            toast.error("Something Went Wrong.");
        } 
        finally{
            setLoading(false);
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/stores/${params.storeId}`);
            router.refresh();
            router.push("/");
            toast.success("Store deleted Successfully");
        } catch (error) {
            toast.error("Make Sure you removed all products and categories first");
        } 
        finally{
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal isOpen={open} onClose={()=>setOpen(false)}
                loading={loading} onConfirm={onDelete}
            />
            <div className="flex items-center justify-between">
                <Heading
                    title="Settings"
                    subtitle="Manage Store preference"
                />
                <Button size="icon" className="bg-red-600 dark:bg-red-600 hover:dark:bg-red-700 hover:bg-red-700"
                    disabled={loading} onClick={() => setOpen(true)}
                >
                    <Trash className="h-4 w-4 text-white" />
                </Button>
            </div>
            <Separator/>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-full"
                >
                    <div className="grid grid-cols-3 gap-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input disabled={loading} placeholder="Store name"  {...field}/>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        Save Changes
                    </Button>
                </form>
            </Form>
            <Separator/>
            <ApiAlert title="NEXT_PUBLIC_API_URL" 
            description={`${origin}/api/${params.storeId}`}
            variant={"public"} />
        </>
    )
};