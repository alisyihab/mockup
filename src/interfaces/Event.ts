interface LocationDetails {
  city: string | null;
  country: string | null;
  venue_name: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  state_or_region: string | null;
  zip_or_postal_code: string | null;
}

interface Image {
  id: number;
  url: string;
  size: number;
  file_name: string;
  mime_type: string;
  type: string;
}

interface EventSettings {
  pre_checkout_message: string;
  ticket_page_message: string | null;
  continue_button_text: string;
  required_attendee_details: boolean;
  email_footer_message: string;
  support_email: string;
  order_timeout_in_minutes: number;
  homepage_body_background_color: string;
  homepage_background_color: string;
  homepage_primary_color: string;
  homepage_primary_text_color: string;
  homepage_secondary_color: string;
  homepage_secondary_text_color: string;
  homepage_background_type: string;
  website_url: string;
  maps_url: string;
  location_details: LocationDetails;
  is_online_event: boolean;
  seo_title: string | null;
  seo_description: string | null;
  seo_keywords: string | null;
  allow_search_engine_indexing: boolean;
  price_display_mode: string;
}

interface TicketPrice {
  id: number;
  label: string | null;
  price: number;
  sale_start_date: string | null;
  sale_end_date: string | null;
  price_including_taxes_and_fees: number;
  price_before_discount: number | null;
  is_discounted: boolean;
  tax_total: number;
  fee_total: number;
  is_before_sale_start_date: boolean;
  is_after_sale_end_date: boolean;
  is_available: boolean;
  is_sold_out: boolean;
}

interface Ticket {
  id: number;
  title: string;
  type: string;
  description: string;
  max_per_order: number;
  min_per_order: number;
  sale_start_date: string | null;
  sale_end_date: string | null;
  event_id: number;
  is_before_sale_start_date: boolean;
  is_after_sale_end_date: boolean;
  start_collapsed: boolean;
  price: number;
  prices: TicketPrice[];
  taxes: any[];
  is_available: boolean;
  is_sold_out: boolean;
}

interface Organizer {
  id: number;
  name: string;
  website: string | null;
  description: string | null;
}

interface Event {
  id: number;
  title: string;
  description: string;
  description_preview: string;
  start_date: string;
  end_date: string;
  currency: string;
  slug: string;
  status: string;
  lifecycle_status: string;
  timezone: string;
  tickets: Ticket[];
  settings: EventSettings;
  images: Image[];
  organizer: Organizer;
}
