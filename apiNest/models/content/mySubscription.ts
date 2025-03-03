export interface MySubscription {
  id: string;
  subscription_date: string;
  activate: string;
  createDate: string;
  updateDate: string;
  access_group: AccessGroup;
}

export interface AccessGroup {
  id: number;
  name: string;
  duration: string;
  createDate: string;
  updateDate: string;
  regular_price: number;
  sku: string;
  access_type: string;
  deletedAt: string;
}