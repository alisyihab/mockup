"use client";

// React Imports
import { useEffect } from "react";

// Type Imports
import type { Mode } from "@core/types";

// Component Imports
import { useSettings } from "@core/hooks/useSettings";
import HeaderWithSection from "./HeaderWithSection";
import UpcomingEvents from "./UpcomingEvents";
import CategoryList from "./category";
import TopEvent from "./TopEvent";
import EventList from "./PopularEvent";
import CustomerReviews from "./CustomerReviews";
import PopularByCountry from "./Popularcountry";

const LandingPageWrapper = ({ mode }: { mode: Mode }) => {
  // Hooks
  const { updatePageSettings } = useSettings();

  // For Page specific settings
  useEffect(() => {
    return updatePageSettings({
      skin: "default",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <HeaderWithSection />
      <CategoryList />
      <UpcomingEvents />
      <TopEvent />
      <EventList />
      <CustomerReviews />
      <PopularByCountry></PopularByCountry>
    </>
  );
};

export default LandingPageWrapper;
