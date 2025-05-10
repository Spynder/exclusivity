"use client";

import { BrandData, Goods } from "@entities";
import { useApi } from "@hooks";
import { LandingBanner, BrandGrid, InvitationBanner, GoodsGrid } from "@widgets";

export default function Home() {
	const { data: brands } = useApi<BrandData[]>("/api/v1/brand");
	const { data: goods } = useApi<Goods[]>("/api/v1/goods");

	return (
		<>
			<LandingBanner uuid={"155227d8-58bc-42b6-b365-5c40e93ffa12"}/>
			<div className="container">
				<BrandGrid brands={brands?.slice(0,6) ?? []}/>
				
				<InvitationBanner>
					Хотите видеть ваш бренд в нашем каталоге
				</InvitationBanner>
				<GoodsGrid goods={goods?.slice(0,6) ?? []} />
			</div>
			<LandingBanner uuid={"2b1657be-1b07-4cd1-83d2-2242c8b44fe3"}/>
			<div className="container">
				<BrandGrid brands={brands?.slice(6,12) ?? []}/>
				<GoodsGrid goods={goods?.slice(6,12) ?? []} />
			</div>
		</>
	)
}
