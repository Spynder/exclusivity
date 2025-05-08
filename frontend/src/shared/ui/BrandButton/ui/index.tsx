import { BrandData } from "@entities";
import { useReferringMedia } from "@shared/hooks/useReferringMedia";
import { MediaImage } from "@ui";
import Image from "next/image";

export function BrandButton({brandData}: Readonly<{brandData: BrandData}>) {
	const { media } = useReferringMedia(brandData.brand.brand_logo_uuid);

	return (
		<div className="flex flex-col space-y-2">
			<div className="h-52 w-full">
				{
					media ? (
						<MediaImage media_uuid={media[0]}/>
					) : (
						<div className="h-52 w-full bg-gray-100 flex items-center justify-center">
							<Image src="/no-image.svg" alt="no-image" width={50} height={50} />
						</div>
					)
				}
			</div>
			<span className="text-2xl font-medium uppercase">{brandData.brand.brand_name}</span>
			<div className="flex flex-row justify-between text-gray-600">
				<span>{brandData.brand.brand_description}</span>
				<span>{brandData.goods.length} позиций в каталоге</span>
			</div>
		</div>

	)
}
