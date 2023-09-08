'use client';

// Global imports
import React from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

// Local imports
import { cn } from "@/lib/utils";
import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";



export function MainNav({
    className,
    ...props
}: React.HTMLAttributes<HTMLElement>) {
    const pathname = usePathname();
    const params = useParams();

    // Details of Nav bar Routings
    const routes = [
        {
            href: `/${params.storeId}`,
            label: 'Overview',
            active: pathname === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/billboards`,
            label: 'Billboards',
            active: pathname === `/${params.storeId}/billboards`
        },
        {
            href: `/${params.storeId}/categories`,
            label: 'Categories',
            active: pathname === `/${params.storeId}/categories`
        },
        {
            href: `/${params.storeId}/sizes`,
            label: 'Sizes',
            active: pathname === `/${params.storeId}/sizes`
        },
        {
            href: `/${params.storeId}/colors`,
            label: 'Colors',
            active: pathname === `/${params.storeId}/colors`
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`
        }
    ];

    return (
        // It is used to merge the className we passed alomg with classname we include here : cn provided by shadcn ui
        <NavigationMenu>
            <NavigationMenuList>
                <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
                    {routes.map((route) => ( 
                        //added key to NavigationMenuItem
                        <NavigationMenuItem key={route.href}>
                        <Link
                            key={route.href}
                            href={route.href}
                            legacyBehavior passHref
                            className={cn("text-sm font-medium transition-colors hover:text-primary",
                                route.active ? "text-black dark:text-white":"text-muted-foreground"
                            )}
                        >
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                {route.label}
                            </NavigationMenuLink>

                        </Link>
                    </NavigationMenuItem>
                    ))}
                </nav>
            </NavigationMenuList>
        </NavigationMenu>
    )
}