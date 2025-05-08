"use client";

import { NavButton } from "@ui";
import { Menu } from "lucide-react";
import { useState } from "react";

export function MenuButton() {
	const [open, setOpen] = useState(false);



	return (
		<>
			<button onClick={() => setOpen(!open)}>
				<Menu />
			</button>

			<div className={
				`${open ? "flex" : "hidden"} z-10 fixed
				inset-0 flex-col items-center justify-center bg-white overflow-none
				uppercase text-4xl gap-8
			`}
			onClick={() => setOpen(false)}
			>
				<NavButton href="/">Главная</NavButton>
				<NavButton href="/brand">Бренды</NavButton>
				<NavButton href="/goods">Каталог</NavButton>
				<NavButton href="/services">Услуги</NavButton>
				{/* <NavButton href="/about">О сервисе</NavButton> */}
				<NavButton href="/brand/my" authorized>Мой бренд</NavButton>
				<NavButton href="/profile" authorized>Профиль</NavButton>
			</div>
		</>
	)
}