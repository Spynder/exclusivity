"use client";

import { BrandData, Goods } from "@entities";
import { useApi } from "@hooks";
import { LandingBannerDouble, BrandGrid, InvitationBanner, GoodsGrid } from "@widgets";
import { useEffect, useState } from "react";

export default function Home() {
	const { data: brands } = useApi<BrandData[]>("/api/v1/brand");
	const { data: goods } = useApi<Goods[]>("/api/v1/goods");
	const [filteredGoods, setFilteredGoods] = useState<Goods[]>([]);

	useEffect(() => {
		if(!goods) return;
		const filtered: Goods[] = [];
		for(let good of goods) {
			const count = filtered.filter(x => x.brand_uuid === good.brand_uuid).length;
			if(count >= 3) continue;
			filtered.push(good);
		}
		filtered.sort((a,b) => (a.brand_uuid == "155227d8-58bc-42b6-b365-5c40e93ffa12") ? -1 : 1);
		setFilteredGoods(filtered);
	}, [goods]);

	return (
		<>
			<LandingBannerDouble uuid1={"155227d8-58bc-42b6-b365-5c40e93ffa12"} uuid2={"e213460f-3abb-4347-9930-e4daa410d851"}/>
			<div className="container space-y-5">
				<BrandGrid brands={brands?.slice(0,6) ?? []}/>
				
				<InvitationBanner>
					Хотите видеть ваш бренд в нашем каталоге
				</InvitationBanner>
				<GoodsGrid goods={filteredGoods.slice(0,6)} />
			</div>
			<LandingBannerDouble uuid1={"e213460f-3abb-4347-9930-e4daa410d851"} uuid2={"155227d8-58bc-42b6-b365-5c40e93ffa12"}/>
			<div className="container space-y-5">
				<BrandGrid brands={brands?.slice(6,12) ?? []}/>
				<GoodsGrid goods={filteredGoods.slice(6,12)} />
			</div>
		</>
	)
}
