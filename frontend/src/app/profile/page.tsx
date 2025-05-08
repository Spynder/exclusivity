"use client";

import { BrandData } from "@entities";
import { useApi } from "@hooks"
import { Button, TextInput } from "@ui";
import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const { data, loadingState } = useApi<BrandData>("/api/v1/brand/my", {
        authorize: true
    });

    function logout() {
        deleteCookie('access_token');
        deleteCookie('refresh_token');
        router.push("/login");
    }

    return (
        <div className="flex flex-col container gap-2 text-xl font-medium">
            <div className="flex items-top gap-2">
                <span className="w-40 text-[#161616] opacity-50">Почта: </span>
                <TextInput end value={data?.brand.email ?? ""} disabled/>
            </div>
            <div className="flex items-top gap-2">
                <span className="w-40 text-[#161616] opacity-50">Бренд: </span>
                <TextInput end value={data?.brand.brand_name ?? ""} disabled/>
            </div>
            <Button onClick={logout}>
                Выйти из аккаунта
            </Button>
        </div>
    )
}
