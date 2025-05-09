"use client";

import { useEffect, useState } from "react";
import { useApiUrl } from "./useApiUrl";

export function useResponsiveMediaImage(uuid?: string) {
	const apiBase = useApiUrl();
	const [url, setUrl] = useState<string>();

	useEffect(() => {
		const handleResize = () => {
			const type = (window.innerWidth >= 768) ? "pc" : "mobile";
			setUrl(`${apiBase}/api/v1/media/${type}/${uuid}`);
		};
	
		handleResize();
	
		window.addEventListener('resize', handleResize);
	
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, [apiBase, uuid]);

	return url;
}