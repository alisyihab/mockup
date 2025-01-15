"use client";

// React Imports
import { useState } from "react";

// Next Imports
import Link from "next/link";

// MUI Imports
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import TextField from "@mui/material/TextField";
import type { Theme } from "@mui/material/styles";

// Third-party Imports
import classnames from "classnames";

// Type Imports
import type { Mode } from "@core/types";

// Component Imports
import Logo from "@components/layout/shared/Logo";
import ModeDropdown from "@components/layout/shared/ModeDropdown";
import FrontMenu from "./FrontMenu";
import CustomIconButton from "@core/components/mui/IconButton";

// Util Imports
import { frontLayoutClasses } from "@layouts/utils/layoutClasses";

// Styles Imports
import styles from "./styles.module.css";

const Header = ({ mode }: { mode: Mode }) => {
  // States
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk search

  // Hooks
  const isBelowLgScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("lg")
  );

  // Detect window scroll
  const trigger = useScrollTrigger({
    threshold: 0,
    disableHysteresis: true,
  });

  // Handle Search Input
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Search Query:", searchQuery);
    // Tambahkan logika untuk mengarahkan ke halaman hasil pencarian
  };

  return (
    <header className={classnames(frontLayoutClasses.header, styles.header)}>
      <div
        className={classnames(frontLayoutClasses.navbar, styles.navbar, {
          [styles.headerScrolled]: trigger,
        })}
      >
        <div
          className={classnames(
            frontLayoutClasses.navbarContent,
            styles.navbarContent
          )}
        >
          {isBelowLgScreen ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <IconButton
                onClick={() => setIsDrawerOpen(true)}
                className="-mis-2"
              >
                <i className="ri-menu-line" />
              </IconButton>
              <Link href="/">
                <Logo />
              </Link>
              <FrontMenu
                mode={mode}
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            </div>
          ) : (
            <div className="flex items-center gap-10">
              <Link href="/">
                <Logo />
              </Link>
              <FrontMenu
                mode={mode}
                isDrawerOpen={isDrawerOpen}
                setIsDrawerOpen={setIsDrawerOpen}
              />
            </div>
          )}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Bar */}
            {!isBelowLgScreen && (
              <TextField
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search..."
                size="small"
                variant="outlined"
                onKeyPress={(e) => {
                  if (e.key === "Enter") handleSearchSubmit();
                }}
              />
            )}
            <ModeDropdown />
            {isBelowLgScreen ? (
              <CustomIconButton
                component={Link}
                variant="contained"
                href="/login"
                color="primary"
              >
                <i className="ri-shopping-cart-line text-xl" />
              </CustomIconButton>
            ) : (
              <Button
                component={Link}
                variant="contained"
                href="/login"
                target="_blank"
                startIcon={<i className="ri-user-shared-line text-xl" />}
                className="whitespace-nowrap"
              >
                Login / Register
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
