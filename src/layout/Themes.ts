const white = "#F8F8F8";
const black = "#181818";
const greyWhite = "#9FA5AB";

export const smetaninyTheme = {
  typography: {
    fontFamily: "Jura, Arial, sans-serif",
    color: black,
  },
  palette: {
    primary: {
      main: black,
    },
    secondary: {
      light: black,
      main: black,
      dark: black,
      contrastText: white,
    },
    background: {
      default: white,
    },
  },
  shape: {
    borderRadius: 10,
  },
  overrides: {
    MuiBox: {
      root: {
        width: "100%",
      },
    },
    drawerPaper: {
      backgroundColor: black,
    },
    RaMenuItemLink: {
      root: {
        borderLeft: "3px solid #fff",
      },
      active: {
        borderLeft: "3px solid #006856",
        color: black,
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "none",
      },
      root: {
        border: "1px solid #e0e0e3",
        backgroundClip: "padding-box",
      },
    },
    MuiTableSortLabel: {
      root: {
        color: black,
      },
    },
    MuiButton: {
      contained: {
        backgroundColor: white,
        color: black,
        boxShadow: "none",
      },
    },
    MuiAppBar: {
      colorSecondary: {
        color: black,
        backgroundColor: white,
      },
      active: {
        borderLeft: "3px solid #102520",
      },
    },
    MuiLinearProgress: {
      colorPrimary: {
        backgroundColor: greyWhite,
      },
      barColorPrimary: {
        backgroundColor: greyWhite,
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        "&$disabled": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      },
    },
  },
};
