import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import { ExclusivityFooter, ExclusivityHeader } from "@widgets";




export const metadata: Metadata = {
	title: 'Exclusivity',
	description: 'Exclusivity',
};

const gilroy = localFont({
	src: [
		{
			path: '../shared/fonts/Gilroy/Gilroy-Light.otf',
			weight: '300',
			style: 'light',
		},
		{
			path: '../shared/fonts/Gilroy/Gilroy-Medium.ttf',
			weight: '500',
			style: 'medium',
		},
		{
			path: '../shared/fonts/Gilroy/Gilroy-ExtraBold.otf',
			weight: '700',
			style: 'extra-bold',
		},
	],
});

const grafita = localFont({
	src: [
		{
			path: '../shared/fonts/Grafita/Grafita Special.otf',
		},
	],
	variable: '--font-grafita',
});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body
				className={`${gilroy.className} font-light ${grafita.variable} antialiased
				max-w-screen w-screen overflow-x-hidden`}
			>
				<div className="flex flex-col items-center max-w-screen w-screen min-h-screen gap-8">
					<ExclusivityHeader/>
					<div className="flex flex-col grow w-full items-center gap-8">
						{children}
					</div>
					<ExclusivityFooter/>
				</div>
			</body>
		</html>
	);
}
