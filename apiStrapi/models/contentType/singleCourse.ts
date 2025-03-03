export interface SingleCourse {
  id: number;
  attributes: Attributes;
}

interface Attributes {
  image: Image;
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