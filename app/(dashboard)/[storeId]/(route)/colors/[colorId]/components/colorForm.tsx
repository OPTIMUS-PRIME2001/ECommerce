"use client"

//icons
import { Trash } from "lucide-react"
// Global imports
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Color } from "@prisma/client"

// Local imports
//components
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Separator } from "@/components/ui/separator"
import Heading from "@/components/ui/Heading"
import { AlertModal } from "@/components/modals/alertModal"
import ImageUpload from "@/components/customUi/imageUpload"


// Formschema with zord validation
const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(4).regex(/^#/,{
        message: 'String must be a valid hex code',
    }),
});

// Type Specification
type ColorFormValues = z.infer<typeof formSchema>

interface ColorFormProps {
    initialData: Color | null;
};

export const ColorForm: React.FC<ColorFormProps> = ({
    initialData
}) => {
    const params = useParams();
    const router = useRouter();

    //State to handle dialog box openning of delete and loading after submission
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    // Some toggler variales between new color creation or existing color updation mode
    const title = initialData ? 'Edit color' : 'Create color';
    const description = initialData ? 'Edit a color.' : 'Add a new color';
    const toastMessage = initialData ? 'Color updated.' : 'Color created.';
    const action = initialData ? 'Save changes' : 'Create';

    const form = useForm<ColorFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: ''
        }
    });

    // Upload new Color details 
    const onSubmit = async (data: ColorFormValues) => {
        try {
            setLoading(true);
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, data);
            } else {
                await axios.post(`/api/${params.storeId}/colors`, data);
            }
            router.refresh();
            router.push(`/${params.storeId}/colors`);
            toast.success(toastMessage);
        } catch (error: any) {
            toast.error('Something went wrong.');
        } finally {
            setLoading(false);
        }
    };


    // Deletion of existing size
    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/colors/${params.sizeId}`);
            router.refresh();
            router.push(`/${params.storeId}/colors`);
            toast.success('Color deleted.');
        } catch (error: any) {
            toast.error('Make sure you removed all products using this color first.');
        } finally {
            setLoading(false);
            setOpen(false);
        }
    }

    return (
        <>
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex items-center justify-between">
                <Heading title={title} subtitle={description} />
                {initialData && (
                    <Button
                        disabled={loading}
                        variant="destructive"
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">                    
                    <div className="md:grid md:grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder="Color label" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-x-4">
                                            <Input disabled={loading} placeholder="Color Value" {...field} />
                                            <div
                                                className="border p-4 rounded-full"
                                                style={{ backgroundColor: field.value }}
                                            />
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} className="ml-auto" type="submit">
                        {action}
                    </Button>
                </form>
            </Form>
        </>
    );
};