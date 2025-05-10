"use client";

import { TextInput } from "@ui";

export function InvitationBanner({children}: Readonly<{children: string}>) {
	return (
		<div className="md:container min-h-60 bg-foreground text-white my-10 p-4 md:p-10 flex flex-col md:flex-row justify-between gap-4 md:gap-0">
			<div className="flex flex-col gap-4 justify-between">
				<h1 className="uppercase text-3xl font-grafita">{children}</h1>
				<form className="flex flex-col justify-between grow gap-4">
					<TextInput placeholder="Ваше имя" dark />
					<div className="flex gap-4">
						<TextInput placeholder="Telegram" dark />
						<button type="submit" onClick={() => {}}
							className="bg-primary px-4 py-2 bg-white text-foreground cursor-pointer"
						>
							Отправить
						</button>
					</div>
				</form>
			</div>
			<div className="flex flex-col uppercase text-center font-grafita grow opacity-20">
				<p className="text-[35px] md:text-[70px] leading-15 md:leading-22">Стань частью</p>
				<p className="text-[50px] md:text-[85px] leading-15 md:leading-22">Exclusivity</p>
			</div>
		</div>
	)
}
