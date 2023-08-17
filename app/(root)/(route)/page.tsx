'use client';

import { useEffect } from "react";

import { useStoreModal } from "@/hooks/useStoreModal";

const RootPage = () => {
    // States to control isOpen and onOpen attribute provided by storeModal Hook
    const onOpen = useStoreModal((state)=> state.onOpen );
    const isOpen = useStoreModal((state)=> state.isOpen );
   
    // Trigger our Create Store Modal
    useEffect(()=>{
        if(!isOpen){
            onOpen(); // if not open then open it
        }
    },[isOpen , onOpen]);
    
    // I only want this root page to trigger the model
    return null;
    //(
    //     <div className='p-4'>
    //         Root Page
    //     </div>
    // )
}
export default RootPage; 