"use client";

import { Goods } from "@entities";
import { useReferringMedia } from "@shared/hooks/useReferringMedia";
import { Button, ListEditor, TextInput } from "@ui";
import apiFetch from "@utils/apiFetch";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FileTooBigModal } from "@widgets";
import { ImageView } from "./ImageView";

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
	const [sizes, setSizes] = useState<string[]>([]);
	const selectedImageIndex = useRef(0);
	const [imageHook, setImageHook] = useState<string>();
	const { media, setMedia } = useReferringMedia(imageHook, [undefined, undefined, undefined, undefined, undefined]);
	const [fileErrorModalOpen, setFileErrorModalOpen] = useState(false);
	const router = useRouter();
	

	useEffect(() => {
		if(!goods) return;
		setName(goods.name);
		setDescription(goods.description);
		setPrice(goods.price.toString());
		setSizes(goods.sizes);
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
			endpoint: `/api/v1/goods${goods ? "/" + goods?.uuid : ""}`,
			options: {
				method: goods ? "PUT" : "POST",
			},
			data: {
				name,
				description,
				price: Number(price),
				media_uuid: media.filter(x => x),
				sizes,
			},
			authorize: true,
			onSuccess: () => {
				if(!goods) {
					alert("Товар добавлен.");
					router.push("/brand/my");
				} else {
					alert("Изменения сохранены.");
				}
			},
			onError: () => {
				if(!goods) {
					alert("Ошибка при добавлении товара.");
				} else {
					alert("Ошибка при сохранении изменений.");
				}
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
		function uploadErrorHandler(res?: Response) {
			if(res?.status === 413) setFileErrorModalOpen(true);
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
			onSuccess: onSuccess,
			onError: uploadErrorHandler
		})
	}

	
	function triggerUploadImage(index: number) {
		if(!editing) return;
		selectedImageIndex.current = index;
		fileInputRef.current?.click();
	}

	function deleteGoods() {
		apiFetch({
			endpoint: `/api/v1/goods/${goods?.uuid}`,
			options: {
				method: "DELETE"
			},
			authorize: true,
			onSuccess: () => {
				alert("Удален товар");
				router.push("/brand/my")
			},
			onError: () => {
				alert("Ошибка при удалении");
			}
		});
	}


	return (
		<div className="flex flex-col gap-2 items-center w-full">
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
			<ImageView media={media.concat(editing ? [undefined] : [])} clickable={editing} onImageClick={(i) => triggerUploadImage(i)}/>
			<FileTooBigModal open={fileErrorModalOpen} onClose={() => setFileErrorModalOpen(false)}/>
				
			<div className="flex flex-col container gap-2 text-xl font-medium">
				{!editing && (
					<div className="flex md:items-center gap-2 flex-col md:flex-row">
						<span className="w-60 text-foreground opacity-50 whitespace-nowrap">Бренд: </span>
						<p className="md:text-end w-full">{goods?.brand_name}</p>
					</div>
				)}
				
				<div className="flex md:items-center gap-2 flex-col md:flex-row">
					<span className="w-60 text-foreground opacity-50 whitespace-nowrap">Название: </span>
					{editing ? (
						<TextInput
						className="md:text-end"
						value={name} placeholder="Название товара"
						change={(value) => setName(value)}
						/>
					) : (
						<p className="md:text-end w-full">{name}</p>
					)}
				</div>
				<div className="flex md:items-center gap-2 flex-col md:flex-row">
					<span className="w-60 text-foreground opacity-50 whitespace-nowrap">Описание: </span>
					{editing ? (
						<TextInput
						className="md:text-end"
						value={description} placeholder="Не более 500 символов"
						maxLength={500}
						change={(value) => setDescription(value)}
						/>
					) : (
						<p className="md:text-end w-full">{description}</p>
					)}
				</div>
				<div className="flex md:items-center gap-2 flex-col md:flex-row">
					<span className="w-60 text-foreground opacity-50 whitespace-nowrap">Цена: </span>
					{editing ? (
						<TextInput type="number"
						className="md:text-end"
						value={price} placeholder="Введите стоимость"
						change={(value) => changePrice(value)}
						/>
					) : (
						<p className="md:text-end w-full">{price} ₽</p>
					)}
				</div>
				<div className="flex md:items-center gap-2 flex-col md:flex-row">
					<span className="w-60 text-foreground opacity-50 whitespace-nowrap">Размеры: </span>
					<ListEditor items={sizes} setItems={setSizes} editing={editing}/>
				</div>
				
			</div>
			
			<div className="container">
				{goods && editing && (
					<div className="flex gap-4 flex-col-reverse md:flex-row">
						<Button onClick={deleteGoods} className="grow" light>
							Удалить
						</Button>
						<Button onClick={saveChanges} className="grow">
							Сохранить изменения
						</Button>
					</div>
				)}

				{!goods && editing && (
					<Button onClick={saveChanges} className="grow">
						Добавить
					</Button>
				)}
			</div>
		</div>
	)
}