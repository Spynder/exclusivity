"use client";

import { Goods } from "@entities";
import { GoodsButton } from "@ui";
import { cn } from "@utils/cn";

interface GoodsGridProps {
	goods: Goods[],
	editing?: boolean,
	className?: string
}

export function GoodsGrid({
	goods, editing, className
}: Readonly<GoodsGridProps>) {
	return (
		<div className={cn("container grid gap-4 grid-cols-2 md:grid-cols-3 md:px-0", className)}>
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
