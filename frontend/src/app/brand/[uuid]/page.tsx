"use client";

import { BrandData, Goods } from "@entities";
import { useApi } from "@hooks"
import { GoodsButton, TextInput } from "@ui";
import apiFetch from "@utils/apiFetch";
import { useEffect, useState } from "react";

export default function BrandPage() {

	const { data } = useApi<BrandData>("/api/v1/brand/my", {
		authorize: true
	});

	const [brandName, setBrandName] = useState<string>("");
	const [brandDescription, setBrandDescription] = useState<string>("");
	const [socialLinks, setSocialLinks] = useState<string>("");
	const [goods, setGoods] = useState<Goods[]>([]);

	useEffect(() => {
		if(data) {
			setBrandName(data.brand.brand_name);
			setBrandDescription(data.brand.brand_description ?? "");
			setSocialLinks((data.brand.social_links ?? []).join(', '));
			setGoods(data.goods);
		}
	}, [data]);

	function saveChanges() {
		apiFetch({
			endpoint: "/api/v1/brand/my",
			options: {
				method: "PUT",
			},
			data: {
				brand_name: brandName,
				brand_description: brandDescription,
				social_links: socialLinks.split(', '),
			},
			authorize: true,
			onSuccess: () => {
				alert("Изменения сохранены");
			},
			onError: () => {
				alert("Ошибка при сохранении изменений");
			}
		});
	}

	return (
		<>
			<div className="container flex flex-col gap-2">
				<div className="flex h-50"></div>
					
				<div className="flex flex-col container gap-2 text-xl font-medium">
					<div className="flex items-center gap-2">
						<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Название: </span>
						<TextInput end value={brandName} change={(value) => setBrandName(value)} />
					</div>
					<div className="flex items-center gap-2">
						<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Описание: </span>
						<TextInput end value={brandDescription} change={(value) => setBrandDescription(value)} />
					</div>
					<div className="flex items-center gap-2">
						<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Социальные сети: </span>
						<TextInput end value={socialLinks} change={(value) => setSocialLinks(value)} />
					</div>
				</div>

				<button
				className="bg-foreground text-white text-xl px-4 py-3 border-0 w-full cursor-pointer"
				onClick={saveChanges}
				>
					Сохранить
				</button>
			</div>
			<div className="container grid grid-cols-3 gap-4 py-20">
				<GoodsButton createButton name="Новый товар" />
				{goods.map((item) => (
					<GoodsButton key={item.uuid} image_uuid={item.images_uuid} name={item.name} price={item.price} />
				))}
			</div>
		</>
	)
}
