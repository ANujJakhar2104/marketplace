export type ShopStackParamList = {
  ShopHome: undefined;
  ProductDetail: { productId: string };
  ReviewOrder: { productId: string; variantId: string; emiPlanId: string };
};

export type RootTabParamList = {
  Home: undefined;
  Shop: undefined;
  EMIDues: undefined;
  Limit: undefined;
  Profile: undefined;
};
