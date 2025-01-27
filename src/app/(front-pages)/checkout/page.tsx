"use client";

import { useEffect, useState } from "react";
import { Box, Divider, Grid, Skeleton } from "@mui/material";
import Cookies from "js-cookie";
import httpClient from "@/utils/httpClient";
import OrderDetailsCard from "@/views/front-pages/checkout/OrderDetails";
import CustomerDetailsForm from "@/views/front-pages/checkout/CustomerForm";
import AttendeeDetailsList from "@/views/front-pages/checkout/AttendeesDetail";
import PriceDetailsCard from "@/views/front-pages/checkout/PriceDetails";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [event, setEvent] = useState<Event | null>(null);
  const [order, setOrder] = useState<Order | null>(null);
  const [attendees, setAttendees] = useState<Attendee[]>([]);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [orderName, setOrderName] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const router = useRouter();

  // Fetch cookies and initialize order details
  useEffect(() => {
    const orderId = Cookies.get("orderId");
    const eventId = Cookies.get("eventId");

    if (orderId && eventId) {
      setOrderDetails({ orderId, eventId });
    } else {
      window.location.href = "/";
    }
  }, []);

  // Fetch order and event details
  useEffect(() => {
    if (!orderDetails) return;

    const fetchOrderAndEvent = async () => {
      try {
        const [orderResponse, eventResponse] = await Promise.all([
          httpClient.get(
            `/events/${orderDetails.eventId}/order/${orderDetails.orderId}`,
          ),
          httpClient.get(`/events/${orderDetails.eventId}`),
        ]);

        const fetchedOrder = orderResponse.data.data;
        setOrder(fetchedOrder);
        setEvent(eventResponse.data.data);

        // Initialize attendees
        const initialAttendees =
          fetchedOrder.order_items?.flatMap((item: OrderItem) =>
            Array.from({ length: item.quantity ?? 0 }, () => ({
              first_name: "",
              last_name: "",
              email: "",
              ticket_price_id: item.ticket_price_id,
              ticket_id: item.ticket_id,
            })),
          ) || [];
        setAttendees(initialAttendees);

        const now = new Date();
        if (fetchedOrder.reserved_until && new Date(fetchedOrder.reserved_until) < now) {
          toast.error("Masa pembayaran sudah habis.");
          router.back();
          return;
        }

        if (fetchedOrder.payment_status === "AWAITING_PAYMENT" && fetchedOrder.payment_url) {
          toast.success("Mengarahkan ke halaman pembayaran...");
          window.location.href = fetchedOrder.payment_url;
        }

        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Gagal mengambil data. Silakan coba lagi.");
      }
    };

    fetchOrderAndEvent();
  }, [orderDetails, router]);

  // Timer for reserved time
  useEffect(() => {
    if (order?.reserved_until) {
      const reservedTime = new Date(order.reserved_until).getTime();
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const diff = reservedTime - now;
        if (diff <= 0) {
          clearInterval(interval);
          setTimeLeft(0);
          window.location.href = "/";
        } else {
          setTimeLeft(diff);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [order?.reserved_until]);

  const validateAllFields = (): boolean => {
    let isValid = true;
    attendees.forEach((attendee) => {
      if (!attendee.first_name.trim()) isValid = false;
      if (!attendee.last_name.trim()) isValid = false;
      if (
        !attendee.email.trim() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendee.email)
      ) {
        isValid = false;
      }
    });
    return isValid;
  };

  const handleSubmit = async () => {
    if (!orderName.first_name || !orderName.last_name || !orderName.email) {
      toast.error("Harap lengkapi detail pemesan.");
      return;
    }

    if (!attendees.every((a) => a.first_name && a.last_name && a.email)) {
      toast.error("Harap lengkapi detail peserta.");
      return;
    }

    try {
      const response = await httpClient.put(
        `/events/${orderDetails?.eventId}/order/${orderDetails?.orderId}`,
        {
          order: orderName,
          attendees: attendees,
        },
      );

      const { payment_url } = response.data;

      if (payment_url) {
        toast.success("Mengalihkan ke halaman pembayaran...");
        setTimeout(() => {
          window.location.href = payment_url;
        }, 3000);
      } else {

        toast.error("Terjadi kesalahan. URL pembayaran tidak ditemukan.");
      }
    } catch (error) {
      console.error("Error saat memproses pembayaran:", error);
      toast.error(
        "Terjadi kesalahan saat memproses pembayaran. Silakan coba lagi.",
      );
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "2rem",
          maxWidth: "1200px",
          margin: "auto",
          paddingTop: "120px",
        }}
      >
        <Grid container spacing={5}>
          <Grid item xs={12} md={8}>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                height={200}
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <OrderDetailsCard event={event} />
            )}

            <Divider sx={{ marginY: 2 }} />

            {isLoading ? (
              <Skeleton
                variant="rectangular"
                height={150}
                sx={{ marginBottom: 2 }}
              />
            ) : (
              <CustomerDetailsForm
                orderName={orderName}
                setOrderName={setOrderName}
                attendees={attendees}
                setAttendees={setAttendees}
              />
            )}

            <Divider sx={{ marginY: 2 }} />

            {isLoading ? (
              <Skeleton variant="rectangular" height={300} />
            ) : (
              <AttendeeDetailsList
                attendees={attendees}
                setAttendees={setAttendees}
              />
            )}
          </Grid>
          <Grid item xs={12} md={4}>
            {isLoading ? (
              <Skeleton variant="rectangular" height={250} />
            ) : (
              <PriceDetailsCard
                attendees={attendees}
                order={order}
                timeLeft={timeLeft}
                onSubmit={handleSubmit}
                validateAllFields={validateAllFields}
              />
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default CheckoutPage;
