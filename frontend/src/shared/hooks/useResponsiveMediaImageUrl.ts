"use client";

import { useCallback, useEffect, useState } from "react";
import { useApiUrl } from "./useApiUrl";
import apiFetch from "@utils/apiFetch";

export function useResponsiveMediaImage(uuid?: string, force?: "pc" | "mobile") {
	const apiBase = useApiUrl();
	const [url, setUrl] = useState<string>();
	const [ready, setReady] = useState(false);

	function refresh() {
		const type = force ?? ((window.innerWidth >= 768) ? "pc" : "mobile");
		const newUrl = `/api/v1/media/${type}${force ? "-only" : ""}/${uuid}`;
		setUrl(newUrl);
		apiFetch({
			endpoint: newUrl + "?" + Math.floor(Math.random()*10000),
			options: {
				method: "GET"
			},
			onSuccess: () => setReady(true),
		});
		setReady(false);
	}

	useEffect(() => {
		refresh();
	
		window.addEventListener('resize', refresh);
	
		return () => {
			window.removeEventListener('resize', refresh);
		};
	}, [apiBase, uuid, force]);

	return {url: `${apiBase}${url}`, refresh, ready};
}