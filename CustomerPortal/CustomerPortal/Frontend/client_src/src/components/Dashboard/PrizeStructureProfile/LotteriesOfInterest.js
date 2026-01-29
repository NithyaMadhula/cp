import React, { useState, useEffect } from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

import { userAuth } from '../../../authentication/authentication';
import { fetch_data } from '../../../utils/fetch_data/fetch_data';
import { getLotteriesOfInterest, setLotteriesOfInterest } from '../../../utils/local_storage';

const { fetchLotteries } = fetch_data;
const { customer } = userAuth.getUserToken();

const LotteriesOfInterest = (props) => {
  const [lotteries, setLotteries] = useState([]);
  const [selectedLotteries, setSelectedLotteries] = useState([customer]);

  const hasData = (data) => data && data.length;

  useEffect(() => {
    fetchLotteries()
      .then((response) => {
        setLotteries(response);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      {hasData(lotteries) ? (
        <FormControl
          style={{ minWidth: '200px', maxWidth: '200px', margin: '0 10px' }}
          title={lotteries
            .filter((x) => selectedLotteries.indexOf(x.code) > -1)
            .map((x) => x.name)
            .join('\n')}
        >
          <InputLabel>Lotteries of Interest</InputLabel>
          <Select
            style={{ maxHeight: '50vh' }}
            multiple
            value={selectedLotteries}
            onChange={(e) => {
              setSelectedLotteries(e.target.value);
              props.handleChange(e.target.value);
            }}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) =>
              lotteries
                .filter((x) => selected.indexOf(x.code) > -1)
                .map((x) => x.name)
                .join(', ')
            }
          >
            {lotteries.map((lottery) => (
              <MenuItem key={lottery.code} value={lottery.code}>
                <Checkbox color="primary" checked={selectedLotteries.indexOf(lottery.code) > -1} />
                <ListItemText primary={lottery.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        <CircularProgress style={{ width: '25px', height: '25px', margin: '15px' }} />
      )}
    </>
  );
};

export default LotteriesOfInterest;
