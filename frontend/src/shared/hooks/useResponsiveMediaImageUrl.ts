"use client";

import { useCallback, useEffect, useState } from "react";
import { useApiUrl } from "./useApiUrl";
import apiFetch from "@utils/apiFetch";

interface MediaResponse {
	uuid_pc?: string;
	uuid_mobile?: string;
}

export function useResponsiveMediaImage(uuid?: string, force?: "pc" | "mobile") {
	const apiBase = useApiUrl();
	const [url, setUrl] = useState<string>();
	const [ready, setReady] = useState(false);

	function refresh() {
		const type = force ?? ((window.innerWidth >= 768) ? "pc" : "mobile");
		if(!uuid) return;

		apiFetch({
			endpoint: `/api/v1/media/sizes/${uuid}`,
			options: {
				method: "GET"
			},
			onSuccess: (res: Response) => {
				res.json().then((json: MediaResponse) => {
					let media_uuid = (type == "mobile") ? json.uuid_mobile : json.uuid_pc;
					if(!force && !media_uuid) {
						media_uuid = (type == "mobile") ? json.uuid_pc : json.uuid_mobile; // swap
					}
					if(!media_uuid) return;
					setUrl(`/api/v1/media/${media_uuid}`);
					setReady(true);
				});
			}
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