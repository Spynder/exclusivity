"use client";

import { useEffect, useState } from "react";
import { useApiUrl } from "./useApiUrl";

export function useResponsiveMediaImage(uuid?: string, force?: "pc" | "mobile") {
	const apiBase = useApiUrl();
	const [url, setUrl] = useState<string>();

	function refresh() {
		const type = force ?? ((window.innerWidth >= 768) ? "pc" : "mobile");
		setUrl(`${apiBase}/api/v1/media/${type}${force ? "-only" : ""}/${uuid}`);
	}

	useEffect(() => {
		refresh();
	
		window.addEventListener('resize', refresh);
	
		return () => {
			window.removeEventListener('resize', refresh);
		};
	}, [apiBase, uuid, force]);

	return {url, refresh};
}