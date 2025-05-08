"use client";

import { BrandView } from "@/widgets/BrandView/ui";
import { BrandData } from "@entities";
import { useApi } from "@hooks"
import { TextInput } from "@ui";
import { GoodsGrid, LandingBanner } from "@widgets";
import { Search } from "lucide-react";
import { useParams } from "next/navigation";

export default function BrandPage() {
	const params = useParams<{uuid: string}>();

	const { data } = useApi<BrandData>(`/api/v1/brand/${params.uuid}`);
	return (
		<div className="flex flex-col gap-10">
			<LandingBanner/>

			<BrandView brandData={data}/>

			<div className="flex flex-col gap-4 container">
				<span className="font-grafita uppercase text-3xl">Популярное у бренда</span>
				<GoodsGrid goods={data?.goods.slice(0,3) ?? []} />
			</div>
			<div className="flex flex-col gap-4 container">
				<span className="font-grafita uppercase text-3xl">Каталог</span>
				<div className="relative">
					<TextInput placeholder="Поиск" />
					<Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground" />
				</div>
				<GoodsGrid goods={data?.goods ?? []} className="grid-cols-5" />
			</div>
		</div>
	)
}
