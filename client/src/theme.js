import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// Color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
      grey: {
        100: "#E4E7EB",
        200: "#CBD2D9",
        300: "#9AA5B1",
        400: "#7B8794",
        500: "#616E7C",
        600: "#52606D",
        700: "#3E4C59",
        800: "#323F4B",
        900: "#1F2933",
      },
      primary: {
        100: "#E3F8FF",
        200: "#B3ECFF",
        300: "#81DEFD",
        400: "#5ED0FA",
        500: "#40C3F7",
        600: "#2BB0ED",
        700: "#1992D4",
        800: "#127FBF",
        900: "#0B69A3",
      },
      greenAccent: {
        100: "#EFFCF6",
        200: "#C6F7E2",
        300: "#8EEDC7",
        400: "#65D6AD",
        500: "#3EBD93",
        600: "#27AB83",
        700: "#199473",
        800: "#147D64",
        900: "#0C6B58",
      },
      redAccent: {
        100: "#FFE3E3",
        200: "#FFBDBD",
        300: "#FF9B9B",
        400: "#F86A6A",
        500: "#EF4E4E",
        600: "#E12D39",
        700: "#CF1124",
        800: "#AB091E",
        900: "#8A041A",
      },
      blueAccent: {
        100: "#e1e2fe",
        200: "#c3c6fd",
        300: "#a4a9fc",
        400: "#868dfb",
        500: "#6870fa",
        600: "#535ac8",
        700: "#3e4396",
        800: "#2a2d64",
        900: "#151632",
      },
      pinkAccent: {
        100: "#FFE3EC",
        200: "#FFB8D2",
        300: "#FF8CBA",
        400: "#F364A2",
        500: "#E8368F",
        600: "#DA127D",
        700: "#BC0A6F",
        800: "#A30664",
        900: "#870557",
      },
      yellowAccent: {
         50: "#FFFAEB",
        100: "#FCEFC7",
        200: "#F8E3A3",
        300: "#F9DA8B",
        400: "#F7D070",
        500: "#E9B949",
        600: "#C99A2E",
        700: "#A27C1A",
        800: "#7C5E10",
        900: "#513C06",
      },
    }
    : {
      grey: {
        100: "#323F4B",
        200: "#3E4C59",
        300: "#52606D",
        400: "#616E7C",
        500: "#7B8794",
        600: "#9AA5B1",
        700: "#CBD2D9",
        800: "#E4E7EB",
        900: "#F5F7FA",
      },
      primary: {
        100: "#0B69A3",
        200: "#127FBF",
        300: "#1992D4",
        400: "#2BB0ED",
        500: "#40C3F7",
        600: "#5ED0FA",
        700: "#81DEFD",
        800: "#B3ECFF",
        900: "#E3F8FF",
      },
      greenAccent: {
        100: "#0C6B58",
        200: "#147D64",
        300: "#199473",
        400: "#27AB83",
        500: "#3EBD93",
        600: "#65D6AD",
        700: "#8EEDC7",
        800: "#C6F7E2",
        900: "#EFFCF6",
      },
      redAccent: {
        100: "#8A041A",
        200: "#AB091E",
        300: "#CF1124",
        400: "#E12D39",
        500: "#EF4E4E",
        600: "#F86A6A",
        700: "#FF9B9B",
        800: "#FFBDBD",
        900: "#FFE3E3",
      },
      blueAccent: {
        100: "#151632",
        200: "#2a2d64",
        300: "#3e4396",
        400: "#535ac8",
        500: "#6870fa",
        600: "#868dfb",
        700: "#a4a9fc",
        800: "#c3c6fd",
        900: "#e1e2fe",
      },
      pinkAccent: {
        100: "#870557",
        200: "#A30664",
        300: "#BC0A6F",
        400: "#DA127D",
        500: "#E8368F",
        600: "#F364A2",
        700: "#FF8CBA",
        800: "#FFB8D2",
        900: "#FFE3EC",
      },
      yellowAccent: {
         50: "#513C06",
        100: "#7C5E10",
        200: "#A27C1A",
        300: "#C99A2E",
        400: "#E9B949",
        500: "#F7D070",
        600: "#F9DA8B",
        700: "#F8E3A3",
        800: "#FCEFC7",
        900: "#FFFAEB",
      },
    }),
});

