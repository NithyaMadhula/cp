import * as React from "react";
import * as PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Indexing from "./Indexing/Indexing";
import ActiveGamesSellThru from "./ActiveGamesSellThru/ActiveGamesSellThru";
import ClosedGamesSalesSellThru from "./ClosedGamesSalesSellThru/ClosedGamesSalesSellThru";
import DashboardChartView from "./DashboardChartView/DashboardChartView";
import PrizeStructureProfile from "./PrizeStructureProfile/PrizeStructureProfile";
import GamePenetration from "./GamePenetration/GamePenetration";
import NorthAmericanLottery from "./NorthAmericanLottery/NorthAmericanLottery";
import { fetch_data } from "../../shared/utils/fetch_data";
import { useHistory } from "react-router-dom"; // Import useHistory for redirection

function TabPanel(props: any) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: any) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.primary,
  },
}));

const Analytics = (props: any) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [weekEndings, setWeekEndings] = React.useState([]);
  const [currentLottery, setCurrentLottery] = React.useState("");
  const history = useHistory(); // Initialize useHistory

  React.useEffect(() => {
    fetch_data
      .fetchLotteries()
      .then((response: any) => {
        fetch_data.getUser().then((user: any) => {
          const { organizationCode } = user;
          sessionStorage.setItem("customerCode", organizationCode);
          const lottery = response.filter(
            (x: any) => x.customerCode == organizationCode
          );

          if (lottery && lottery.length) {
            setCurrentLottery(lottery[0].businessName);
            }
        });
      })
      .catch((error: any) => console.error(error));

    fetch_data
      .getSalesWeekEndings()
      .then((response: any) => {
        setWeekEndings(response);
      })
      .catch((error: any) => console.error(error));

  }, [props.source]);

  const handleChange = (event: any, newValue: any) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
          <AppBar position="static" style={{ backgroundColor: "#002EE5" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          TabIndicatorProps={{ style: { background: "#ff902e" } }}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Indexing" {...a11yProps(1)} />
          <Tab label="Sales - Active Games" {...a11yProps(2)} />
          <Tab label="Sales - Closed Games" {...a11yProps(3)} />
          <Tab
            label="Game Penetration"
            {...a11yProps(4)}
            style={{ display: weekEndings?.length ? "inherit" : "none" }}
          />
          <Tab label="Prize Structure Profile" {...a11yProps(5)} />
          {/*<Tab label="US Lotteries" {...a11yProps(6)} />*/}
        </Tabs>
      </AppBar>

      <TabPanel value={value} index={0}>
        <DashboardChartView lotteryName={currentLottery} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Indexing lotteryName={currentLottery}></Indexing>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ActiveGamesSellThru lotteryName={currentLottery}></ActiveGamesSellThru>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ClosedGamesSalesSellThru
          lotteryName={currentLottery}
        ></ClosedGamesSalesSellThru>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <GamePenetration lotteryName={currentLottery}></GamePenetration>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <PrizeStructureProfile
          lotteryName={currentLottery}
        ></PrizeStructureProfile>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <NorthAmericanLottery
          lotteryName={currentLottery}
        ></NorthAmericanLottery>
      </TabPanel>
    </div>
  );
};

export default Analytics;
