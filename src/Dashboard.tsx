import React from "react";
import { useMediaQuery, Theme } from "@mui/material";
import Index from "./resource/dashboard";

// Определение стилей с типами
const styles: { [key: string]: React.CSSProperties } = {
  flex: { display: "flex" },
  flexColumn: { display: "flex", flexDirection: "column" },
  leftCol: { flex: 1, marginRight: "0.5em" },
  rightCol: { flex: 1, marginLeft: "0.5em" },
  singleCol: { marginTop: "1em", marginBottom: "1em" },
};

const Dashboard: React.FC = () => {
  // Типизация для useMediaQuery
  const isXSmall = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("sm"),
  );
  const isSmall = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));

  return isXSmall ? (
    <div style={styles.flexColumn}>
      <Index />
    </div>
  ) : isSmall ? (
    <div style={styles.flexColumn}>
      <div style={styles.singleCol}>
        <Index />
      </div>
    </div>
  ) : (
    <Index />
  );
};

export default Dashboard;
