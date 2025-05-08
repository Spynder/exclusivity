"use client";

import { Goods } from "@entities";
import { useApi } from "@hooks";
import { TextInput } from "@ui";
import apiFetch from "@utils/apiFetch";
import { GoodsView } from "@widgets";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function NewGoodsPage() {
	const router = useRouter();
	const params = useParams<{uuid: string}>();

	const { data } = useApi<Goods>(`/api/v1/goods/${params.uuid}`);

	return (
		<GoodsView goods={data} />
	)
}
