"use client";

import {
  useCallback,
  useEffect,
  useState,
  type AnimationEvent,
  type PointerEvent,
} from "react";
import { usePathname } from "next/navigation";

import { BrandMark } from "@/components/brand/brand-mark";
import { cn } from "@/lib/utils";

import styles from "./site-intro.module.css";

const introStorageKey =
  "tavin-motors-intro-viewed-v1";

export function SiteIntro() {
  const pathname = usePathname();

  const [dismissed, setDismissed] =
    useState(false);

  const [skipping, setSkipping] =
    useState(false);

  const completeIntro = useCallback(() => {
    try {
      window.sessionStorage.setItem(
        introStorageKey,
        "viewed",
      );
    } catch {
      // Continue even when session storage is unavailable.
    }

    document.documentElement.dataset.tavinIntro =
      "hide";

    setDismissed(true);
  }, []);

  const requestSkip = useCallback(() => {
    if (dismissed || skipping) {
      return;
    }

    setSkipping(true);
  }, [dismissed, skipping]);

  useEffect(() => {
    if (pathname !== "/") {
      document.documentElement.dataset.tavinIntro =
        "hide";

      return undefined;
    }

    if (
      document.documentElement.dataset
        .tavinIntro !== "show"
    ) {
      return undefined;
    }

    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      if (
        event.key === "Escape" ||
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        requestSkip();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [pathname, requestSkip]);

  const handlePointerDown = (
    event: PointerEvent<HTMLDivElement>,
  ) => {
    if (
      event.pointerType === "mouse" &&
      event.button !== 0
    ) {
      return;
    }

    requestSkip();
  };

  const handleAnimationEnd = (
    event: AnimationEvent<HTMLDivElement>,
  ) => {
    if (event.currentTarget !== event.target) {
      return;
    }

    completeIntro();
  };

  if (pathname !== "/" || dismissed) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Tavin Motors introduction. Tap anywhere to skip."
      className={cn(
        "tm-site-intro dark",
        styles.overlay,
        skipping
          ? styles.skipping
          : styles.playing,
      )}
      onAnimationEnd={handleAnimationEnd}
      onPointerDown={handlePointerDown}
    >
      <div className={styles.grid} />

      <div className={styles.vignette} />

      <div className={styles.burgundyGlow} />

      <div className={styles.goldGlow} />

      <div
        className={cn(
          styles.streak,
          styles.streakLeft,
        )}
      />

      <div
        className={cn(
          styles.streak,
          styles.streakRight,
        )}
      />

      <div className={styles.stage}>
        <div
          className={cn(
            styles.orbit,
            styles.orbitOuter,
          )}
        />

        <div
          className={cn(
            styles.orbit,
            styles.orbitInner,
          )}
        />

        <div className={styles.pulse} />

        <div className={styles.logoShell}>
          <div className={styles.logo}>
            <BrandMark />
          </div>
        </div>

        <div className={styles.signatureLine} />

        <p className={styles.tagline}>
          Drive beyond the ordinary
        </p>

        <p className={styles.status}>
          Premium mobility, refined
        </p>
      </div>

      <button
        type="button"
        className={styles.skipButton}
        onClick={requestSkip}
        onPointerDown={(event) => {
          event.stopPropagation();
        }}
      >
        Tap anywhere to skip
      </button>
    </div>
  );
}