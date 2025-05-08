"use client";

import { BrandData, Goods } from "@entities";
import { useApi } from "@hooks"
import { GoodsButton, MediaImage, TextInput } from "@ui";
import apiFetch from "@utils/apiFetch";
import { useEffect, useRef, useState } from "react";
import { useReferringMedia } from "@shared/hooks/useReferringMedia";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { GoodsGrid } from "@widgets";

export default function MyBrandPage() {

    const { data } = useApi<BrandData>("/api/v1/brand/my", {
        authorize: true
    });

	const [brandName, setBrandName] = useState<string>("");
	const [brandDescription, setBrandDescription] = useState<string>("");
	const [socialLinks, setSocialLinks] = useState<string>("");
	const [goods, setGoods] = useState<Goods[]>([]);

	useEffect(() => {
		if(!data) return;
		setBrandName(data.brand.brand_name);
		setBrandDescription(data.brand.brand_description ?? "");
		setSocialLinks((data.brand.social_links ?? []).join(', '));
		setGoods(data.goods);
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
			<div className="container flex flex-col gap-8">
				<div className="flex h-65 gap-4 justify-between">
					
					<UploadLogo brand_logo_uuid={data?.brand.brand_logo_uuid} />
					<UploadBanner brand_banners_uuid={data?.brand.brand_banners_uuid} />
				</div>
					
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
			<GoodsGrid goods={goods} editing/>
		</>
	)
}


function UploadLogo({brand_logo_uuid}: Readonly<{brand_logo_uuid?: string}>) {
	const { media, setMedia } = useReferringMedia(brand_logo_uuid);
	const fileInputRef = useRef<HTMLInputElement>(null);

	function uploadProfileImage(file: File) {

		function onSuccess(res: Response) {
			res.json().then((json: {uuid: string}) => {
				setMedia([json.uuid]);
			})
		}

		const uploadData = new FormData();
		uploadData.append("file", file);
		
		apiFetch({
			endpoint: `/api/v1/media/logo`,
			data: uploadData,
			options: {
				method: "POST"
			},
			authorize: true,
			onSuccess
		})
	}

	function deleteProfilePicture() {
		if(!media) return;

		function onSuccess(res: Response) {
			setMedia([]);
		}
		
		apiFetch({
			endpoint: `/api/v1/media/${media[0]}`,
			options: {
				method: "DELETE"
			},
			authorize: true,
			onSuccess
		})
	}

	return (
		<div className="max-w-2/5 flex gap-4">
			<MediaImage className="aspect-square" media_uuid={media?.[0]}/>
			<div className="flex flex-col gap-2 uppercase text-foreground/50 font-medium">
				<span className="text-black text-xl">Логотип/Аватар</span>
				<div className="flex">
					<p className="w-20">Формат: </p><span className="text-black">SVG, PNG, JPG</span>
				</div>
				<div className="flex">
					<p className="w-20">Размер: </p><span className="text-black">Не более 8 МБ</span>
				</div>
				<div className="flex mt-auto gap-4 font-medium">
					<input 
						type="file" 
						ref={fileInputRef}
						accept=".jpg,.jpeg,.png,.svg" 
						className="hidden"
						onChange={(e) => {
							if (e.target.files?.[0]) {
								uploadProfileImage(e.target.files[0]);
							}
						}}
					/>

					<button
					className="underline uppercase text-black cursor-pointer"
					onClick={() => fileInputRef.current?.click()}
					>
						Загрузить
					</button>
					<button
					className="underline uppercase text-black cursor-pointer"
					onClick={() => deleteProfilePicture()}
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	)
}

function UploadBanner({brand_banners_uuid}: Readonly<{brand_banners_uuid?: string}>) {
	const { media, setMedia, refresh } = useReferringMedia(brand_banners_uuid);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [selectedBanner, setSelectedBanner] = useState(0);
	const swiperRef = useRef<SwiperClass>(null);

	useEffect(() => {
		let roundedBanner = (selectedBanner + media.length) % media.length;
		roundedBanner = isNaN(roundedBanner) ? 0 : roundedBanner;
		setSelectedBanner(roundedBanner);
		swiperRef.current?.update();
		swiperRef.current?.slideTo(roundedBanner);
	}, [media]);

	function uploadBanner(file: File) {
		// Handle the uploaded file here
		console.log("File received:", file);

		async function onSuccess(res: Response) {
			setSelectedBanner(media.length);
			refresh();
		}

		const uploadData = new FormData();
		uploadData.append("file", file);
		
		apiFetch({
			endpoint: `/api/v1/media/banner`,
			data: uploadData,
			options: {
				method: "POST"
			},
			authorize: true,
			onSuccess
		})
	}

	function deleteBanner() {
		if(!media) return;

		function onSuccess(res: Response) {
			// setMedia((prev) => {
			// 	const copy = prev
			// 	copy.splice(selectedBanner, 1);
			// 	return copy;
			// });
			
			setSelectedBanner(media.length-2);
			refresh();
		}
		
		apiFetch({
			endpoint: `/api/v1/media/${media[selectedBanner]}`,
			options: {
				method: "DELETE"
			},
			authorize: true,
			onSuccess
		})
	}

	return (
		<div className="flex gap-4">
			<div className="aspect-[1316/513] h-full" suppressHydrationWarning>
				<Swiper
					slidesPerView="auto"
					spaceBetween={50}
					loop={true}
					className="w-full h-full"
					onSwiper={(swiper) => swiperRef.current = swiper}
					onSlideChange={(swiper) => setSelectedBanner(
						isNaN(swiper.realIndex) ? 0 : swiper.realIndex)}
					>
						{media?.map((uuid) => (
							<SwiperSlide key={uuid}>
								<MediaImage className="w-full" media_uuid={uuid}/>
							</SwiperSlide>
						))}
				</Swiper>
			</div>
			
			
			<div className="flex flex-col gap-2 uppercase text-foreground/50 font-medium">
				<div className="flex text-xl text-black justify-between">
					<span>Баннеры</span><span>{media?.length ?? 0}/4</span>
				</div>
				<div className="flex">
					<p className="w-20">Формат: </p><span className="text-black">SVG, PNG, JPG</span>
				</div>
				<div className="flex flex-col">
					<p className="w-20">Размер: </p>
					<div className="flex flex-col gap-2 text-black">
						<div className="flex flex-col ">
							<span>ПК: 1316 x 513</span>
							<span>Не более 8 МБ</span>
						</div>
						<div className="flex flex-col">
							<span>Телефон: 377 x 513</span>
							<span>Не более 4 МБ</span>
						</div>
					</div>
				</div>
				<div className="flex mt-auto gap-4 font-medium">
					<input 
						type="file" 
						ref={fileInputRef}
						accept=".jpg,.jpeg,.png,.svg" 
						className="hidden"
						onChange={(e) => {
							if (e.target.files?.[0]) {
								uploadBanner(e.target.files[0]);
							}
						}}
					/>

					<button
					className="underline uppercase text-black cursor-pointer"
					onClick={() => fileInputRef.current?.click()}
					>
						Добавить новый
					</button>
					<button
					className="underline uppercase text-black cursor-pointer"
					onClick={() => deleteBanner()}
					>
						Удалить
					</button>
				</div>
			</div>
		</div>
	)
}