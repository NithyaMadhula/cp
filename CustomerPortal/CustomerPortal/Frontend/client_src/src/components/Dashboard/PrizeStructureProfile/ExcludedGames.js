import React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const ExcludedGames = (props) => {
  const hasData = () => props.data && props.data.length;
  const [value, setValue] = React.useState([]);

  return (
    <>
      {hasData() ? (
        <FormControl
          style={{ minWidth: '200px', maxWidth: '200px', margin: '0 10px' }}
          title={props.data
            .filter((x) => props.excludeGameIds.indexOf(x.gameID) > -1)
            .map((x) => x.description.replace(/([A-Za-z0-9]+) :.+/g, '$1'))
            .join('\n')}
        >
          <InputLabel>Excluded Games</InputLabel>
          <Select
            style={{ maxHeight: '50vh' }}
            multiple
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              props.setExcludeGameIds(e.target.value);
              props.update(e.target.value);
            }}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected) =>
              props.data
                .filter((x) => value.indexOf(x.gameID) > -1)
                .map((x) => x.description.replace(/([A-Za-z0-9]+) :.+/g, '$1'))
                .join(', ')
            }
          >
            {props.data.map((game) => (
              <MenuItem key={game.gameID} value={game.gameID}>
                <Checkbox color="primary" checked={value.indexOf(game.gameID) > -1} />
                <ListItemText primary={game.description} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      ) : (
        ''
      )}
    </>
  );
};

export default ExcludedGames;
