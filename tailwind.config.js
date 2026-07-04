const config  = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0a0e13",
          2: "#10151c",
          3: "#141b23",
        },
        paper: {
          DEFAULT: "#ece4d6",
          dim: "#a49c92",
        },
        amber: {
          DEFAULT: "#d4a24c",
          soft: "#e8c98a",
          glow: "rgba(212,162,76,0.35)",
        },
        mauve: "#9b7a8c",
        signal: "#7fa9a0",
        slate: "#5b6570",
        card: {
          DEFAULT: "rgba(23,31,39,0.6)",
          solid: "#171f27",
        },
        line: {
          DEFAULT: "rgba(236,228,214,0.09)",
          strong: "rgba(236,228,214,0.16)",
        },
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      maxWidth: {
        content: "1160px",
      },
      keyframes: {
        scrollpulse: {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        livepulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
      },
      animation: {
        scrollpulse: "scrollpulse 1.8s ease-in-out infinite",
        livepulse: "livepulse 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;