'use client';

// Global imports
import { useEffect, useState } from "react";

// Local imports
//Components
import { Modal } from "@/components/customUi/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps{
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(()=>{
        setIsMounted(true);
    },[]);

    if (!isMounted) {
        return null;
    }
    return(
        <Modal 
            title="Are You Sure" 
            description="This action cannot be reverted. This will permanently delete your store" 
            isOpen={isOpen} 
            onClose={onClose}>
                <div className="pt-6 space-x-3 flex items-center justify-end">
                    <Button disabled={loading} variant="outline" onClick={onClose}>
                        Cancel
                    </Button>
                    <Button disabled={loading} variant="destructive" onClick={onConfirm}>
                        Continue
                    </Button>
                </div>
        </Modal>
    )
}