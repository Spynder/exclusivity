import { Button } from "@ui";
import Link from "next/link";


export default function ServicesPage() {
	return (
		<div className="container flex flex-col gap-4">
			<div className="flex flex-col gap-4">
				<h1 className="text-xl font-medium uppercase">
					Сервис Exclusivity создан для того, чтобы помочь малоизвестным
					брендам в развитии своего бизнеса.
				</h1>
				<div className="flex flex-col gap-2">
					<h2 className="text-foreground/50">
						Исходя из этого мы предоставляем комплекс услуг, которые
						направлены на увеличении посещаемости вашего бренда и,
						соотвественно, увеличении продаж.
					</h2>
					<h2 className="text-foreground/50">
						Со стороны сервиса гарантируется поток новых посетителей сервиса
						и отчетность о посещаемости по итогам каждого месяца.
					</h2>
				</div>
			</div>
			<div className="overflow-x-auto py-2">
				<table className="w-min [&_th,&_td]:border-2 [&_th,&_td]:border-black/10">
					<thead>
						<tr>
							<th className="p-4 text-left min-w-50 font-medium">Услуга</th>
							<th className="p-4 text-left min-w-50 font-medium">Длительность</th>
							<th className="p-4 text-left min-w-50 font-medium">Стоимость</th>
							<th className="p-4 text-left min-w-50 font-medium">Свободные</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="p-4 font-medium">Баннер 1 категории</td>
							<td className="p-4">7 дней</td>
							<td className="p-4">3000</td>
							<td className="p-4">4/6</td>
						</tr>
						<tr>
							<td className="p-4 font-medium">Лого 1 категории</td>
							<td className="p-4 text-foreground/50">в разработке</td>
							<td className="p-4 text-foreground/50">в разработке</td>
							<td className="p-4 text-foreground/50">в разработке</td>
						</tr>
						<tr>
							<td className="p-4 font-medium">Товар 1 категории</td>
							<td className="p-4 text-foreground/50">в разработке</td>
							<td className="p-4 text-foreground/50">в разработке</td>
							<td className="p-4 text-foreground/50">в разработке</td>
						</tr>
						<tr>
							<td className="p-4 font-medium">Баннер 2 категории</td>
							<td className="p-4">7 дней</td>
							<td className="p-4">2000</td>
							<td className="p-4">6/6</td>
						</tr>
						<tr>
							<td className="p-4 font-medium">Лого 2 категории</td>
							<td className="p-4 text-foreground/50">в разработке</td>
							<td className="p-4 text-foreground/50">в разработке</td>
							<td className="p-4 text-foreground/50">в разработке</td>
						</tr>
						<tr>
							<td className="p-4 font-medium">Товар 2 категории</td>
							<td className="p-4 text-foreground/50">в разработке</td>
							<td className="p-4 text-foreground/50">в разработке</td>
							<td className="p-4 text-foreground/50">в разработке</td>
						</tr>
					</tbody>
				</table>
			</div>
			
			<div className="flex flex-col gap-2">
				<h2 className="text-foreground/50">
					Стоимость указана без учета 75% скидки для брендов,
					которые будут выкладываться первыми.
				</h2>
				<h2 className="text-foreground/50">
					Со стороны сервиса гарантируется поток новых посетителей
					сервиса и отчетность о посещаемости по итогам каждого месяца.
				</h2>
			</div>

			<Link href="https://t.me/ignatovi4">
				<Button>Приобрести</Button>
			</Link>
		</div>
	)
}