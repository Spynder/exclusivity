import { NavButton } from "@ui"
import { Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { MenuButton } from "./MenuButton"

export function ExclusivityHeader() {
	return (
		<header className="w-full text-center mt-8">
			<div className="mx-auto hidden md:container border-b py-4 md:flex items-center justify-between ">
				<div className="flex space-x-4 grow basis-0">
					<NavButton href="/">Главная</NavButton>
					<NavButton href="/brand">Бренды</NavButton>
					<NavButton href="/goods">Каталог</NavButton>
					<NavButton href="/services">Услуги</NavButton>
				</div>
				<Link href="/" className="grow basis-0 h-8 relative">
					<Image
						src="/logo.svg"
						alt="logo"
						fill
					/>
				</Link>
				<div className="flex space-x-4 grow basis-0 justify-end">
					{/* <NavButton href="/about">О сервисе</NavButton> */}
					<NavButton href="/brand/my" authorized>Мой бренд</NavButton>
					<NavButton href="/profile" authorized>Профиль</NavButton>
				</div>
			</div>
			<div className="container flex md:hidden w-screen justify-between">
				<div className="border-b flex justify-between w-full py-4">
				<Link href="/" className="h-6">
					<Image
						src="/logo.svg"
						alt="logo"
						height={0}
						width={0}
						style={{ width: 'auto', height: '100%' }}
					/>
				</Link>

				<MenuButton />

				</div>
			</div>
		</header>
	)
}
