"use client";

import { BrandData, Goods } from "@entities";
import { useApi } from "@hooks";
import { LandingBanner, BrandGrid, InvitationBanner, GoodsGrid } from "@widgets";

export default function Home() {
	const { data: brands } = useApi<BrandData[]>("/api/v1/brand");
	const { data: goods } = useApi<Goods[]>("/api/v1/goods");

	return (
		<>
			<LandingBanner uuid={""}/>
			<BrandGrid brands={brands ?? []}/>
			<InvitationBanner/>
			<GoodsGrid goods={goods ?? []} />
			<LandingBanner uuid={""}/>
			<BrandGrid brands={brands ?? []}/>
			<GoodsGrid goods={goods ?? []} />
		</>
	)
}
