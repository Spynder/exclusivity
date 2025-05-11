import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	light?: boolean
}

export function Button({
	light, children, className, ...props
}: Readonly<ButtonProps>) {
	return (
		<button
			className={clsx(
				"bg-foreground text-white text-xl px-4 py-3 border-0 w-full cursor-pointer",
				{"bg-muted-gray text-black!": light},
				className,
			)}
			{...props}
		>
			{children}
		</button>
	)
}