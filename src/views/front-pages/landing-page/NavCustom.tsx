import { keyframes } from "@emotion/react";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  Box,
  styled,
  Badge,
} from "@mui/material";

import { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import type { Theme } from "@mui/material/styles";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";

const bounceAnimation = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

interface StickyAppBarProps {
  isSticky: boolean;
  isCartPage: boolean;
}

const StickyAppBar = styled(AppBar)<StickyAppBarProps>(
  ({ isSticky, isCartPage }) => ({
    position: isSticky ? "fixed" : "absolute",
    top: isCartPage ? 0 : isSticky ? 0 : "20px",
    backgroundColor: isCartPage
      ? "rgba(0, 0, 0, 1)" // Opaque background for the cart page
      : isSticky
        ? "rgba(0, 0, 0, 0.8)"
        : "transparent",
    boxShadow:
      isSticky || isCartPage ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
    zIndex: 12,
    padding: "0 20px",
    animation:
      isSticky && !isCartPage ? `${bounceAnimation} 0.5s ease` : "none",
    transition: "all 0.3s ease-in-out",
  }),
);

const NavCustom = ({ currentPath }: { currentPath: string }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { cartCount } = useCart();
  const isCartPage = currentPath === "/cart" || currentPath === '/payment';

  const isMobile = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md"),
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <StickyAppBar isSticky={isSticky} isCartPage={isCartPage}>
      <Toolbar
        sx={{
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1240px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Link href="/">
            <img
              src="/logo.png"
              alt="AiraTix Logo"
              style={{ height: "50px", marginRight: "8px" }}
            />
          </Link>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#fff",
            }}
          >
            Airtix
          </Typography>
        </Box>

        {/* Navigation Links */}
        {isMobile ? (
          <>
            {/* Mobile Menu Button */}
            <IconButton
              onClick={() => setIsDrawerOpen(true)}
              className="-mis-2"
            >
              <i className="ri-menu-line" />
            </IconButton>

            {/* Drawer for Mobile Menu */}
            <Drawer
              anchor="right"
              open={isDrawerOpen}
              onClose={() => setIsDrawerOpen(false)}
            >
              <Box
                sx={{
                  width: 250,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  padding: 2,
                  backgroundColor: "rgba(0, 0, 0, 0.9)",
                  height: "100%",
                }}
              >
                <IconButton
                  onClick={() => setIsDrawerOpen(false)}
                  sx={{ color: "#fff", alignSelf: "flex-end" }}
                >
                  <i className="ri-close-line" />
                </IconButton>
                <Button
                  href="#schedule"
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  Schedule
                </Button>
                <Button
                  href="#speakers"
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  Speakers
                </Button>
                <Button
                  href="#ticket"
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  Ticket
                </Button>
                <Button
                  href="#contact"
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  Contact
                </Button>

                <Badge badgeContent={cartCount} color="primary" sx={{ mr: 3 }}>
                  <IconButton href="#cart" sx={{ color: "#fff" }}>
                    <i className="ri-shopping-bag-3-fill"></i>
                  </IconButton>
                </Badge>

                <Button
                  variant="outlined"
                  href="#login"
                  sx={{
                    color: "#fff",
                    borderColor: "#fff",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                  }}
                >
                  Login
                </Button>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
            <Button href="#schedule" sx={{ color: "#fff", fontWeight: "bold" }}>
              Schedule
            </Button>
            <Button href="#speakers" sx={{ color: "#fff", fontWeight: "bold" }}>
              Speakers
            </Button>
            <Button href="#ticket" sx={{ color: "#fff", fontWeight: "bold" }}>
              Ticket
            </Button>
            <Button href="#contact" sx={{ color: "#fff", fontWeight: "bold" }}>
              Contact
            </Button>
            <Badge badgeContent={cartCount} color="primary" sx={{ mr: 3 }}>
              <IconButton
                LinkComponent={Link}
                href="/cart"
                sx={{ color: "#fff" }}
              >
                <i className="ri-shopping-bag-3-fill"></i>
              </IconButton>
            </Badge>
            <Button
              variant="outlined"
              href="/login"
              sx={{
                color: "#fff",
                borderColor: "#fff",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
            >
              Login
            </Button>
          </Box>
        )}
      </Toolbar>
    </StickyAppBar>
  );
};

export default NavCustom;
