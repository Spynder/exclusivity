'use client';

import { LoadingState } from '@shared/enums';
import apiFetch from '@utils/apiFetch';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export function useApi<T>(endpoint: string, options?: {params?: object, authorize?: boolean}) {
	// Not using client-only loading will cause hydration errors.
	// I spent few hours on this bullshit, but if there is a better solution please lmk.
	const [isClient, setIsClient] = useState(false);
	useEffect(() => {setIsClient(true)}, []);

	let loadingState: LoadingState = "Success";

	// addition for correct serialization in localStorage memory.
	const getString = options?.params ?
	new URLSearchParams(
		Object.fromEntries(Object.entries(options?.params))
	).toString()
	: "";
	
	const swr = useSWR(endpoint+getString, () => {
		return new Promise((resolve, reject) => {
			apiFetch({
				endpoint,
				options: {method: "GET"},
				data: options?.params,
				authorize: options?.authorize ?? true,
				onSuccess: async (res: Response) => {
					try {
						const json = await res.json();
						resolve(json);
					} catch (error) {
						reject(error);
					}
				},
				onError: (res?: Response) => {
					reject(res || new Error('Request failed'));
				}
			});
		})
	});

	if(swr.error) loadingState = "Error";
	else if(swr.isLoading || !isClient) loadingState = "Loading";
	
	return {
		data: swr.data as T | undefined,
		loadingState,
		mutate: swr.mutate,
	}
}

