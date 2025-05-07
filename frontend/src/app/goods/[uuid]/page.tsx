"use client";

import { TextInput } from "@ui";
import apiFetch from "@utils/apiFetch";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewGoodsPage() {
	const router = useRouter();

	const [brandName, setBrandName] = useState<string>("");
	const [brandDescription, setBrandDescription] = useState<string>("");
	const [price, setPrice] = useState<string>("");

	function changePrice(value: string) {
		const parsed = parseInt(value);
		if(isNaN(parsed)) {
			setPrice("");
			return;
		}
		const cost = Math.abs(parsed);
		setPrice(cost.toString());
	}

	function saveChanges() {
		apiFetch({
			endpoint: "/api/v1/goods",
			options: {
				method: "POST",
			},
			data: {
				name: brandName,
				description: brandDescription,
				price: 1990,
			},
			authorize: true,
			onSuccess: () => {
				alert("Добавлен товар");
				router.push("/my-brand");
			},
			onError: () => {
				alert("Ошибка при сохранении изменений");
			}
		});
	}

	return (
		<div className="container flex flex-col gap-2">
			<div className="flex h-50"></div>
				
			<div className="flex flex-col container gap-2 text-xl font-medium">
				<div className="flex items-center gap-2">
					<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Название: </span>
					<TextInput end value={brandName} change={(value) => setBrandName(value)}/>
				</div>
				<div className="flex items-center gap-2">
					<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Описание: </span>
					<TextInput end value={brandDescription} change={(value) => setBrandDescription(value)}/>
				</div>
				<div className="flex items-center gap-2">
					<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Цена: </span>
					<TextInput end value={price} placeholder="Введите стоимость" change={(value) => changePrice(value)}/>
				</div>
			</div>

			<button
			className="bg-foreground text-white text-xl px-4 py-3 border-0 w-full cursor-pointer"
			onClick={saveChanges}
			>
				Добавить
			</button>
		</div>
	)
}
