"use client";

import { MediaImage } from "@ui";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface ImageViewProps {
	media?: (string | undefined)[];
	clickable?: boolean;
	onImageClick?: (index: number) => void;
	renderAdd?: boolean;
}

export function ImageView({
	media, clickable, onImageClick
}: Readonly<ImageViewProps>) {
	const [selectedImageStartIndex, setSelectedImageStartIndex] = useState(0);

	function changeIndex(change: number) {
		return Math.min(Math.max(selectedImageStartIndex+change, 0), Math.min((media?.length ?? 3)-3, 2));
	}

	function canChangeIndex(change: number) {
		return (selectedImageStartIndex + change) === changeIndex(change);
	}

	return (
		<>
			{/* PC */}
			<div className="hidden md:flex w-full justify-center items-center gap-4">
				<button
				className={`${canChangeIndex(-1) ? "cursor-pointer" : "opacity-25"}`}
				disabled={!canChangeIndex(-1)}
				onClick={() => setSelectedImageStartIndex(changeIndex(-1))}
				>
					<ArrowLeft/>
				</button>
				<div className={`flex container h-auto aspect-[3.1/1] gap-2 ${(media?.length ?? 0)>=3 ? "justify-between" : "justify-center"}`}>
					{
						media?.slice(selectedImageStartIndex, selectedImageStartIndex+3)
						.map((uuid, i) => (
							<div key={uuid ?? `media-${selectedImageStartIndex+i}`}>
								<MediaImage
									media_uuid={uuid}
									className={`aspect-square ${clickable && "cursor-pointer"}`} onClick={() => onImageClick?.(selectedImageStartIndex+i)}
								/>
							</div>
						))
					}
				</div>
				<button
				className={`${canChangeIndex(1) ? "cursor-pointer" : "opacity-25"}`}
				disabled={!canChangeIndex(1)}
				onClick={() => setSelectedImageStartIndex(changeIndex(1))}
				>
					<ArrowRight/>
				</button>
			</div>

			{/* Mobile */}
			<div className="md:hidden h-60 w-full">
				<Swiper
				slidesPerView="auto"
				slidesOffsetBefore={16}
				slidesOffsetAfter={16}
				spaceBetween={10}
				modules={[FreeMode]}
				freeMode
				>
					{
						media?.map((uuid, i) => (
							<SwiperSlide key={uuid} className="aspect-square h-full !w-fit">
								<MediaImage
									key={uuid ?? `media-${i}`} media_uuid={uuid}
									className={`!aspect-square h-full !w-60 ${clickable && "cursor-pointer"}`} onClick={() => onImageClick?.(i)}
								/>
							</SwiperSlide>
						))
					}
				</Swiper>
			</div>
		</>
	)
}