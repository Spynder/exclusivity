"use client";

import { BrandData, Goods } from "@entities";
import { useApi } from "@hooks"
import { GoodsButton, ListEditor, MediaImage, TextInput } from "@ui";
import apiFetch from "@utils/apiFetch";
import { Component, useEffect, useRef, useState } from "react";
import { useReferringMedia } from "@shared/hooks/useReferringMedia";
import { Swiper, SwiperSlide } from "swiper/react";
import { Swiper as SwiperClass } from "swiper/types";
import { FileTooBigModal, GoodsGrid, InvitationBanner } from "@widgets";
import { Trash, Upload } from "lucide-react";

export default function MyBrandPage() {
    const { data } = useApi<BrandData>("/api/v1/brand/my", {
        authorize: true
    });

	const [brandName, setBrandName] = useState<string>("");
	const [brandDescription, setBrandDescription] = useState<string>("");
	const [socialLinks, setSocialLinks] = useState<string[]>([]);
	const [goods, setGoods] = useState<Goods[]>([]);

	useEffect(() => {
		if(!data) return;
		setBrandName(data.brand?.brand_name ?? "");
		setBrandDescription(data.brand?.brand_description ?? "");
		setSocialLinks((data.brand?.social_links ?? []));
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
				social_links: socialLinks,
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
			<div className="container flex flex-col gap-10 w-full">
				<div className="flex flex-col gap-8">
					<div className="flex md:h-60 gap-4 justify-between flex-col md:flex-row">
						<UploadLogo brand_logo_uuid={data?.brand?.brand_logo_uuid} />
						<UploadBanner brand_banners_uuid={data?.brand?.brand_banners_uuid} />
					</div>
						
					<div className="flex flex-col gap-2 text-xl font-medium">
						<div className="flex flex-col md:flex-row items-top gap-2">
							<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Название: </span>
							<TextInput className="md:text-end" value={brandName} change={(value) => setBrandName(value)} />
						</div>
						<div className="flex flex-col md:flex-row items-top gap-2">
							<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Описание: </span>
							<TextInput className="md:text-end" multiline value={brandDescription} change={(value) => setBrandDescription(value)} />
						</div>
						<div className="flex flex-col md:flex-row items-top gap-2">
							<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap">Социальные сети: </span>
							<ListEditor items={socialLinks} setItems={setSocialLinks} editing />
						</div>
					</div>

					<button
					className="bg-foreground text-white text-xl px-4 py-3 border-0 w-full cursor-pointer"
					onClick={saveChanges}
					>
						Сохранить
					</button>
				</div>
			</div>
				
			<InvitationBanner>
				Хотите видеть свой бренд в нашем каталоге
			</InvitationBanner>
			<div className="container">
				<GoodsGrid goods={goods} editing/>
			</div>
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
		<div className="md:max-w-2/5 flex flex-col md:flex-row gap-4">
			<MediaImage className="aspect-square w-min h-60" media_uuid={media?.[0]}/>
			<div className="flex flex-col gap-4 uppercase text-foreground/50 font-medium">
				<span className="text-black text-xl">Логотип/Аватар</span>
				<div className="flex flex-col gap-2">
					<div className="flex">
						<p className="w-20">Формат: </p><span className="text-black">PNG, JPG</span>
					</div>
					<div className="flex">
						<p className="w-20">Размер: </p><span className="text-black">Не более 8 МБ</span>
					</div>
				</div>
				<div className="flex mt-auto gap-4 font-medium pt-8">
					<input 
						type="file" 
						ref={fileInputRef}
						accept=".jpg,.jpeg,.png" 
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
	const [selectedType, setSelectedType] = useState<"pc" | "mobile">("pc");
	const [newBanner, setNewBanner] = useState(false);
	const [refreshes, setRefreshes] = useState(0);
	const [fileErrorModalOpen, setFileErrorModalOpen] = useState(false);

	useEffect(() => {
		let roundedBanner = (selectedBanner + media.length) % media.length;
		roundedBanner = isNaN(roundedBanner) ? 0 : roundedBanner;
		setSelectedBanner(roundedBanner);
	}, [media])

	function uploadTypedBanner(file: File) {
		// Handle the uploaded file here
		console.log("File received:", file);

		async function refreshBanners() {
			setRefreshes(x => x+1);
			refresh();
		}

		async function openNewPage() {
			setSelectedBanner(media.length);
			await refreshBanners();
		}

		function uploadErrorHandler(res?: Response) {
			if(res?.status === 413) setFileErrorModalOpen(true);
		}

		const uploadData = new FormData();
		uploadData.append("file", file);

		let config = {
			endpoint: `/api/v1/media/banner/${selectedType}`,
			data: uploadData,
			options: {
				method: "POST"
			},
			authorize: true,
			onSuccess: openNewPage,
			onError: uploadErrorHandler
		}

		if(media[selectedBanner] && !newBanner) {
			config = {
				endpoint: `/api/v1/media/banner/${media[selectedBanner]}/${selectedType}`,
				data: uploadData,
				options: {
					method: "PUT"
				},
				authorize: true,
				onSuccess: refreshBanners,
				onError: uploadErrorHandler
			}
		}
		
		apiFetch(config)
	}

	function deleteBanner(type: "pc" | "mobile") {
		if(!media) return;

		async function onSuccess() {
			setRefreshes(x => x+1); // TODO shit code 
			refresh();
		}
		
		apiFetch({
			endpoint: `/api/v1/media/${type}/${media[selectedBanner]}`,
			options: {
				method: "DELETE"
			},
			authorize: true,
			onSuccess
		})
	}

	function triggerUpload(type: "pc" | "mobile") {
		setSelectedType(type);
		setNewBanner(false);
		fileInputRef.current?.click();
	}

	useEffect(() => {
		setRefreshes(x => x+1);
	}, [selectedBanner]);

	return (
		<div className="flex flex-col md:flex-row gap-4 h-full">
			<div className="md:aspect-[1693/513] h-full" suppressHydrationWarning>
				<div className="flex justify-between flex-col md:flex-row w-full h-full gap-2">
					<div className="min-w-20 relative aspect-[1316/513]">
						<MediaImage media_uuid={media[selectedBanner]} force="pc" refreshes={refreshes}/>
						<button className="absolute top-5 left-17 w-10 h-10 bg-white flex items-center justify-center cursor-pointer" onClick={() => triggerUpload("pc")}>
							<Upload />
						</button>
						<button className="absolute top-5 left-5 w-10 h-10 bg-white flex items-center justify-center cursor-pointer" onClick={() => deleteBanner("pc")}>
							<Trash className="text-red-600"/>
						</button>
						<div className="relative bottom-5 right-5">
							{media.map((image, i) => (
								<button
								key={image ?? "image"+i}
								className="w-4 h-4 absolute bg-white rounded-full bottom-0 cursor-pointer"
								style={{right: 24*i, opacity: (selectedBanner === i) ? 1 : 0.5}}
								onClick={() => setSelectedBanner(i)}
								/>
							))}
						</div>
					</div>
					<div className="min-w-20 relative aspect-[377/513]">
						<MediaImage media_uuid={media[selectedBanner]} force="mobile" refreshes={refreshes}/>
						<button className="absolute top-5 left-17 w-10 h-10 bg-white flex items-center justify-center cursor-pointer" onClick={() => triggerUpload("mobile")}>
							<Upload />
						</button>
						<button className="absolute top-5 left-5 w-10 h-10 bg-white flex items-center justify-center cursor-pointer" onClick={() => deleteBanner("mobile")}>
							<Trash className="text-red-600"/>
						</button>
					</div>
				</div>
			</div>
			
			
			<div className="flex flex-col gap-2 uppercase text-foreground/50 font-medium">
				<div className="flex text-xl text-black justify-between">
					<span>Баннеры</span><span>{media?.length ?? 0}/4</span>
				</div>
				<div className="flex">
					<p className="w-20">Формат: </p><span className="text-black">PNG, JPG</span>
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
				<FileTooBigModal open={fileErrorModalOpen} onClose={() => setFileErrorModalOpen(false)}/>
				<div className="flex mt-auto gap-4 font-medium">
					<input 
						type="file" 
						ref={fileInputRef}
						accept=".jpg,.jpeg,.png" 
						className="hidden"
						onChange={(e) => {
							if (e.target.files?.[0]) {
								setSelectedType("pc");
								uploadTypedBanner(e.target.files[0]);
							}
						}}
					/>

					<button
					className="underline uppercase text-black cursor-pointer disabled:opacity-50"
					disabled={media.length>=4}
					onClick={() => {
						setNewBanner(true)
						fileInputRef.current?.click()
					}}
					>
						Добавить новый
					</button>
					{/* <button
					className="underline uppercase text-black cursor-pointer"
					onClick={() => deleteBanner()}
					>
						Удалить
					</button> */}
				</div>
			</div>
		</div>
	)
}