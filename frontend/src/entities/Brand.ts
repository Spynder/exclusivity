import { Goods } from "@entities";

export interface Brand {
	uuid: string; // uuid
	telegram_id: string;
	brand_name: string;
	brand_description?: string;
	social_links?: string[];
	brand_logo_uuid: string; // uuid
	brand_banners_uuid: string; // uuid
}

export interface BrandData {
	brand?: Brand
	goods: Goods[]
}