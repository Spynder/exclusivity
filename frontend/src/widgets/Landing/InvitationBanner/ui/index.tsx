"use client";

import { TextInput } from "@ui";

export function InvitationBanner() {
	return (
		<div className="container h-60 bg-foreground text-white my-10 p-10 flex justify-between">
			<div className="flex flex-col gap-4">
				<h1 className="uppercase text-3xl font-grafita">Хотите видеть ваш бренд в нашем каталоге</h1>
				<form className="flex flex-col gap-4">
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
				<p className="text-[70px] leading-22">Стань частью</p>
				<p className="text-[85px] leading-22">Exclusivity</p>
			</div>
		</div>
	)
}
