"use client";

// React Imports
import { useEffect } from "react";

// Type Imports
import type { Mode } from "@core/types";

// Component Imports
import Faqs from "./Faqs";
import GetStarted from "./GetStarted";
import ContactUs from "./ContactUs";
import { useSettings } from "@core/hooks/useSettings";
import HeaderWithSection from "./HeaderWithSection";
import UpcomingEvents from "./UpcomingEvents";

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
      <UpcomingEvents />
      <GetStarted />
      <Faqs />
      <ContactUs />
    </>
  );
};

export default LandingPageWrapper;
