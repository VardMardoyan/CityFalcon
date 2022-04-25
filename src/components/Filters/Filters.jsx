import React, { useEffect, useState } from "react";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import "./Filters.css";

const languageOptions = [
  { id: 1, name: "English", lang: "en" },
  { id: 2, name: "German", lang: "de" },
  { id: 3, name: "Chinese", lang: "zh" },
  { id: 4, name: "Italian", lang: "it" },
];

const ordersOptions = ["top", "latest", "retweeted", "read"];

const autoRefreshOptions = [
  { name: "10 seconds", time: 1000 },
  { name: "30 seconds", time: 30000 },
  { name: "1 minute", time: 60000 },
  { name: "10 minutes", time: 600000 },
];

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const Filters = ({ isFilterActive, toggleActive, refreshContent, changeLanguage, changeOrderBy, changeAutoRefreshTime, reset }) => {

  return (
    <>
      <FormControl sx={{ m: 1, width: 200 }}>
        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={() => refreshContent()}>
            Refresh
          </Button>
          <Button onClick={() => toggleActive()} variant="contained">
            Filter
          </Button>
        </Stack>
      </FormControl>
      {isFilterActive && (
        <div style={{  height: "100px" }}>
          <select className='select' onChange={(e) => changeLanguage(e)}>
            {languageOptions.map((el) => {
              return (
                <option key={el.id} value={el.lang}>
                  {el.name}
                </option>
              );
            })}
          </select>
          <select  className='select' onChange={(e) => changeOrderBy(e)}>
            {ordersOptions.map((el) => {
              return <option key={el.id}>{el}</option>;
            })}
          </select>
          <select  className='select' onChange={(e) => changeAutoRefreshTime(e)}>
            {autoRefreshOptions.map((el) => {
              return (
                <option value={el.time} key={el.id}>
                  {el.name}
                </option>
              );
            })}
          </select>
          <Button onClick={() => reset()}>Reset</Button>
        </div>
      )}
    </>
  );
};

export default Filters;
