

import { useState } from "react";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { brand, markets, navigation, type MarketId } from "@/content/site";
import { useMarket } from "@/hooks/use-market";
import { Button } from "@/components/ui/button";
import aureliaLogo from "@/assets/logo.png";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const navigationAnchors = {
  "/exclusive-projects": "/exclusive-projects",
  "/properties": "/properties",
  "/property-management": "/property-management",
  "/about": "/about",
} as const;

export function SiteHeader() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const { market, setMarket } = useMarket();
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";

  const chooseMarket = (next: MarketId) => {
    setMarket(next);
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`site-header${isHome ? " site-header--overlay" : ""}`}
    >
      <div className="site-header__inner">

        {/* Brand Logo */}
        <a
  className="brand-lockup"
  href="/#/"
  aria-label={`${brand.name} home`}
  onClick={closeMenu}
>
  <img
    className="brand-lockup__mark"
    src={aureliaLogo}
    alt="Aurelia Real Estate Logo"
  />

 
</a>

        {/* Desktop Navigation */}
        <nav className="site-nav" aria-label="Main navigation">
          {navigation.map((item) => (
            <a
              key={item.to}
              href={navigationAnchors[item.to as keyof typeof navigationAnchors]}
              className={
                pathname === item.to
                  ? "site-nav__link site-nav__link--active"
                  : "site-nav__link"
              }
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="site-header__actions">
          <div className="market-switcher">
            <MarketSelect
              value={market}
              onChange={chooseMarket}
            />
          </div>

          <Button className="header-enquire" asChild>
            <a href="/#contact">
              Enquire now
              <ArrowUpRight aria-hidden="true" />
            </a>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <Button
          className="site-menu-toggle"
          variant="outline"
          size="icon"
          type="button"
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X aria-hidden="true" />
          ) : (
            <Menu aria-hidden="true" />
          )}
        </Button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`mobile-navigation${
          menuOpen ? " mobile-navigation--open" : ""
        }`}
        id="mobile-navigation"
        aria-hidden={!menuOpen}
      >
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <a
              key={item.to}
              href={navigationAnchors[item.to as keyof typeof navigationAnchors]}
              className={
                pathname === item.to
                  ? "mobile-navigation__link mobile-navigation__link--active"
                  : "mobile-navigation__link"
              }
              onClick={closeMenu}
            >
              <span>{item.label}</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
          ))}
        </nav>

        {/* Mobile Market Selector */}
        <div className="mobile-navigation__markets">
          <MarketSelect
            value={market}
            onChange={chooseMarket}
          />
        </div>

        {/* Mobile Enquire Button */}
        <Button
          className="mobile-navigation__enquire"
          asChild
        >
          <a href="/#contact" onClick={closeMenu}>
            Enquire now
            <ArrowUpRight aria-hidden="true" />
          </a>
        </Button>
      </div>
    </header>
  );
}

/* Market Selector - Pune / Dubai */
function MarketSelect({
  value,
  onChange,
}: {
  value: MarketId;
  onChange: (market: MarketId) => void;
}) {
  return (
    <Select
      value={value}
      onValueChange={(nextValue) => {
        if (nextValue === "dubai" || nextValue === "pune") {
          onChange(nextValue);
        }
      }}
    >
      <SelectTrigger
        className="market-select-trigger"
        aria-label="Choose your location"
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent className="market-select-content">
        {(Object.values(markets) as (typeof markets)[MarketId][]).map(
          (item) => (
            <SelectItem
              key={item.id}
              value={item.id}
            >
              <span className="market-select-option">
                <span aria-hidden="true">{item.flag}</span>
                <span>{item.name}</span>
              </span>
            </SelectItem>
          )
        )}
      </SelectContent>
    </Select>
  );
}

