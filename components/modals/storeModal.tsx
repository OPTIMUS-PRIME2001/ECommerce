'use client'

import * as z from "zod"
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

//Local imports
import { Modal } from "@/components/customUi/modal";
import { useStoreModal } from "@/hooks/useStoreModal";
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

const formSchema = z.object({
    name: z.string().min(1),
});

export const StoreModal = () => {
    const sModal = useStoreModal();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // useForn function to register inputs and set default values provided by react-hook-form
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    });

    // OnSubmit function triggers only when create button clicked
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values)
        try {
            setLoading(true);
            const response = await axios.post('/api/stores', values);
            toast.success("Store Created");
            // A complete refresh on our page and set router to particular route 
            // Better solution than router from next/navigation.
            window.location.assign(`/${response.data.id}`)
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Create store"
            description="Add a new store to manage products and categories."
            isOpen={sModal.isOpen}
            onClose={sModal.onClose}
        >
            <div>
                <div className="space-y-4 py-2 pb-4">
                    <div className="space-y-2">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Name</FormLabel>
                                            <FormControl>
                                                <Input disabled={loading} placeholder="E-Commerce" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                                    <Button
                                        disabled={loading}
                                        variant="outline"
                                        onClick={sModal.onClose}>
                                        Cancel
                                    </Button>

                                    <Button disabled={loading} type="submit">Continue</Button>
                                {/* onClick={()=>{signOut()} */}
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </Modal>
    );
};