import React, { useState, useEffect } from 'react';
import { Card, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from '../Dashboard.module.css';
import TicketPrices from './TicketPrices';
import LotteriesOfInterest from './LotteriesOfInterest';
import ExcludedGames from './ExcludedGames';
import { fetch_data } from '../../../utils/fetch_data/fetch_data';
import Plot from 'react-plotly.js';
import CircularProgress from '@material-ui/core/CircularProgress';
import { userAuth } from '../../../authentication/authentication';
import { currency_conversion } from '../../../utils/currency/currency_conversion';

const { getTicketPrices, fetchPrizeStructureProfile } = fetch_data;
const { customer } = userAuth.getUserToken();

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const LOI_KEY = 'lotteries-of-interest';

const mapToLine = (value) => {
  let mapping = [];

  const mappedGames = (value || []).map((x) => x.gameID).filter((v, i, s) => s.indexOf(v) === i);

  for (let i = 0; i < mappedGames.length; i++) {
    const filtered = value.filter((x) => x.gameID == mappedGames[i]);

    mapping.push({
      y: filtered.map((x) => x['percentage Allocated'] * 100),
      x: filtered.map((x) => x['prize Tier Type']),
      name: `${filtered[0].gameReferenceID} - ${filtered[0].gameName || filtered[0]['game Name']}`,
      text: filtered.map((x) => x['tooltip Info']),
      source: filtered,
      type: 'line',
    });
  }
  return mapping;
};

const mapTotalToLine = (value, isComparison) => ({
  y: value.map((x) => x.averagePLPercentAllocated * 100),
  x: value.map((x) => x.prizeClassification),
  name: `${isComparison ? value[0].subDivisionCode : ''} Total % Allocation`,
  text: value.map(
    (x) =>
      `${isComparison ? value[0].subDivisionCode : ''} Total Allocation (${x.prizeClassification}) - ${
        x.averagePLPercentAllocated * 100
      }%`
  ),
  type: 'line',
  line: isComparison
    ? { width: 4.5 }
    : {
        color: 'rgb(0, 0, 0)',
        width: 4.5,
      },
});

const mapComparisonTotalToLine = (value) => {
  let mapping = [];

  const mappedSubdivision = (value || []).map((x) => x.subDivisionCode).filter((v, i, s) => s.indexOf(v) === i);

  for (let i = 0; i < mappedSubdivision.length; i++) {
    const filtered = value.filter((x) => x.subDivisionCode == mappedSubdivision[i]);

    mapping.push(mapTotalToLine(filtered, true));
  }
  return mapping;
};

const getTopPrizeComparisonOdds = (value) => {
  return [
    {
      x: value.map((x) => x.localAbbreviation),
      y: value.map((y) => y.averageOdds),
      marker: { color: value.map((x) => (x.localAbbreviation == 'VA' ? '#ff902e' : '#0D51A1')) },
      name: 'Average Odds',
      type: 'bar',
    },
  ];
};

const getTopPrizeComparisonPrize = (value) => {
  return [
    {
      x: value.map((x) => x.localAbbreviation),
      y: value.map((y) => y.averageTopPrizeAmount),
      marker: { color: value.map((x) => (x.localAbbreviation == 'VA' ? '#ff902e' : '#0D51A1')) },
      name: 'Average Top Prize',
      type: 'bar',
      text: value.map((y) => currency_conversion.currencyFormat(y.averageTopPrizeAmount)),
    },
  ];
};

const getTopPrizeComparisonPrizeOdds = (value) => {
  // averageTopPrizeOdds: 844607.80920817761,
  return [
    {
      x: value.map((x) => x.localAbbreviation),
      y: value.map((y) => numberWithCommas(y.averageTopPrizeOdds)),
      marker: { color: value.map((x) => (x.localAbbreviation == 'VA' ? '#ff902e' : '#0D51A1')) },
      name: 'Average Top Prize Odds',
      type: 'bar',
    },
  ];
};

const PrizeStructureProfile = (props) => {
  const [classficationByCustomer, setClassficationByCustomer] = useState([]);
  const [percentByExclusion, setPercentByExclusion] = useState([]);
  const [percentTotalByExclusion, setPercentTotalByExclusion] = useState([]);
  const [topPrizeByExclusion, setTopPrizeByExclusion] = useState([]);
  const [games, setGames] = useState([]);
  const [percentByCustomer, setPercentByCustomer] = useState([]);
  const [percentTotalByCustomer, setPercentTotalByCustomer] = useState([]);
  const [topPrizeByCustomer, setTopPrizeByCustomer] = useState([]);
  const [percentTotalByComparison, setPercentTotalByComparison] = useState([]);
  const [topPrizeByComparison, setTopPrizeByComparison] = useState([]);
  const [classficationByComparison, setClassficationByComparison] = useState([]);

  const [ticketPrices, setTicketPrices] = useState([]);
  const [price, setPrice] = useState(null);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [customerCodes, setCustomerCodes] = useState([customer]);
  const [excludeGameIds, setExcludeGameIds] = useState([]);

  const hasData = (data) => data && data.length;

  const getData = (value) => {
    let gameIds = excludeGameIds;
    if (value) {
      gameIds = value;
    }

    return fetchPrizeStructureProfile(
      price,
      start,
      end || new Date(),
      customerCodes ? customerCodes.join(',') : null,
      gameIds.length ? gameIds.join(',') : null
    );
  };

  const classes = useStyles();
  const fetchSearchData = () => {
    getData()
      .then((response) => {
        setClassficationByCustomer(response.classficationByCustomer);
        setGames(response.games);
        setPercentByCustomer(excludeGameIds && excludeGameIds.length ? response.percentByExclusion : response.percentByCustomer);
        setPercentTotalByCustomer(
          excludeGameIds && excludeGameIds.length ? response.percentTotalByExclusion : response.percentTotalByCustomer
        );
        setTopPrizeByCustomer(
          excludeGameIds && excludeGameIds.length ? response.topPrizeByExclusion : response.topPrizeByCustomer
        );

        if (customerCodes) {
          setPercentTotalByComparison(response.percentTotalByComparison);
          setTopPrizeByComparison(response.topPrizeByComparison);
          setClassficationByComparison(response.classficationByComparison);
        }
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getTicketPrices()
      .then((response) => {
        setTicketPrices(response);
      })
      .catch((error) => console.error(error));
  }, []);

  const updateWithExclusion = (value) => {
    getData(value)
      .then((response) => {
        setExcludeGameIds(value);
        setPercentByExclusion(response.percentByExclusion);
        setPercentTotalByExclusion(response.percentTotalByExclusion);

        setPercentByCustomer(response.percentByExclusion);
        setPercentTotalByCustomer(response.percentTotalByExclusion);
      })
      .catch((error) => console.error(error));
  };

  return (
    <main>
      <Card className={styles['dashboard-card']}>
        <form noValidate className={classes.container} style={{ width: '100%' }}>
          {(ticketPrices.length && (
            <TicketPrices
              style={{ minWidth: '100px' }}
              ticketPrices={ticketPrices}
              onchange={(e) => {
                setPrice(e.target.value);
              }}
              price={price}
            ></TicketPrices>
          )) || <CircularProgress style={{ width: '25px', height: '25px', margin: '15px' }} />}

          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            label="Game Start From:"
            placeholder=""
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />

          <TextField
            className={classes.textField}
            InputLabelProps={{ shrink: true }}
            label="Game Start To:"
            placeholder=""
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
          />

          <LotteriesOfInterest handleChange={setCustomerCodes} />
          <ExcludedGames
            data={games}
            excludeGameIds={excludeGameIds}
            setExcludeGameIds={setExcludeGameIds}
            update={updateWithExclusion}
          />

          <Button
            variant="contained"
            color="primary"
            style={{
              float: 'right',
              backgroundColor: '#159cdb',
              margin: 'auto 10px 0 auto',
            }}
            onClick={fetchSearchData}
          >
            Generate Report
          </Button>
        </form>
      </Card>
      <br />

      {(hasData(percentByCustomer) && (
        <div style={{ margin: '20px auto' }}>
          <Card>
            <Plot
              style={{ width: '100%', height: '100%' }}
              data={[...mapToLine(percentByCustomer), mapTotalToLine(percentTotalByCustomer)]}
              layout={{
                flexGrow: '1',
                width: 1250,
                height: 500,
                margin: { b: 100 },
                title: 'Prize Structure Profile',
                xaxis: { title: { text: 'Tiers', font: { size: 10.5 } } },
                yaxis: { title: { text: '% of Prize Fund Allocated', font: { size: 10.5 } } },
                hovermode: 'closest',
              }}
            ></Plot>
          </Card>
        </div>
      )) ||
        ''}

      {(hasData(percentTotalByComparison) && (
        <div style={{ margin: '20px auto' }}>
          <Card>
            <Plot
              style={{ width: '100%', height: '100%' }}
              data={mapComparisonTotalToLine(percentTotalByComparison)}
              layout={{
                flexGrow: '1',
                width: 1250,
                height: 500,
                margin: { b: 100 },
                title: 'Static Prize Structure Profiles of Selected Lotteries',
                xaxis: { title: { text: 'Tiers', font: { size: 10.5 } } },
                yaxis: { title: { text: '% of Prize Fund Allocated', font: { size: 10.5 } } },
                hovermode: 'closest',
              }}
            ></Plot>
          </Card>
        </div>
      )) ||
        ''}

      {(hasData(topPrizeByComparison) && (
        <div style={{ margin: '20px auto' }}>
          <Card style={{ display: 'flex' }}>
            <div style={{ flex: '1' }}>
              <Plot
                style={{ height: '100%' }}
                data={getTopPrizeComparisonOdds(topPrizeByComparison)}
                layout={{
                  flex: '1',
                  width: 400,
                  height: 500,
                  margin: { b: 100 },
                  title: 'Average Odds',
                  hovermode: 'closest',
                }}
              ></Plot>
            </div>
            <div style={{ flex: '1' }}>
              <Plot
                style={{ height: '100%' }}
                data={getTopPrizeComparisonPrize(topPrizeByComparison)}
                layout={{
                  flexGrow: '1',
                  width: 400,
                  height: 500,
                  margin: { b: 100 },
                  title: 'Average Top Prize',
                  hovermode: 'closest',
                }}
              ></Plot>
            </div>
            <div style={{ flex: '1' }}>
              <Plot
                style={{ height: '100%' }}
                data={getTopPrizeComparisonPrizeOdds(topPrizeByComparison)}
                layout={{
                  flexGrow: '1',
                  width: 400,
                  height: 500,
                  margin: { b: 100 },
                  title: 'Average Top Prize Odds',
                  hovermode: 'closest',
                }}
              ></Plot>
            </div>
          </Card>
        </div>
      )) ||
        ''}
    </main>
  );
};

export default PrizeStructureProfile;
