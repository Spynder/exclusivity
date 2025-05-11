"use client";

import { useEffect, useState } from "react";
import { ListButton } from "./ListButton";
import { Button } from "@shared/ui/Button";

interface ListEditorProps {
	items: string[];
	setItems: (items: string[]) => void;
	editing?: boolean;
}

export function ListEditor({
	items, setItems, editing
}: Readonly<ListEditorProps>) {
	const [focusedInput, setFocusedInput] = useState<number>();

	useEffect(() => {
		setItems(items.filter((x, i) => (x || focusedInput === i)))
	}, [focusedInput])

	return (
		<div className="flex flex-row flex-wrap justify-end gap-2 w-full">
			{items.map((item, i) => (
				<ListButton
				key={`${item}${i}`}
				item={item}
				editing={editing}
				onSave={(value) => {
					setFocusedInput(undefined);
					const copy = items.slice();
					copy[i] = value;
					setItems(copy);
				}}
				onDelete={() => {
					setFocusedInput(undefined);
					const copy = items.slice();
					copy.splice(i, 1);
					setItems(copy);
				}}
				focused={focusedInput === i}
				onFocus={() => {
					setFocusedInput(i);
				}}
				/>
			))}
			
			{editing && (
				<Button onClick={() => {
					if(!editing) return;
					setItems([...items, ""]);
					setFocusedInput(items.length);
				}} className="!w-14">+</Button>
			)}
		</div>
	)
}