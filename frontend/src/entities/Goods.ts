export interface Goods {
	uuid: string // uuid
	brand_uuid: string // uuid
	name: string
	description?: string
	sizes: string[]
	price: number
	images_uuid: string // uuid
}