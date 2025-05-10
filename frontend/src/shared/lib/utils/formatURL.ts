export function formatURL(url: string): string {
	if (/^https?:\/\//i.test(url)) {
	  return url;
	}
	
	if (url.startsWith("//")) {
	  return 'https:' + url;
	}
	
	return 'https://' + url;
}
