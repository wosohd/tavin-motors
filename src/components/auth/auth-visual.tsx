"use client";

import type { CSSProperties } from "react";

import {
  motion,
  useReducedMotion,
} from "motion/react";

import styles from "./auth-visual.module.css";

const squares = [
  {
    width: "74%",
    left: "-8%",
    top: "5%",
    rotate: -12,
    delay: "0s",
  },
  {
    width: "61%",
    left: "22%",
    top: "13%",
    rotate: 9,
    delay: "-1.5s",
  },
  {
    width: "49%",
    left: "7%",
    top: "30%",
    rotate: -5,
    delay: "-3s",
  },
  {
    width: "40%",
    left: "42%",
    top: "39%",
    rotate: 14,
    delay: "-4.5s",
  },
  {
    width: "31%",
    left: "24%",
    top: "54%",
    rotate: -16,
    delay: "-6s",
  },
];

export function AuthVisual() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className={styles.visual}
    >
      <div className={styles.grid} />

      <div className={styles.glowOne} />
      <div className={styles.glowTwo} />

      <div className={styles.stage}>
        {squares.map((square, index) => (
          <motion.div
            key={index}
            className={styles.square}
            style={
              {
                width: square.width,
                left: square.left,
                top: square.top,
                "--square-delay":
                  square.delay,
              } as CSSProperties
            }
            initial={{
              rotate: square.rotate,
            }}
            animate={
              reduceMotion
                ? {
                    rotate:
                      square.rotate,
                  }
                : {
                    rotate: [
                      square.rotate,
                      square.rotate + 7,
                      square.rotate - 4,
                      square.rotate,
                    ],
                    scale: [
                      1,
                      1.035,
                      0.985,
                      1,
                    ],
                    x: [
                      0,
                      index % 2 === 0
                        ? 7
                        : -7,
                      0,
                    ],
                    y: [
                      0,
                      index % 2 === 0
                        ? -8
                        : 8,
                      0,
                    ],
                  }
            }
            transition={{
              duration: 8 + index,
              repeat: Infinity,
              ease: "easeInOut",
              delay: index * 0.18,
            }}
          />
        ))}
      </div>

      <motion.div
        className={styles.scan}
        animate={
          reduceMotion
            ? undefined
            : {
                x: [
                  "-130%",
                  "160%",
                ],
              }
        }
        transition={{
          duration: 6,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}