import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Indexing from '../Indexing/Indexing';
import ActiveGamesSellThru from '../ActiveGamesSellThru/ActiveGamesSellThru';
import ClosedGamesSalesSellThru from '../ClosedGamesSalesSellThru/ClosedGamesSalesSellThru';
import DashboardChartView from '../DashboardChartView/DashboardChartView';
import PrizeStructureProfile from '../PrizeStructureProfile/PrizeStructureProfile';
import GamePenetration from '../GamePenetration/GamePenetration';
import NorthAmericanLottery from '../NorthAmericanLottery/NorthAmericanLottery';
import { userAuth } from '../../../authentication/authentication';
import { fetch_data } from '../../../utils/fetch_data/fetch_data';

function TabPanel(props) {
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

function a11yProps(index) {
  return {
    'id': `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.primary,
  },
}));

export default function DashboardTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [currentLottery, setCurrentLottery] = React.useState('');

  React.useEffect(() => {
    fetch_data
      .fetchLotteries()
      .then((response) => {
        const { customer } = userAuth.getUserToken();
        const lottery = response.filter((x) => x.code == customer);

        if (lottery && lottery.length) {
          setCurrentLottery(lottery[0].name);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ backgroundColor: '#0D51A1' }}>
        <Tabs value={value} onChange={handleChange} TabIndicatorProps={{ style: { background: '#ff902e' } }}>
          <Tab label="Dashboard" {...a11yProps(0)} />
          <Tab label="Indexing" {...a11yProps(1)} />
          <Tab label="Sales - Active Games" {...a11yProps(2)} />
          <Tab label="Sales - Closed Games" {...a11yProps(3)} />
          <Tab label="Game Penetration" {...a11yProps(4)} />
          <Tab label="Prize Structure Profile" {...a11yProps(5)} />
          <Tab label="US Lotteries" {...a11yProps(6)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        {/* <FeaturedGames /> */}
        <DashboardChartView lotteryName={currentLottery} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Indexing lotteryName={currentLottery}></Indexing>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ActiveGamesSellThru lotteryName={currentLottery}></ActiveGamesSellThru>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <ClosedGamesSalesSellThru lotteryName={currentLottery}></ClosedGamesSalesSellThru>
      </TabPanel>
      <TabPanel value={value} index={4}>
        <GamePenetration lotteryName={currentLottery}></GamePenetration>
      </TabPanel>
      <TabPanel value={value} index={5}>
        <PrizeStructureProfile lotteryName={currentLottery}></PrizeStructureProfile>
      </TabPanel>
      <TabPanel value={value} index={6}>
        <NorthAmericanLottery lotteryName={currentLottery}></NorthAmericanLottery>
      </TabPanel>
    </div>
  );
}
