import { cn } from "@utils/cn";
import { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
	change?: (value: string) => void;
	end?: boolean;
	dark?: boolean;
	multiline?: boolean;
}

export function TextInput({
	change, end, dark, multiline, className, ...props
}: Readonly<TextInputProps>) {
	if(multiline) {
		return (
			<textarea
				className={
					cn(
						dark ? "bg-[#1f1f1f]" : "bg-[#f6f6f6]",
						{"text-end": end},
						"px-4 py-3 border-0 w-full min-h-[2lh]",
						className
					)
				}
				rows={3}
				onChange={(e) => change?.(e.target.value)}
				{...props}
			/>
		)
	}
	return (
		<input type="text"
		className={
			cn(
				dark ? "bg-[#1f1f1f]" : "bg-[#f6f6f6]",
				{"text-end": end},
				"px-4 py-3 border-0 w-full",
				className
			)
		}
		onChange={(e) => change?.(e.target.value)}
		{...props}
		/>
	);
}