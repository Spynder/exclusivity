"use client";

export function useApiUrl() {
	if (typeof window === "undefined") return;
	//if(typeof document.window === "undefined") return "";
	let url = new URL(`${window.location.origin}`);
	url.port = '';
	return url.toString().slice(0, -1);
}