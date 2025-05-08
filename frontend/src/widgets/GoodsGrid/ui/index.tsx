"use client";

import { Goods } from "@entities";
import { useApi } from "@hooks";
import { GoodsButton } from "@ui";

interface GoodsGridProps {
	goods: Goods[],
	editing?: boolean
}

export function GoodsGrid({
	goods, editing
}: Readonly<GoodsGridProps>) {
	return (
		<div className="container grid grid-cols-3 gap-4 py-20">
			{ editing && 
				<GoodsButton createButton/>
			}
			{
				goods ? (
					goods.map((good, i) => (
						<GoodsButton key={good.uuid} goods={good} editing={editing}/>
					))
				) : (
					<p>Loading</p>
				)
			}
		</div>
	)
}
