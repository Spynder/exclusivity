import { useApiUrl } from '@hooks';
import { getCookie, setCookie, deleteCookie } from 'cookies-next/client';

interface ApiFetchProps {
	endpoint: string;
	data?: object | FormData;
	options?: object;
	authorize?: boolean;
	onSuccess?: (res: Response) => void;
	onError?: (res?: Response) => void;

	// Отвечает за повторный вызов apiFetch после вызова /refresh ручки.
	// Создан для того, чтобы не создать бесконечный цикл рекурсивного вызова.
	_refreshed?: boolean;
}

export default async function apiFetch(props: ApiFetchProps) {
	const apiBase = useApiUrl();

	if (!props.endpoint.startsWith('/api/')) {
		throw new Error(`Endpoint should start with /api/ (${props.endpoint})`);
	}

	const isFormData = props.data instanceof FormData;

	const headers: HeadersInit = {
		...(!isFormData && {'Content-Type': 'application/json'}),
	};
	if(props.authorize) {
		const token = getCookie('access_token') ?? null;
		if (token) {
			headers.Authorization = `Bearer ${token}`;
		}
	}

	const defaultConfig: RequestInit = {
		method: 'POST',
		headers: headers,
	};

	// костыль
	const url = new URL(apiBase + props.endpoint);
	let endpoint = url.toString();
	

	const config: RequestInit = { ...defaultConfig, ...props.options };
	if (config.method?.toUpperCase() == 'GET' && props.data) {
		const params = new URLSearchParams(
			Object.fromEntries(Object.entries(props.data))
		).toString();
		endpoint += `?${params}`;
		delete config.body;
	} else if(isFormData) {
		config.body = props.data as FormData;
	} else{
		config.body = JSON.stringify(props.data);
	}

	try {
		const response = await fetch(endpoint, config);
		if (response.status === 401) {
			if(!props._refreshed && (await refreshTokens())) {
				return apiFetch({...props, _refreshed: true});
			}
			deleteCookie("access_token");
			deleteCookie("refresh_token");
			window.location.href = '/login';
			return;
		}
		if (response.ok) props.onSuccess?.(response);
		else props.onError?.(response);
	} catch {
		props.onError?.();
	}
}



interface LoginResponse {
	access_token: string;
	refresh_token: string;
	type: string;
}

export async function refreshTokens() {
	const refresh = getCookie('refresh_token');
	if(!refresh) return false;

	return new Promise<boolean>((resolve) => {
		async function onSuccess(res: Response) {
			const json = (await res.json()) as LoginResponse;
			setCookie('access_token', json.access_token);
			setCookie('refresh_token', json.refresh_token);
			resolve(true);
		}
	
		apiFetch({
			endpoint: "/api/v1/refresh",
			data: {
				refresh_token: refresh
			},
			onSuccess,
			onError: () => resolve(false),
			_refreshed: true
		});
	})
}