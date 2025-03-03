export interface SeasonalPromotionContent {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  sku: string;
  image: Image;
  display: boolean;
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
