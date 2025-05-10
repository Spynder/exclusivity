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
			<LandingBanner uuid={"e213460f-3abb-4347-9930-e4daa410d851"}/>
			<div className="container">
				<BrandGrid brands={brands?.slice(6,12) ?? []}/>
				<GoodsGrid goods={goods?.slice(6,12) ?? []} />
			</div>
		</>
	)
}
