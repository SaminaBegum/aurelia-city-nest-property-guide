import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import type { MarketId } from "@/content/site";

const STORAGE_KEY = "aurelia-market";
const MarketContext = createContext<{ market: MarketId; setMarket: (market: MarketId) => void } | null>(null);

function isMarket(value: string | null): value is MarketId {
  return value === "dubai" || value === "pune";
}

function marketForPath(pathname: string): MarketId | null {
  if (pathname.startsWith("/locations/dubai")) return "dubai";
  if (pathname.startsWith("/locations/pune")) return "pune";
  return null;
}

export function MarketProvider({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const explicitMarket = marketForPath(pathname);
  const [savedMarket, setSavedMarket] = useState<MarketId>("dubai");
  const market = savedMarket;

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    const initialMarket = explicitMarket ?? (isMarket(stored) ? stored : "dubai");
    setSavedMarket(initialMarket);
    window.localStorage.setItem(STORAGE_KEY, initialMarket);
  }, [explicitMarket, pathname]);

  const setMarket = useCallback(
    (nextMarket: MarketId) => {
      setSavedMarket(nextMarket);
      window.localStorage.setItem(STORAGE_KEY, nextMarket);
    },
    [],
  );

  const value = useMemo(() => ({ market, setMarket }), [market, setMarket]);
  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) throw new Error("useMarket must be used inside MarketProvider");
  return context;
}