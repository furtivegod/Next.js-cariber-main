export interface TermsConditionsContent {
  id: number;
  attributes: AttributesTermsConditions;
}

interface AttributesTermsConditions {
  title: string;
  paragraph: Paragraph[];
  footer: string;
}

interface Paragraph {
  id: number;
  title: string;
  description: string;
}