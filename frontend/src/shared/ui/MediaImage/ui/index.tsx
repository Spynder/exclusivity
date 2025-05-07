import { Fullscreen } from "lucide-react";
import { useApiUrl } from "@hooks";
import { cn } from "@utils/cn";

interface MediaImageProps {
	media_uuid?: string;
	className?: string;
}

export function MediaImage({
	media_uuid, className
}: Readonly<MediaImageProps>) {
	const apiBase = useApiUrl();
	
	if(media_uuid) {
		return (
			<div className={cn("h-full relative", className)}>
				<img src={`${apiBase}/api/v1/media/${media_uuid}`} alt="Logo" className="object-cover w-full h-full" />
			</div>
		)
	}
	return (
		<div className={cn("h-full bg-gray-100 flex items-center justify-center", className)}>
			<Fullscreen width={50} height={50}/>
		</div>
	)
}