// MUI theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
          // palette values for dark mode
          primary: {
            main: colors.grey[100],
            light: colors.grey[300],
            dark: colors.grey[800],
            contrastText: colors.primary[500],
          },
          secondary: {
            main: colors.greenAccent[500],
            light: colors.greenAccent[300],
            dark: colors.greenAccent[700],
            contrastText: colors.primary[900],
          },
          error: {
            main: colors.redAccent[500],
            light: colors.redAccent[300],
            dark: colors.redAccent[700],
            contrastText: colors.primary[900],
          },
          warning: {
            main: "#ffb74d",
            light: "#ffc977",
            dark: "#c88719",
            contrastText: colors.grey[900],
          },
          info: {
            main: colors.blueAccent[500],
            light: colors.blueAccent[300],
            dark: colors.blueAccent[700],
            contrastText: colors.primary[900],
          },
          success: {
            main: colors.greenAccent[500],
            light: colors.greenAccent[300],
            dark: colors.greenAccent[700],
            contrastText: colors.primary[900],
          },
          text: {
            primary: colors.grey[100],
            secondary: colors.grey[300],
            disabled: colors.grey[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.grey[900],
            paper: colors.grey[800],
            alternate: colors.grey[700],
          },
          divider: colors.grey[700],
          action: {
            active: colors.grey[100],
            hover: `rgba(${colors.grey[100].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.08)`,
            selected: `rgba(${colors.grey[100].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.16)`,
            disabled: colors.grey[700],
            disabledBackground: `rgba(${colors.grey[100].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.12)`,
            focus: `rgba(${colors.grey[100].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.12)`,
          },
        }
        : {
          // palette values for light mode
          primary: {
            main: colors.grey[100],
            light: colors.grey[200],
            dark: colors.grey[300],
            contrastText: colors.grey[900],
          },
          secondary: {
            main: colors.pinkAccent[500],
            light: colors.pinkAccent[600],
            dark: colors.pinkAccent[400],
            contrastText: colors.grey[100],
          },
          error: {
            main: colors.redAccent[500],
            light: colors.redAccent[600],
            dark: colors.redAccent[400],
            contrastText: colors.grey[100],
          },
          warning: {
            main: "#ff9800",
            light: "#ffa726",
            dark: "#f57c00",
            contrastText: colors.grey[100],
          },
          info: {
            main: colors.blueAccent[500],
            light: colors.blueAccent[600],
            dark: colors.blueAccent[400],
            contrastText: colors.grey[100],
          },
          success: {
            main: colors.greenAccent[500],
            light: colors.greenAccent[600],
            dark: colors.greenAccent[400],
            contrastText: colors.grey[100],
          },
          text: {
            primary: colors.grey[100],
            secondary: colors.grey[300],
            disabled: colors.grey[500],
          },
          neutral: {
            dark: colors.grey[700],
            main: colors.grey[500],
            light: colors.grey[100],
          },
          background: {
            default: colors.grey[900],
            paper: colors.grey[800],
            alternate: colors.grey[700],
          },
          divider: colors.grey[700],
          action: {
            active: colors.grey[100],
            hover: `rgba(${colors.grey[100].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.04)`,
            selected: `rgba(${colors.grey[100].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.08)`,
            disabled: colors.grey[500],
            disabledBackground: `rgba(${colors.grey[100].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.12)`,
            focus: `rgba(${colors.grey[100].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.12)`,
          },
        }),
    },
    typography: {
      fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
      h1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 40,
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: "-0.01562em",
      },
      h2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 32,
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: "-0.00833em",
      },
      h3: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 24,
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: "0em",
      },
      h4: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 20,
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: "0.00735em",
      },
      h5: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: "0em",
      },
      h6: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.2,
        letterSpacing: "0.0075em",
      },
      subtitle1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.75,
        letterSpacing: "0.00938em",
      },
      subtitle2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.57,
        letterSpacing: "0.00714em",
      },
      body1: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5,
        letterSpacing: "0.00938em",
      },
      body2: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 400,
        lineHeight: 1.43,
        letterSpacing: "0.01071em",
      },
      button: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: "0.02857em",
        textTransform: "uppercase",
      },
      caption: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 1.66,
        letterSpacing: "0.03333em",
      },
      overline: {
        fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
        fontSize: 12,
        fontWeight: 400,
        lineHeight: 2.66,
        letterSpacing: "0.08333em",
        textTransform: "uppercase",
      },
    },
    shape: {
      borderRadius: 2,
    },
    transitions: {
      easing: {
        easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
        easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
        easeIn: "cubic-bezier(0.4, 0, 1, 1)",
        sharp: "cubic-bezier(0.4, 0, 0.6, 1)",
      },
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    zIndex: {
      mobileStepper: 1000,
      speedDial: 1050,
      appBar: 1100,
      drawer: 1200,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
    },
    spacing: (factor) => `${0.25 * factor}rem`,
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderRadius: theme.shape.borderRadius,
            textTransform: "none",
            fontWeight: 500,
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          }),
          contained: ({ theme }) => ({
            "&.MuiButton-containedPrimary": {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.primary.dark,
              },
            },
            "&.MuiButton-containedSecondary": {
              backgroundColor: theme.palette.secondary.main,
              color: theme.palette.secondary.contrastText,
              "&:hover": {
                backgroundColor: theme.palette.secondary.dark,
              },
            },
          }),
          outlined: ({ theme }) => ({
            borderWidth: "2px",
            "&:hover": {
              borderWidth: "2px",
            },
          }),
        },
        variants: [
          {
            props: { variant: "elevated" },
            style: ({ theme }) => ({
              boxShadow: theme.shadows[2],
              backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary[400] : theme.palette.primary[400],
              color: theme.palette.text.primary,
              "&:hover": {
                backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary[300] : theme.palette.primary[300],
                boxShadow: theme.shadows[4],
              },
            }),
          },
        ],
      },
      MuiDrawer: {
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor: theme.palette.mode === "dark" ? "#000" : theme.palette.grey[100],
            borderRight: `1px solid ${theme.palette.divider}`,
          }),
        },
      },
      
      MuiAppBar: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary[600] : theme.palette.primary[200],
            color: theme.palette.text.primary,
            height: "53px",
          }),
        },
      },
      MuiCard: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor: theme.palette.background.paper,
            borderRadius: theme.shape.borderRadius * 2,
            boxShadow: theme.palette.mode === "dark" ? "0px 4px 10px rgba(0, 0, 0, 0.25)" : "0px 4px 10px rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
          }),
        },
        variants: [
          {
            props: { variant: "outlined" },
            style: ({ theme }) => ({
              border: `1px solid ${theme.palette.divider}`,
              boxShadow: "none",
            }),
          },
        ],
      },
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            "& .MuiOutlinedInput-root": {
              borderRadius: theme.shape.borderRadius,
              "&.Mui-focused fieldset": {
                borderWidth: "2px",
              },
            },
          }),
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: 24,
          },
        },
      },
      MuiDialogActions: {
        styleOverrides: {
          root: {
            padding: "12px 24px",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderBottom: `1px solid ${theme.palette.divider}`,
            padding: "16px",
          }),
          head: ({ theme }) => ({
            backgroundColor: theme.palette.mode === "dark" ? theme.palette.primary[600] : theme.palette.primary[400],
            color: theme.palette.text.primary,
            fontWeight: 600,
          }),
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: ({ theme }) => ({
            "&:nth-of-type(even)": {
              backgroundColor: theme.palette.mode === "dark"
                ? `rgba(${theme.palette.primary[400].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.5)`
                : `rgba(${theme.palette.primary[300].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.5)`,
            },
            "&:hover": {
              backgroundColor: theme.palette.mode === "dark"
                ? `rgba(${theme.palette.primary[300].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.5)`
                : `rgba(${theme.palette.primary[200].replace('#', '').match(/../g).map(x => parseInt(x, 16)).join(', ')}, 0.5)`,
            },
          }),
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: ({ theme }) => ({
            borderColor: theme.palette.divider,
            '& .MuiDataGrid-cell': {
              borderColor: theme.palette.divider,
            },
            '& .MuiDataGrid-columnHeaders': {
              borderColor: theme.palette.divider,
            },
            '& .MuiDataGrid-columnHeader': {
              borderColor: theme.palette.divider,
            },
            '& .MuiDataGrid-columnSeparator': {
              color: theme.palette.grey.divider,
            },
            '& .MuiDataGrid-footerContainer': {
              borderColor: theme.palette.divider,
            },
          }),
        },
      },
    },
  };
};

// Context for color mode
export const ColorModeContext = createContext({
  toggleColorMode: () => { }
});

export const useMode = () => {
  const [mode, setMode] = useState("light");

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () =>
        setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return [theme, colorMode];
};