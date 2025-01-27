export interface EventResponse {
  id: number;
  title: string;
  description: string;
  start_date: string;
  end_date: string;
  city: string;
  vanue: string;
  region: string;
  image: string;
  organizer_name: string;
  organizer_phone: string | null;
  organizer_email: string;
  link: string;
  price: number;
}
