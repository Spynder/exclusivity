import { NavButton } from "@ui";
import Image from "next/image";
import Link from "next/link";

export function ExclusivityFooter() {
	return (
		<footer className="w-full md:container min-h-45 bg-foreground text-white flex flex-col gap-8 p-4 md:p-10 md:mb-10">
			<div className="w-full flex flex-col md:flex-row min-h-8 justify-start gap-4">
				<div>
					<Image
						src="/logo.svg"
						alt="logo"
						width={0}
						height={0}
						style={{ width: 'auto', height: '100%' }}
						className="filter invert w-min"
					/>
				</div>
				<div className="flex flex-row flex-wrap ms-auto space-x-4 items-center">
					<NavButton href="/">Главная</NavButton>
					<NavButton href="/brand">Бренды</NavButton>
					<NavButton href="/goods">Каталог</NavButton>
					<NavButton href="/services">Услуги</NavButton>
					{/* <NavButton href="/about">О сервисе</NavButton> */}
					<NavButton href="/brand/my" authorized>Мой бренд</NavButton>
					<NavButton href="/profile" authorized>Профиль</NavButton>
				</div>
			</div>
			<div className="w-full text-sm md:text-base flex flex-col md:flex-row justify-between min-h-8 text-gray-400 uppercase gap-4">
				<div className="flex flex-col gap-2">
					<Link href="/">Политика конфиденциальности</Link>
					<Link href="/">Пользовательское соглашение</Link>
				</div>
				<div className="flex flex-col gap-2 md:items-end">
					<Link href="/">Почта: <span className="text-white">aleksandrignatovsckiy@gmail.com</span></Link>
					<Link href="/">Tg: <span className="text-white">@ignatovi4</span></Link>
				</div>
			</div>
		</footer>
	)
}
