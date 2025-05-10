"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import { BrandData } from '@entities';
import { useApi, useResponsiveMediaImage, useReferringMedia } from '@hooks';
import { useEffect, useState } from 'react';

interface LandingBannerProps {
	uuid: string;
}

export function LandingBanner({
	uuid
}: Readonly<LandingBannerProps>) {
	const { data } = useApi<BrandData>(`/api/v1/brand/${uuid}`);
	const [mediaUUID, setMediaUUID] = useState<string>();
	const { media } = useReferringMedia(mediaUUID);

	useEffect(() => {
		if(!data) return;
		setMediaUUID(data.brand?.brand_banners_uuid);
		console.log(mediaUUID)
	}, [data]);

	if(!media?.length) return null;

	return (
		<div className="w-full h-[513px]">
			<Swiper
				slidesPerView="auto"
				spaceBetween={50}
				autoplay={{
					delay: 2500,
					disableOnInteraction: false,
				}}
				loop={true}
				className="container h-full"
				modules={[Autoplay]}
				>
					{media.map((slide) => (
						<SwiperSlide key={slide}>
							<BannerSlide media_uuid={slide} title={data?.brand?.brand_name}/>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	)
}

interface BannerSlideProps {
	media_uuid?: string;
	title?: string;
	description?: string;
}

function BannerSlide({
	media_uuid,
	title="Brand name",
	description,
	// description="Коллекция зима-осень теперь доступна!",
}: Readonly<BannerSlideProps>) {
	const { url, ready } = useResponsiveMediaImage(media_uuid);

	return (
		<div className="w-full h-full p-10 flex flex-col select-none bg-cover bg-center"
		style={{backgroundImage: `url(${url}`}}
		>
			<div className="text-white mt-auto self-start space-y-4">
				<h1 className={`uppercase text-4xl font-grafita`}>{title}</h1>
				<span>{description}</span>
			</div>
		</div>
	)
}
