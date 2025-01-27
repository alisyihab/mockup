// interfaces/Ticket.ts
export interface Ticket {
  id: number;
  title: string;
  description: string;
  price: string;
  type: string;
  sale_end_date: string;
  ticket_prices_id: number;
  initial_quantity_available: number;
  quantity_sold: number,
  max_per_order: number,
  min_per_order: number,
  tax_name: string,
  tax_type: string,
  tax_rate: string,
  price_after_tax: number,
}
