"use client";

import { useApi } from "@hooks";
import { GoodsButton } from "@ui";

interface Goods {
	uuid: string // uuid
	brand_uuid: string // uuid
	name: string
	description?: string
	sizes: string[]
	price: number
	images_uuid: string // uuid
}

export function GoodsGrid() {
	const { data } = useApi<Goods[]>("/api/v1/goods", {
		authorize: true
	});

	return (
		<div className="container grid grid-cols-3 gap-4 py-20">
			{
				data ? (
					data.map((goods, i) => (
						<GoodsButton
							image_uuid={`/goods/${i%3+1}.png`}
							name={goods.name}
							price={goods.price}
							key={goods.uuid}
						/>
					))
				) : (
					<p>Loading</p>
				)
			}
		</div>
	)
}
