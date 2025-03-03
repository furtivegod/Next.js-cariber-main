export interface PrivacyPolicyContent {
  id: number;
  title: string;
  paragraph: Paragraph[];
  refund_policy: RefundPolicy;
  footer: string;
}

interface RefundPolicy{
  id: number;
  title: string;
  description: string;
  paragraph: Paragraph[];
}

interface Paragraph {
  id: number;
  title: string;
  description: string;
}