import React from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import PrizeStructureTable from "./PrizeStructureTable";
import IndexingGameDetailsInformation from "./IndexingGameDetailsInformation";

//Styles
import {
  GameMainContainer,
  GameDetailsContainer,
  GameInfoContainer,
  GameTitle,
  GameAnalyticContainer,
} from "./styles";

//Components
import GameAnalytics from "./ContentBlocks/GameAnalytics/GameAnalytics";
import GamePhotos from "./ContentBlocks/GamePhotos/GamePhotos";

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: 224,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
}));

const textFieldStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "24ch",
    },
    "& .MuiInputLabel-root": {
      fontWeight: 700,
      textTransform: "uppercase",
      color: "#5E5E5E",
    },
    "& .MuiInputBase-root input": {
      textTransform: "capitalize",
    },
  },
}));

const IndexingGameDetails = (props) => {
  const classes = useStyles();
  const textClasses = textFieldStyles();
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(true);

  const handleChange = (event, newValue) => {
    setIndex(newValue);
  };

  return (
    <Drawer anchor="bottom" open={open}>
      <div
        style={{
          height: "100vh",
          width: "100%",
          overflowY: "scroll",
          display: "flex",
          flexWrap: "nowrap",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={index}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
          style={{ height: "100%", minWidth: "175px" }}
          TabIndicatorProps={{ style: { background: "#ff682e" } }}
        >
          <Tab
            label="Game Details"
            {...a11yProps(0)}
            style={{ color: index !== 0 ? "#0D51A1" : "#ff682e" }}
          />
          <Tab
            label="Historical Sales"
            {...a11yProps(1)}
            style={{ color: index !== 1 ? "#0D51A1" : "#ff682e" }}
          />
          <Tab
            label="Prize Structure"
            {...a11yProps(2)}
            style={{ color: index !== 2 ? "#0D51A1" : "#ff682e" }}
          />
          <Tab
            label="Back To Results"
            color="primary"
            onClick={() => setOpen(false)}
            style={{ color: "#0D51A1", fontWeight: "700" }}
          />
        </Tabs>
        <div
          hidden={index !== 0}
          style={{ flexGrow: "1", background: "#EEEEEE" }}
        >
          <GameMainContainer>
            <GameTitle>{props.gameData.gameName}</GameTitle>
            <GameDetailsContainer>
              <GamePhotos
                concept={false}
                gameData={props.gameData}
              ></GamePhotos>
              <GameInfoContainer className={textClasses.root}>
                <IndexingGameDetailsInformation data={props.gameData} />
              </GameInfoContainer>
            </GameDetailsContainer>
          </GameMainContainer>
        </div>
        <div hidden={index !== 1} style={{ flexGrow: "1" }}>
          <GameAnalyticContainer>
            <GameAnalytics gameData={props.gameData} />
          </GameAnalyticContainer>
        </div>
        <div hidden={index !== 2} style={{ flexGrow: "1" }}>
          <PrizeStructureTable data={props.prizeStructure} />
        </div>
      </div>
    </Drawer>
  );
};

export default IndexingGameDetails;
