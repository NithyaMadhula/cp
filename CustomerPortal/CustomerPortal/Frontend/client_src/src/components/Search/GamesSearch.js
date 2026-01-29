import React, { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import { LinearProgress } from '@material-ui/core';

import MaterialTable from 'material-table';
import detailedGameSearch from '../../utils/fetch_data/fetch_data';
import { image_paths } from '../../utils/constants/image_paths';
const { baseImageUrl } = image_paths;

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};

const replacePipe = (value) => {
  return value ? value.replace('|', ', ') : '';
};

const fullTextSearchProps = ['gameName', 'gameNumber', 'theme', 'color', 'playStyle', 'feature'];

//Formats a game's date from an API call to a UX friendly format.
const formatDate = (date) => {
  let removeAfter = date.indexOf('T');
  date = date.substring(0, removeAfter !== -1 ? removeAfter : date.length);

  return date;
};

const getImage = (game) => {
  return (
    <>
      <div style={{ height: '55px', overflow: 'hidden' }}>
        <img
          alt={game.gameName}
          src={baseImageUrl(game.imgName)}
          style={{ width: '90px', overflow: 'hidden' }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/60/FFF?text=%20';
          }}
        />
      </div>
      <p
        style={{
          position: 'relative',
          width: '100px',
          bottom: '10px',
          background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 64%, rgba(255,255,255,1) 84%)',
        }}
      >
        &nbsp;
      </p>
    </>
  );
};

const GamesSearch = () => {
  const [lotteries, setLotteries] = React.useState([]);
  const [data, setData] = React.useState([]);

  const getTerms = (search) =>
    (search || '')
      .split(',')
      .filter((x) => x)
      .map((x) => x.trim().toLowerCase());
  const filterAndSearch = (search, game, searchProp) => {
    let searchTarget = '';
    for (let i = 0; i < fullTextSearchProps.length; i++) {
      searchTarget += String(game[fullTextSearchProps[i]]);
    }

    searchTarget += `$${game['ticketPrice']}`;
    searchTarget += lotteries[game.subDivisionCode];

    const terms = getTerms(search);
    return terms.filter((term) => searchTarget.toLowerCase().indexOf(term) > -1).length == terms.length;
  };

  return data && data.length ? (
    <MaterialTable
      title="Games"
      icons={tableIcons}
      data={data}
      options={{
        pageSize: 10,
        pageSizeOptions: [10, 20, 50, 100],
      }}
      columns={[
        {
          title: '',
          field: 'imgName',
          cellStyle: { padding: '10px 10px 0 10px' },
          width: 110,
          render: getImage,
        },
        {
          title: 'Game Name',
          field: 'gameName',
          width: 250,
          customSort: (a, b) => a.gameName.toLowerCase().localeCompare(b.gameName.toLowerCase()),
          customFilterAndSearch: (term, game) => filterAndSearch(term, game, 'gameName'),
        },
        {
          title: 'Game Number',
          field: 'gameNumber',
          width: 'calc(calc(100vw - 420px) * .06)',
          cellStyle: { minWidth: 'calc(calc(100vw - 420px) * .06)' },
        },
        {
          title: 'Jurisdiction',
          render: (game) => <>{lotteries[game.subDivisionCode]}</>,
          customSort: (a, b) => lotteries[a.subDivisionCode].localeCompare(lotteries[b.subDivisionCode]),
          width: 'calc(calc(100vw - 420px) * .15)',
          cellStyle: { minWidth: 'calc(calc(100vw - 420px) * .15)' },
        },
        {
          title: 'Ticket Price',
          render: (game) => <>{`$${Number(game.ticketPrice).toFixed(2)}`}</>,
          customSort: (a, b) => Number(a.ticketPrice) - Number(b.ticketPrice),
          width: 'calc(calc(100vw - 420px) * .06)',
          cellStyle: { minWidth: 'calc(calc(100vw - 420px) * .06)' },
        },
        {
          title: 'Launch Date',
          render: (game) => <>{formatDate(game.startDate)}</>,
          customSort: (a, b) => a.startDate.localeCompare(b.startDate),
          width: 'calc(calc(100vw - 420px) * .08)',
          cellStyle: { minWidth: 'calc(calc(100vw - 420px) * .08)' },
        },
        {
          title: 'Index',
          field: 'index',
          customSort: (a, b) => {
            if (a === 'N/A' && b !== 'N/A') {
              return 1;
            } else if (a !== 'N/A' && b === 'N/A') {
              return -1;
            } else if (a === 'N/A' && b === 'N/A') {
              return 0;
            } else {
              return Number(a.index) - Number(b.index);
            }
          },
          width: 'calc(calc(100vw - 420px) * .06)',
          cellStyle: { minWidth: 'calc(calc(100vw - 420px) * .06)' },
        },
        {
          title: 'Theme',
          render: (game) => <>{replacePipe(game.theme)}</>,
          customSort: (a, b) => a.theme.localeCompare(b.theme),
          width: 'calc(calc(100vw - 420px) * .11)',
          cellStyle: { minWidth: 'calc(calc(100vw - 420px) * .11)' },
        },
        {
          title: 'Color',
          render: (game) => <>{replacePipe(game.color)}</>,
          customSort: (a, b) => a.color.localeCompare(b.color),
          width: 'calc(calc(100vw - 420px) * .11)',
          cellStyle: { minWidth: 'calc(calc(100vw - 420px) * .11)' },
        },
        {
          title: 'Play Style',
          render: (game) => <>{replacePipe(game.playStyle)}</>,
          customSort: (a, b) => a.playStyle.localeCompare(b.playStyle),
          width: 'calc(calc(100vw - 420px) * .11)',
          cellStyle: { minWidth: 'calc(calc(100vw - 420px) * .11)' },
        },
        {
          title: 'Feature',
          render: (game) => <>{replacePipe(game.feature)}</>,
          customSort: (a, b) => a.feature.localeCompare(b.feature),
          width: 'calc(calc(100vw - 420px) * .11)',
          cellStyle: { minWidth: 'calc(calc(100vw - 420px) * .11)' },
        },
      ]}
    />
  ) : (
    <LinearProgress />
  );
};

export default GamesSearch;
