import React from "react";
import PropTypes from "prop-types";
import { Box, Card, CardContent, Tab, Tabs } from "@mui/material";
// import TabOneCard from "./TabOneCard";
import TabThreeCard from "./TabThreeCard";
import TabFourCard from "./TabFourCard";

const PageCard = ({ error, flag, setValue, value, handleChange, ...props }) => {
  return (
    <Box style={{ width: "100%" }}>
      <Card>
        <CardContent>
          <Tabs
            value={value}
            onChange={handleChange}
            style={{ marginBottom: 30 }}
          >
            <Tab label="Общие" />
            <Tab label="Соцсети" />
            <Tab label="Настройка страницы" />
          </Tabs>
          {/*{value === 0 && (*/}
          {/*  <TabOneCard*/}
          {/*    error={error}*/}
          {/*    flag={flag}*/}
          {/*    setValue={setValue}*/}
          {/*    {...props}*/}
          {/*  />*/}
          {/*)}*/}
          {value === 1 && (
            <TabThreeCard
              error={error}
              flag={flag}
              setValue={setValue}
              {...props}
            />
          )}
          {value === 2 && (
            <TabFourCard
              error={error}
              flag={flag}
              setValue={setValue}
              {...props}
            />
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

PageCard.propTypes = {
  error: PropTypes.any,
  flag: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  value: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

export default PageCard;
