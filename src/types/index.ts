export type Color = {
  id: string;
  name: string;
};

export type Size = {
  id: string;
  name: string;
  inventory_amount: string;
};

export interface RedeemFormData {
  redeemer_name: string;
  redeemer_email: string;
  redeemer_document_number: string;
  redeemer_zipcode: string;
  redeemer_street: string;
  redeemer_number: string;
  redeemer_complement: string;
  redeemer_neighborhood: string;
  redeemer_city: string;
  redeemer_state: string;
  redeemer_country: string;
  redeemer_phone: string;
  extra_question_responses: { extra_question_id: number; answer: string }[];
  items: { customer_product_id: string; size_name: string }[];
}

export type RedeemPagesResponse = {
  page_info: {
    current_page: number;
    next_page: number | null;
    prev_page: number | null;
    total_pages: number;
    total_count: number;
  };
  redeem_pages: {
    id: string;
    status: 'ACTIVE' | 'INACTIVE';
    title: string;
    welcome_title: string;
    welcome_phrase: string;
    logo_url: string;
    background_color: string;
    button_color: string;
    items: {
      customer_product_id: string;
      name: string;
      quantity: number;
      optional: boolean;
      image_url: string;
      sizes_grid: { name: string } | null;
      sizes: { id: string; name: string }[];
    }[];
    extra_questions: {
      id: number;
      answer_type: 'text' | 'text_area' | 'select_one' | 'date';
      question: string;
      position: number;
      options: string[];
    }[];
  }[];
};

export type RedeemItem = {
  customer_product_id: string;
  name: string;
  quantity: number;
  optional: boolean;
  image_url: string;
  sizes_grid: { name: string } | null;
  sizes: { id: string; name: string }[];
  redeem_page_id: string;
};

export type RedeemPage = RedeemPagesResponse['redeem_pages'][number];