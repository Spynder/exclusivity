"use client";

export function useApiUrl() {
	if (typeof window === "undefined") return;
	//if(typeof document.window === "undefined") return "";
	let url = new URL(`${window.location.origin}`);
	if(window.location.protocol === "http:") url.port = '8000';
	else url.port = '';
	return url.toString().slice(0, -1);
}