"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const bannerConfig: BannerSlideProps[] = [
	{
		src: '/banner/1.png',
		title: 'Brand name',
		description: 'Коллекция зима-осень теперь доступна!',
	},
	{
		src: '/banner/2.jpg',
		title: 'Brand name',
		description: 'Коллекция зима-осень теперь доступна!',
	},
	{
		src: '/banner/3.jpg',
		title: 'Brand name',
		description: 'Коллекция зима-осень теперь доступна!',
	},
	{
		src: '/banner/4.jpg',
		title: 'Brand name',
		description: 'Коллекция зима-осень теперь доступна!',
	},
	{
		src: '/banner/5.jpg',
		title: 'Brand name',
		description: 'Коллекция зима-осень теперь доступна!',
	},
]

export function LandingBanner() {
	return (
		<div className="w-full h-[60vh]">
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
					{bannerConfig.map((slide) => (
						<SwiperSlide key={slide.src}>
							<BannerSlide {...slide}/>
						</SwiperSlide>
					))}
			</Swiper>
		</div>
	)
}

interface BannerSlideProps {
	src: string;
	title?: string;
	description?: string;
}

function BannerSlide({
	src,
	title="Brand name",
	description="Коллекция зима-осень теперь доступна!",
}: Readonly<BannerSlideProps>) {
	return (
		<div className="w-full h-full p-10 flex flex-col select-none"
		style={{backgroundImage: `url(${src})`}}
		>
			<div className="text-white mt-auto self-start space-y-4">
				<h1 className={`uppercase text-4xl font-grafita`}>{title}</h1>
				<span>{description}</span>
			</div>
		</div>
	)
}
