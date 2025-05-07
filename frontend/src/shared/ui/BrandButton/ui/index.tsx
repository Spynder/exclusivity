import Image from "next/image";

interface BrandButtonProps {
	src?: string;
	title?: string;
	description?: string;
	positions?: number;
}

export function BrandButton({
	src,
	title="Real Style",
	description="Верхняя одежда",
	positions=26,
}: Readonly<BrandButtonProps>) {
	return (
		<div className="flex flex-col space-y-2">
			<div className="h-52 w-full">
				{
					src ? (
						<Image src={src} alt={title} fill />
					) : (
						<div className="h-52 w-full bg-gray-100 flex items-center justify-center">
							<Image src="/no-image.svg" alt="no-image" width={50} height={50} />
						</div>
					)
				}
			</div>
			<span className="text-2xl font-medium uppercase">{title}</span>
			<div className="flex flex-row justify-between text-gray-600">
				<span>{description}</span>
				<span>{positions} позиций в каталоге</span>
			</div>
		</div>

	)
}
