"use client";

import { Goods } from "@entities";
import { useApi } from "@hooks";
import { GoodsGrid } from "@widgets";


export default function GoodsPage() {
	const { data } = useApi<Goods[]>("/api/v1/goods");

	return (
		<div className="container">
			<GoodsGrid goods={data ?? []} />
		</div>
	)
}