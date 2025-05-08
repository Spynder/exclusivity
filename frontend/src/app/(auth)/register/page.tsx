"use client";

import { Tokens } from "@entities";
import { TextInput } from "@ui";
import apiFetch from "@utils/apiFetch";
import { setCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const router = useRouter();

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const brand_name = formData.get("brand_name");
        const telegram_id = formData.get("telegram_id");
        const password = formData.get("password");
        const confirm_password = formData.get("confirm_password");

        async function success(res: Response) {
            const json = (await res.json()) as Tokens;
            setCookie('access_token', json.access_token);
            setCookie('refresh_token', json.refresh_token);
            router.push('/profile');
        }

        async function error(res?: Response) {
            alert("Ошибка регистрации.");
        }   

        apiFetch({
            endpoint: "/api/v1/register",
            data: {
				brand_name,
				telegram_id,
                password,
				confirm_password
            },
            authorize: false,
            onSuccess: success,
            onError: error
        });
    }
	

    return (
        <div className="container grow flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center p-8 gap-4 w-[30vw]">
                <div className="flex gap-2 text-2xl font-medium justify-between w-full text-center">
                    <Link href="#" className="border-b-2 basis-0 grow p-3">Регистрация</Link>
                    <Link href="/login" className="basis-0 grow p-3">Вход</Link>
                </div>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
                    <TextInput placeholder="Имя бренда" name="brand_name" />
                    <TextInput placeholder="Telegram" name="telegram_id" />
                    <TextInput type="password" placeholder="Пароль" name="password" />
                    <TextInput type="password" placeholder="Пароль еще раз" name="confirm_password" />
                    <button className="bg-foreground text-white text-xl px-4 py-3 border-0 w-full cursor-pointer">Регистрация</button>
                </form>
            </div>
        </div>
    )
}
