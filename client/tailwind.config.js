/** @type {import('tailwindcss').Config} */
export const colorTokens = {
  grey: {
    0: "#FFFFFF",
    10: "#F6F6F6",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#1A1A1A",
    900: "#0A0A0A",
    1000: "#000000",
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },
};

module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        // primaryDark: colorTokens.primary[700],
        // primaryMain: colorTokens.primary[500],
        // primaryLight: colorTokens.primary[50],
        // neutralDark: colorTokens.grey[700],
        // neutralMain: colorTokens.grey[500],
        // neutralMediumMain: colorTokens.grey[400],
        // neutralMedium: colorTokens.grey[300],
        // neutralLight: colorTokens.grey[50],
        // bg: colorTokens.grey[10],
        // alt: colorTokens.grey[0],
      },
    },
  },
  plugins: [],
};
