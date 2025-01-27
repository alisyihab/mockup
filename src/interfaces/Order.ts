interface Tax {
  name: string;
  value: number;
}
interface TaxesAndFeesRollup {
  fees: Tax[];
  taxes: Tax[];
}
interface OrderItem {
  id: number;
  order_id: number;
  total_before_additions: number;
  total_before_discount: number;
  price: number;
  price_before_discount: number | null;
  quantity: number;
  ticket_id: number;
  ticket_price_id: number;
  item_name: string;
  total_service_fee: number;
  total_tax: number;
  total_gross: number;
  taxes_and_fees_rollup: TaxesAndFeesRollup;
}

interface Order {
  short_id: string;
  total_before_additions: number;
  total_tax: number;
  total_gross: number;
  total_fee: number;
  status: string;
  refund_status: string | null;
  payment_status: string | null;
  currency: string;
  reserved_until: string;
  is_expired: boolean;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  public_id: string;
  is_payment_required: boolean;
  promo_code: string | null;
  taxes_and_fees_rollup: TaxesAndFeesRollup;
  order_items?: OrderItem[];
  attendees: any[];
  total_refunded: number;
  payment_url: string;
}
