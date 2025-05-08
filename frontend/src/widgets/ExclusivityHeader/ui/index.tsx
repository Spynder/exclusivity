
import { NavButton } from "@ui"
import Image from "next/image"

export function ExclusivityHeader() {
	return (
		<header className="container mt-8 justify-between text-center flex h-8 items-center border-b py-8">
			<div className="flex space-x-4 grow basis-0">
				<NavButton href="/">Главная</NavButton>
				<NavButton href="/brand">Бренды</NavButton>
				<NavButton href="/goods">Каталог</NavButton>
				<NavButton href="/services">Услуги</NavButton>
			</div>
			<Image
				src="/logo.svg"
				alt="logo"
				width={5}
				height={10}
				className="grow basis-0 h-8"
			/>
			<div className="flex space-x-4 grow basis-0 justify-end">
				<NavButton href="/about">О сервисе</NavButton>
				<NavButton href="/brand/my" authorized>Мой бренд</NavButton>
				<NavButton href="/profile" authorized>Профиль</NavButton>
			</div>

		</header>
	)
}
	

