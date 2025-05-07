import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


interface GoodsButtonProps {
	uuid?: string;
	image_uuid?: string;
	name?: string;
	price?: number;
	createButton?: boolean
}

export function GoodsButton({
	uuid,
	image_uuid,
	name="Куртка женская",
	price=5690,
	createButton=false,
}: Readonly<GoodsButtonProps>) {

	function getImage(image_uuid?: string) {
		if(image_uuid && false) {
			return (
				<div className="h-full w-full relative">
					<Image src={"/api/v1/image/" + image_uuid} alt={name} fill className="object-cover w-full h-full" />
				</div>
			)
		}
		if(createButton) {
			return (
				<div className="h-full w-full bg-gray-100 flex items-center justify-center">
					<Plus width={50} height={50}/>
				</div>
			)
		}
		return (
			<div className="h-full w-full bg-gray-100 flex items-center justify-center">
				<Image src="/no-image.svg" alt="no-image" width={50} height={50} />
			</div>
		)
	}

	return (
		<Link
		className="flex flex-col space-y-2 w-full text-left border-none bg-transparent p-0"
		href={createButton ? "/goods/create" : `/goods/${uuid}`}
		aria-label={createButton ? "Add new item" : `Select ${name}, ${price} ₽`}
		tabIndex={0}
		>
			<div className="aspect-square w-full">
				{getImage(image_uuid)}
			</div>
			<div className="flex flex-row justify-between text-gray-800 text-xl font-medium">
				<span>{name}</span>
				<span>
					{createButton ? `+` : `${price} ₽`}
				</span>
			</div>
		</Link>

	)
}
