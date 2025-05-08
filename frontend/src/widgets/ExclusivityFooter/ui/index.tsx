import { NavButton } from "@ui";
import Image from "next/image";
import Link from "next/link";

export function ExclusivityFooter() {
	return (
		<footer className="container h-45 bg-foreground text-white flex flex-col space-y-8 p-10 mb-8">
			<div className="w-full flex flex-row h-8">
				<Image
					src="/logo.svg"
					alt="logo"
					width={200}
					height={32}
					className="h-8 w-auto filter invert"
				/>
				<div className="flex flex-row ms-auto space-x-4 items-center">
					<NavButton href="/">Главная</NavButton>
					<NavButton href="/brand">Бренды</NavButton>
					<NavButton href="/goods">Каталог</NavButton>
					<NavButton href="/services">Услуги</NavButton>
					<NavButton href="/about">О сервисе</NavButton>
					<NavButton href="/brand/my" authorized>Мой бренд</NavButton>
					<NavButton href="/profile" authorized>Профиль</NavButton>
				</div>
			</div>
			<div className="w-full flex flex-row justify-between h-8 text-gray-400 uppercase">
				<div className="flex flex-col space-y-2">
					<Link href="/">Политика конфиденциальности</Link>
					<Link href="/">Пользовательское соглашение</Link>
				</div>
				<div className="flex flex-col space-y-2 items-end">
					<Link href="/">Почта: <span className="text-white">aleksandrignatovsckiy@gmail.com</span></Link>
					<Link href="/">Tg: <span className="text-white">@ignatovi4</span></Link>
				</div>
			</div>
		</footer>
	)
}
