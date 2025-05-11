"use client";

import { Button, TextInput } from "@ui";
import { Check, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ListButtonProps {
	item?: string;
	onSave?: (value: string) => void;
	onDelete?: () => void;
	focused?: boolean;
	onFocus?: () => void;
	editing?: boolean;
}

export function ListButton({
	item, onSave, onDelete, focused, onFocus, editing
}: Readonly<ListButtonProps>) {
	const [text, setText] = useState(item ?? "");
	const [width, setWidth] = useState(0);
	const span = useRef<HTMLSpanElement>(null);
	const textInput = useRef<HTMLInputElement>(null);

	useEffect(() => {
		setWidth(span.current?.offsetWidth ?? 0);
	}, [text]);

	useEffect(() => {
		if(focused) textInput.current?.focus();
	}, [focused]);


	// hack thanks to https://stackoverflow.com/a/65024003 
	return (
		<div className="flex flex-row gap-2">
			<div className={`flex flex-row gap-2 ${focused && "mx-2"}`}>
				<span ref={span} className="absolute opacity-0 select-none pointer-events-none -z-10">{text}</span>
				<TextInput className={`min-w-14 text-center outline-0 ${focused && "bg-white inset-ring-4 inset-ring-muted-gray"}`} value={text} onChange={(e) => setText(e.target.value)}
				onFocus={() => {
					if(!editing) return;
					onFocus?.();
				}}
				inputRef={textInput}
				style={{width: width + 40}}
				disabled={!editing}
				/>
			</div>
			{focused && editing && (
				<>
					<Button className="w-14 !bg-[#15B8001A]" onClick={() => onSave?.(text)}>
						<Check className="text-[#15B800]"/>
					</Button>
					<Button className="w-14 !bg-[#FF00001A]" onClick={onDelete}>
						<X className="text-[#FF0000]"/>
					</Button>
				</>
			)}
		</div>

	)
}