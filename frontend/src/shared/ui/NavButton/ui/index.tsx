"use client";

import { getCookie } from "cookies-next/client";
import Link from "next/link";
import { usePathname, useSearchParams } from 'next/navigation';
import { ReactNode, useEffect, useState } from "react";

interface NavButtonProps {
	children: ReactNode;
	href?: string;
	authorized?: boolean
}

export function NavButton({
	children, href, authorized
}: Readonly<NavButtonProps>) {
	const [usedHref, setUsedHref] = useState(href ?? "/");
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		const accessToken = getCookie("access_token");
		if (!accessToken && authorized) {
			setUsedHref("/login");
		} else {
			setUsedHref(href ?? "/");
		}
	}, [pathname, searchParams]);


	return (
		<Link href={usedHref} className="uppercase text-nowrap">{children}</Link>
	)
}