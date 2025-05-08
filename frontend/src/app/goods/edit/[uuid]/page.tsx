"use client";

import { Goods } from "@entities";
import { useApi } from "@hooks";
import { GoodsView } from "@widgets";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditGoodsPage() {
	const router = useRouter();
	const params = useParams<{uuid: string}>();

	const { data } = useApi<Goods>(`/api/v1/goods/${params.uuid}`);

	return (
		<GoodsView goods={data} editing />
	)
}
