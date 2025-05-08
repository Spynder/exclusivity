"use client";

import { Goods } from "@entities";
import { useReferringMedia } from "@shared/hooks/useReferringMedia";
import { Button, MediaImage, TextInput } from "@ui";
import apiFetch from "@utils/apiFetch";
import { useEffect, useRef, useState } from "react";

interface GoodsViewProps {
	goods?: Goods,
	editing?: boolean
}

export function GoodsView({
	goods, editing
}: Readonly<GoodsViewProps>) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [name, setName] = useState<string>("");
	const [description, setDescription] = useState<string>("");
	const [price, setPrice] = useState<string>("");
	const selectedImageIndex = useRef(0);
	const [imageHook, setImageHook] = useState<string>();
	const { media, setMedia } = useReferringMedia(imageHook, [undefined, undefined, undefined]);
	

	useEffect(() => {
		if(!goods) return;
		setName(goods.name);
		setDescription(goods.description);
		setPrice(goods.price.toString());
		setImageHook(goods.images_uuid);
	}, [goods])


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
			endpoint: `/api/v1/goods${editing ? "/" + goods?.uuid : ""}`,
			options: {
				method: editing ? "PUT" : "POST",
			},
			data: {
				name,
				description,
				price: Number(price),
				media_uuid: media.filter(x => x)
			},
			authorize: true,
			onSuccess: () => {
				alert("Добавлен товар");
			},
			onError: () => {
				alert("Ошибка при сохранении изменений");
			}
		});
	}


	function uploadImage(file: File, index: number) {
		async function onSuccess(res: Response) {
			const uuid = (await res.json()).uuid as string;
			setMedia((prev) => {
				const copy = prev.slice();
				copy[index] = uuid;
				return copy;
			});
		}

		const uploadData = new FormData();
		uploadData.append("file", file);
		
		apiFetch({
			endpoint: `/api/v1/media/image`,
			data: uploadData,
			options: {
				method: "POST"
			},
			authorize: true,
			onSuccess
		})
	}

	
	function triggerUploadImage(index: number) {
		if(!editing) return;
		selectedImageIndex.current = index;
		fileInputRef.current?.click();
	}

	function deleteGoods() {
		// TODO
	}


	return (
		<div className="container flex flex-col gap-2">
			<input 
				type="file" 
				ref={fileInputRef}
				accept=".jpg,.jpeg,.png,.svg" 
				className="hidden"
				onChange={(e) => {
					if (e.target.files?.[0]) {
						uploadImage(e.target.files[0], selectedImageIndex.current);
					}
				}}
			/>
			<div className="flex h-auto aspect-[3.1/1] gap-2 justify-between max-w-full">
				{
					media.concat([undefined, undefined, undefined]).slice(0,3)
					.map((uuid, i) => (
						<MediaImage
							key={uuid ?? `media-${i}`} media_uuid={uuid}
							className={`aspect-square ${editing && "cursor-pointer"}`} onClick={() => triggerUploadImage(i)}
						/>
					))
				}
			</div>
				
			<div className="flex flex-col container gap-2 text-xl font-medium">
				<div className="flex items-center gap-2">
					<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Название: </span>
					{editing ? (
						<TextInput end
						value={name} placeholder="Название товара"
						change={(value) => setName(value)}
						/>
					) : (
						<p className="text-end w-full">{name}</p>
					)}
				</div>
				<div className="flex items-center gap-2">
					<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Описание: </span>
					{editing ? (
						<TextInput end
						value={description} placeholder="Не более 500 символов"
						maxLength={500}
						change={(value) => setDescription(value)}
						/>
					) : (
						<p className="text-end w-full">{description}</p>
					)}
				</div>
				<div className="flex items-center gap-2">
					<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Цена: </span>
					{editing ? (
						<TextInput end type="number"
						value={price} placeholder="Введите стоимость"
						change={(value) => changePrice(value)}
						/>
					) : (
						<p className="text-end w-full">{price} ₽</p>
					)}
				</div>
			</div>

			{goods && editing && (
				<div className="flex gap-4">
					<Button onClick={deleteGoods} className="grow" light>
						Удалить
					</Button>
					<Button onClick={saveChanges} className="grow">
						Сохранить изменения
					</Button>
				</div>
			)}
		</div>
	)
}