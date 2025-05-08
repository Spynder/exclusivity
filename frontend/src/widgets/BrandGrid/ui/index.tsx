import { BrandData } from "@entities";
import { BrandButton } from "@ui";

interface BrandGridProps {
	brands: BrandData[]
}

export function BrandGrid({
	brands
}: Readonly<BrandGridProps>) {
	return (
		<div className="container grid grid-cols-3 gap-4 py-20">
			{
				brands.map((brandData) => (
					<BrandButton
					key={brandData.brand.uuid}
					brandData={brandData}
					/>
				))
			}
		</div>
	)
}
