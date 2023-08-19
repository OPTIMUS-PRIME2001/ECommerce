'use client'
// Global imports
import { useEffect, useState } from 'react';


//Local imports
import { StoreModal } from '@/components/modals/storeModal';

export const ModalProvider = () => {
    // To ensure there will not be any Hydration errors with client components like Modals
    // Hydration Error like , for server there will not be any modal open and in client modal is open
    const [isMounted, setIsMounted] = useState(false);

    // We ensure that untill this lifecycle has run which is something that can happen in the client component 
    // we will return null
    useEffect(() => {
        setIsMounted(true);
    }, []);
    // if it is not mounted in server site rendering , I will return null , to avoid hydration error
    if (!isMounted) {
        return null;
    }

    return (
        <>
            <StoreModal />
        </>
    );
}