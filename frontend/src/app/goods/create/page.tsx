"use client";

import { GoodsView } from "@widgets";
import { useRouter } from "next/navigation";

export default function NewGoodsPage() {
	const router = useRouter();

	return (
		<GoodsView editing />
	)
}
