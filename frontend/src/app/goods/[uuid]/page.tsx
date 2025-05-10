"use client";

import { BrandView } from "@/widgets/BrandView/ui";
import { BrandData, Goods } from "@entities";
import { useApi } from "@hooks";
import { GoodsView } from "@widgets";
import { useParams } from "next/navigation";

export default function NewGoodsPage() {
	const params = useParams<{uuid: string}>();

	const { data: goods } = useApi<Goods>(`/api/v1/goods/${params.uuid}`);
	const { data: brandData } = useApi<BrandData>(`/api/v1/brand/${goods?.brand_uuid}`);

	return (
		<>
			<GoodsView goods={goods} />
			<BrandView brandData={brandData} />
		</>
	)
}
