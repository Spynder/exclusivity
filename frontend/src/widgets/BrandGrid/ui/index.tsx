import { BrandData } from "@entities";
import { BrandButton } from "@ui";
import { cn } from "@utils/cn";

interface BrandGridProps {
	brands: BrandData[]
	className?: string
}

export function BrandGrid({
	brands, className
}: Readonly<BrandGridProps>) {
	return (
		<div className={cn(
			"container grid gap-4 grid-cols-2 md:grid-cols-3",
			className
		)}>
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
