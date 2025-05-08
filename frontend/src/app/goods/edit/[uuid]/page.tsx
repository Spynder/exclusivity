"use client";

import { Goods } from "@entities";
import { useApi } from "@hooks";
import { TextInput } from "@ui";
import apiFetch from "@utils/apiFetch";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditGoodsPage() {
	const router = useRouter();
	const params = useParams<{uuid: string}>();

	const { data } = useApi<Goods>(`/api/v1/goods/${params.uuid}`);

	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [price, setPrice] = useState<string>("");

	useEffect(() => {
		if(!data) return;
		console.log(data)
		setName(data.name);
		setDescription(data.description ?? "");
		setPrice(data.price.toString())
	}, [data]);

	function changePrice(value: string) {
		const parsed = parseInt(value);
		if(isNaN(parsed)) {
			setPrice("");
			return;
		}
		const p = Math.abs(parsed);
		setPrice(p.toString());
	}

	function saveChanges() {
		apiFetch({
			endpoint: `/api/v1/goods/${params.uuid}`,
			options: {
				method: "PUT",
			},
			data: {
				name,
				description,
				sizes: [],
				price: Number(price),
			},
			authorize: true,
			onSuccess: () => {
				alert("Сохранено");
				//router.push("/brand");
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
					<TextInput end value={name} change={(value) => setName(value)}/>
				</div>
				<div className="flex items-center gap-2">
					<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Описание: </span>
					<TextInput end value={description} change={(value) => setDescription(value)}/>
				</div>
				<div className="flex items-center gap-2">
					<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Цена: </span>
					<TextInput end type="number" value={price} placeholder="Введите стоимость" change={(value) => changePrice(value)}/>
				</div>
			</div>

			<button
			className="bg-foreground text-white text-xl px-4 py-3 border-0 w-full cursor-pointer"
			onClick={saveChanges}
			>
				Сохранить изменения
			</button>
		</div>
	)
}
