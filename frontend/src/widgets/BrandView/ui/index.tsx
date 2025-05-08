import { BrandData } from "@entities";
import { useReferringMedia } from "@shared/hooks/useReferringMedia";
import { MediaImage, TextInput } from "@ui";

interface BrandViewProps {
	brandData?: BrandData
}

export function BrandView({
	brandData
}: Readonly<BrandViewProps>) {
	const { media } = useReferringMedia(brandData?.brand.brand_logo_uuid);
	return (
		<div className="container border border-muted-gray p-5 flex gap-6 h-50">
			<MediaImage media_uuid={media[0]} className="aspect-square w-min"/>
			<div className="grow flex flex-col justify-between gap-5">
				<div className="flex items-top gap-2">
					<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap uppercase">Название бренда: </span>
					<span className="text-end w-full uppercase text-xl font-medium">{brandData?.brand.brand_name}</span>
				</div>
				<div className="flex items-top gap-2 grow">
					<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap uppercase">Описание: </span>
					<p className="text-end w-full">{brandData?.brand.brand_description}</p>
				</div>
				<div className="flex items-top gap-2">
					<span className="w-60 text-[#161616] opacity-50 whitespace-nowrap uppercase">Социальные сети: </span>
					<p className="text-end w-full">{brandData?.brand.social_links}</p>
				</div>
			</div>
		</div>
	)
}