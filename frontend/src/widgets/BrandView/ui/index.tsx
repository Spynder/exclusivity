import { BrandData } from "@entities";
import { useReferringMedia } from "@shared/hooks/useReferringMedia";
import { MediaImage } from "@ui";

interface BrandViewProps {
	brandData?: BrandData
}

export function BrandView({
	brandData
}: Readonly<BrandViewProps>) {
	const { media } = useReferringMedia(brandData?.brand?.brand_logo_uuid);
	return (
		<div className="container border border-muted-gray p-5 flex gap-6 min-h-50 flex-col md:flex-row">

			<MediaImage media_uuid={media[0]} className="aspect-square w-min min-w-50"/>
			<div className="grow flex flex-col justify-between gap-5">
				<div className="flex flex-col md:flex-row items-top gap-2">
					<span className="w-60 text-foreground opacity-50 whitespace-nowrap uppercase">Название бренда: </span>
					<span className="md:text-end w-full uppercase text-2xl font-medium">{brandData?.brand?.brand_name}</span>
				</div>
				<div className="flex flex-col md:flex-row items-top gap-2 grow">
					<span className="w-60 text-foreground opacity-50 whitespace-nowrap uppercase">Описание: </span>
					<p className="md:text-end w-full">{brandData?.brand?.brand_description}</p>
				</div>
				<div className="flex flex-col md:flex-row items-top gap-2">
					<span className="w-60 text-foreground opacity-50 whitespace-nowrap uppercase">Социальные сети: </span>
					<div className="flex flex-col grow gap-2">
						{brandData?.brand?.social_links?.map((link) => (
							<a href={`//${link}`} className="md:text-end hover:underline" key={link}>{link}</a>
						))}
					</div>
				</div>
			</div>
		</div>
	)
}