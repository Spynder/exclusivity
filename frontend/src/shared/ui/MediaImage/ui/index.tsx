"use client";

import { Fullscreen } from "lucide-react";
import { useApiUrl } from "@hooks";
import { cn } from "@utils/cn";

interface MediaImageProps {
	media_uuid?: string;
	className?: string;
	onClick?: () => void;
}

export function MediaImage({
	media_uuid, className, onClick
}: Readonly<MediaImageProps>) {
	const apiBase = useApiUrl();

	if(media_uuid) {
		return (
			<button className={cn("w-full h-full relative", className)} onClick={onClick}>
				<img src={`${apiBase}/api/v1/media/${media_uuid}`} alt="Logo" className="object-cover w-full aspect-square h-full" />
			</button>
		)
	}
	return (
		<button className={cn("h-full w-full bg-gray-100 flex items-center justify-center", className)} onClick={onClick}>
			<Fullscreen width={50} height={50}/>
		</button>
	)
}