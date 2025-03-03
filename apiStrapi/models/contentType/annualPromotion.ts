export interface AnnualPromotionContent {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  sku: string;
  image: Image;
  image_mobile: Image;
  image_header: Image;
}

interface Image {
  data: Data;
}

interface Data {
  id: number;
  attributes: AttributesImage;
}

interface AttributesImage{
  name: string;
  size: number;
  url: string;
}