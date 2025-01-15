import VenueAndContactInfo from "@/views/front-pages/events/AdditionalInfo";
import EventDetails from "@/views/front-pages/events/EventDetails";
import EventHeader from "@/views/front-pages/events/EventHeader";
import TicketBooking from "@/views/front-pages/events/TicketBooking";
import { Grid } from "@mui/material";
import frontCommonStyles from "@views/front-pages/styles.module.css";

interface EventProps {
  params: {
    slug: string;
  };
}

export default function EventDetailPage({ params }: EventProps) {
  const { slug } = params;

  // Data event statis
  const events = [
    {
      slug: "healthtech-innovation-summit",
      title: "HealthTech Innovation Summit",
      date: "2024-09-18",
      location: "Jakarta, Indonesia",
      city: "Jakarta",
      time: "17.00",
      description: "Showcasing how technology is transforming healthcare.",
      price: 30.0,
      availableTickets: 100,
      venue: "Grand Plaza Convention Center",
      address: "789 Convention Blvd, Jakarta",
      contactEmail: "info@example.com",
      contactPhone: "345345",
      gallery: [
        "/images/front/2.jpg",
        "/images/front/3.jpg",
        "/images/front/2.jpg",
      ],
      terms:
        "Registration is mandatory for all attendees. Tickets are non-transferable unless prior approval is obtained.",
      refundPolicy:
        "Refunds are allowed for cancellations made at least 30 days before the event.",
    },
  ];

  const event = events.find((event) => event.slug === slug);

  if (!event) {
    return <div>Event not found</div>;
  }

  return (
    <>
      <EventHeader
        title={event.title}
        date={event.date}
        location={event.location}
        time={event.time}
        backgroundImage="/images/front/2.jpg"
      />
      <div
        className={frontCommonStyles.layoutSpacing}
        style={{ marginBottom: "100px" }}
      >
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={8}>
            <EventDetails
              description={event.description}
              gallery={event.gallery}
              terms={event.terms}
              refundPolicy={event.refundPolicy}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TicketBooking
              price={event.price}
              availableTickets={event.availableTickets}
              eventSlug={event.slug}
              eventTitle={event.title}
              eventLocation={event.location}
              eventDate={event.date}
            />
            <VenueAndContactInfo
              venue={event.venue}
              address={event.address}
              contactEmail={event.contactEmail}
              contactPhone={event.contactPhone}
              city={event.city}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
}
