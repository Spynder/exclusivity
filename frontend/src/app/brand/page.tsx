"use client";

import { BrandData } from "@entities";
import { useApi } from "@hooks";
import { BrandGrid } from "@widgets";


export default function BrandsPage() {
	const { data } = useApi<BrandData[]>("/api/v1/brand");

	return (
		<div className="container">
			<BrandGrid brands={data ?? []} />
		</div>
	)
}