"use client";

import { Fullscreen } from "lucide-react";
import { useResponsiveMediaImage } from "@hooks";
import { cn } from "@utils/cn";
import { useEffect } from "react";

interface MediaImageProps {
	media_uuid?: string;
	className?: string;
	onClick?: () => void;
	force?: "pc" | "mobile";
	refreshes?: number;
}

export function MediaImage({
	media_uuid, className, onClick, force, refreshes
}: Readonly<MediaImageProps>) {
	const { url, ready, refresh } = useResponsiveMediaImage(media_uuid, force);

	useEffect(() => {
		refresh();
	}, [refreshes])

	if(ready) {
		return (
			<button className={cn("w-full h-full relative", className)} onClick={onClick}>
				<img src={url + "?" + refreshes} alt="Logo" className="object-cover w-full aspect-square h-full"/>
			</button>
		)
	}
	return (
		<button className={cn("h-full w-full bg-gray-100 flex items-center justify-center", className)} onClick={onClick}>
			<Fullscreen width={50} height={50}/>
		</button>
	)
}