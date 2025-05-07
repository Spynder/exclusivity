"use client";

import apiFetch from "@utils/apiFetch";
import { useEffect, useState } from "react";

export function useReferringMedia(media_uuid_hook?: string) {
	const [media, setMedia] = useState<string[]>();

	function onSuccess(res: Response) {
		res.json().then((json: string[]) => {
			setMedia(json);
		})
	}

	function refresh() {
		if(!media_uuid_hook) return;
		apiFetch({
			endpoint: `/api/v1/media/referring/${media_uuid_hook}`,
			options: {
				method: "GET"
			},
			onSuccess
		});
	}

	useEffect(() => refresh(), [media_uuid_hook]);

	return {media, setMedia, refresh};
}