import { Goods } from "@entities";
import { useReferringMedia } from "@shared/hooks/useReferringMedia";
import { MediaImage } from "@shared/ui/MediaImage";
import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface GoodsButtonProps {
	goods?: Goods,
	createButton?: boolean,
	editing?: boolean
}

export function GoodsButton({
	goods, createButton, editing
}: Readonly<GoodsButtonProps>) {
	const { media } = useReferringMedia(goods?.images_uuid);

	return (
		<Link
		className="flex flex-col w-full text-left border-none bg-transparent p-0"
		href={createButton ? "/goods/create" : `/goods/${editing ? "edit/" : ""}${goods?.uuid}`}
		tabIndex={0}
		>
			<div className="aspect-square w-full h-fit">
				{createButton ? (
					<div className="h-full w-full bg-gray-100 flex items-center justify-center">
						<Plus width={50} height={50}/>
					</div>
				) : (
					<MediaImage media_uuid={media[0]} className="aspect-square cursor-pointer" />
				)}
			</div>
			<div className="flex flex-col gap-2 md:flex-row justify-between text-gray-800 text-xl font-medium">
				{createButton ? (<>
					<span>Новый товар</span>
					<span className="me-2">+</span>
				</>) : (<>
					<span>{goods?.name}</span>
					<span>{goods?.price} ₽</span>
				</>)}
			</div>
		</Link>

	)
}
