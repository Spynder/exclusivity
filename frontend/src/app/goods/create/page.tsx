"use client";

import { MediaImage, TextInput } from "@ui";
import apiFetch from "@utils/apiFetch";
import { GoodsView } from "@widgets";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

export default function NewGoodsPage() {
	const router = useRouter();

	return (
		<GoodsView editing />
	)
}
