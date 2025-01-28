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

const StickyAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "isSticky" && prop !== "isCartPage",
})<StickyAppBarProps>(({ isSticky, isCartPage }) => ({
  position: isSticky ? "fixed" : "absolute",
  top: isCartPage ? 0 : isSticky ? 0 : "20px",
  backgroundColor: isCartPage
    ? "rgb(255, 255, 255)"
    : isSticky
      ? "rgba(255, 255, 255)"
      : "transparent",
  boxShadow: isSticky || isCartPage ? "0px 4px 6px rgba(0, 0, 0, 0.1)" : "none",
  zIndex: 12,
  padding: "0 20px",
  animation: isSticky && !isCartPage ? `${bounceAnimation} 0.5s ease` : "none",
  transition: "all 0.3s ease-in-out",
}));

const NavCustom = ({ currentPath }: { currentPath: string }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const isCartPage =
    currentPath === "/checkout" ||
    currentPath === "/payment-success" ||
    currentPath === "/explore";

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);

    const mediaQuery = window.matchMedia("(max-width: 960px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = () => setIsMobile(mediaQuery.matches);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
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
          <Link href="/" passHref>
            <Box
              component="a"
              sx={{
                display: "flex",
                alignItems: "center",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <img
                src="/logo.png"
                alt="AiraTix Logo"
                style={{ height: "50px", marginRight: "8px" }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color: isSticky || isCartPage ? "black" : "white",
                }}
              >
                AiraTix
              </Typography>
            </Box>
          </Link>
        </Box>

        {/* Navigation Links */}
        {isMobile ? (
          <>
            {/* Cart Icon for Mobile */}
            {/* <Badge badgeContent={cartCount} color="primary">
              <IconButton
                LinkComponent={Link}
                href="/checkout"
                sx={{
                  color: isSticky || isCartPage ? "#000" : "#fff",
                  marginLeft: "150px",
                }}
              >
                <i
                  className="ri-shopping-bag-3-fill"
                  style={{ color: isSticky || isCartPage ? "#000" : "#fff" }}
                />
              </IconButton>
            </Badge> */}

            {/* Mobile Menu Button */}
            <IconButton
              onClick={() => setIsDrawerOpen(true)}
              className="-mis-2"
              sx={{
                marginLeft: 1,
                color: isSticky || isCartPage ? "#000" : "#fff",
              }}
            >
              <i
                className="ri-menu-line"
                style={{ color: isSticky || isCartPage ? "#000" : "#fff" }}
              />
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
                  LinkComponent={Link}
                  href="/explore"
                  sx={{ color: "#fff", fontWeight: "bold" }}
                >
                  Explore &nbsp; <i className="ri-global-line"></i>
                </Button>
                <Button
                  variant="outlined"
                  href={`${process.env.NEXT_PUBLIC_FE_BASE_URL}/auth/login`}
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
            <Button
              LinkComponent={Link}
              href="/explore"
              sx={{
                color: isSticky || isCartPage ? "#000" : "#fff",
                fontWeight: "bold",
              }}
            >
              Explore &nbsp; <i className="ri-global-line"></i>
            </Button>
            {/* <Badge badgeContent={cartCount} color="primary" sx={{ mr: 3 }}>
              <IconButton
                LinkComponent={Link}
                href="/checkout"
                sx={{ color: isSticky || isCartPage ? "#000" : "#fff" }}
              >
                <i
                  className="ri-shopping-bag-3-fill"
                  style={{ color: isSticky || isCartPage ? "#000" : "#fff" }}
                />
              </IconButton>
            </Badge> */}
            <Button
              variant="outlined"
              href={`${process.env.NEXT_PUBLIC_FE_BASE_URL}/auth/login`}
              sx={{
                color: isSticky || isCartPage ? "#000" : "#fff",
                borderColor: isSticky || isCartPage ? "#000" : "#fff",
                fontWeight: "bold",
                transition: "all 0.3s ease",
                "&:hover": {
                  backgroundColor: "rgba(0, 0, 0, 0.1)",
                  color: "#000",
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
