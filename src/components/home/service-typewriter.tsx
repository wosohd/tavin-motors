"use client";

import {
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";

import { cn } from "@/lib/utils";

const servicePhrases = [
  "Premium vehicles selected for Kenyan roads",
  "Trusted imports from global markets",
  "A smarter vehicle marketplace",
  "Professional diagnostics and auto care",
  "Personal sourcing from request to delivery",
] as const;

const reducedMotionQuery =
  "(prefers-reduced-motion: reduce)";

const typingSpeed = 52;
const deletingSpeed = 28;
const completedPhraseDelay = 1700;
const nextPhraseDelay = 350;

type AnimationPhase = "typing" | "deleting";

type ServiceTypewriterProps = {
  className?: string;
};

function subscribeToReducedMotion(
  onStoreChange: () => void,
) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const mediaQuery = window.matchMedia(
    reducedMotionQuery,
  );

  mediaQuery.addEventListener(
    "change",
    onStoreChange,
  );

  return () => {
    mediaQuery.removeEventListener(
      "change",
      onStoreChange,
    );
  };
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(reducedMotionQuery)
    .matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export function ServiceTypewriter({
  className,
}: ServiceTypewriterProps) {
  const prefersReducedMotion =
    usePrefersReducedMotion();

  const [phraseIndex, setPhraseIndex] =
    useState(0);

  const [displayedText, setDisplayedText] =
    useState("");

  const [phase, setPhase] =
    useState<AnimationPhase>("typing");

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const currentPhrase =
      servicePhrases[phraseIndex] ??
      servicePhrases[0];

    let timer: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (
        displayedText.length <
        currentPhrase.length
      ) {
        timer = setTimeout(() => {
          setDisplayedText(
            currentPhrase.slice(
              0,
              displayedText.length + 1,
            ),
          );
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setPhase("deleting");
        }, completedPhraseDelay);
      }
    } else if (displayedText.length > 0) {
      timer = setTimeout(() => {
        setDisplayedText(
          currentPhrase.slice(
            0,
            displayedText.length - 1,
          ),
        );
      }, deletingSpeed);
    } else {
      timer = setTimeout(() => {
        setPhraseIndex(
          (currentIndex) =>
            (currentIndex + 1) %
            servicePhrases.length,
        );

        setPhase("typing");
      }, nextPhraseDelay);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [
    displayedText,
    phase,
    phraseIndex,
    prefersReducedMotion,
  ]);

  const visibleText = prefersReducedMotion
    ? servicePhrases[0]
    : displayedText;

  return (
    <div
      className={cn(
        "min-h-[4.5rem] sm:min-h-10",
        className,
      )}
      aria-label="Tavin Motors offers premium vehicles, trusted imports, marketplace services, professional auto care and personalised vehicle sourcing."
    >
      <p
        aria-hidden="true"
        className="flex max-w-3xl items-start text-lg leading-8 font-semibold tracking-[-0.01em] text-brand-burgundy sm:text-xl lg:text-2xl dark:text-brand-gold"
      >
        <span>{visibleText}</span>

        <span
          className="tm-typewriter-cursor mt-1 ml-1 inline-block h-6 w-0.5 shrink-0 bg-brand-red sm:h-7 dark:bg-brand-gold"
        />
      </p>
    </div>
  );
}