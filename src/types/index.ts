export type Color = {
  id: string;
  name: string;
};

export type Size = {
  id: string;
  name: string;
  inventory_amount: string;
};

export type CustomerProduct = {
  id: string;
  name: string;
  full_name: string;
  image_url: string;
  total_inventory: number;
  expiration_date: string;
  color: Color;
  sizes: Size[];
  sizes_grid: { name: string };
};

export type CustomerProductsResponse = {
  page_info: {
    current_page: number;
    next_page: number;
    prev_page: number;
    total_pages: number;
    total_count: number;
  };
  customer_products: CustomerProduct[];
};

export type RedeemFormData = {
  id: string;
  redeemer_name: string;
  redeemer_email: string;
  redeemer_document_number: string;
  redeemer_zipcode: string;
  redeemer_street: string;
  redeemer_number: string;
  redeemer_complement?: string;
  redeemer_neighborhood: string;
  redeemer_city: string;
  redeemer_state: string;
  redeemer_country: string;
  redeemer_phone: string;
};
