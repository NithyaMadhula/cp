import * as React from 'react';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import ListItemText from '@material-ui/core/ListItemText';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';

const ExcludedGames = (props: any) => {
  const hasData = () => props.data && props.data.length;
  const [value, setValue] = React.useState<any>([]);

  return (
    <>
      {hasData() ? (
        <FormControl
          style={{ minWidth: '200px', maxWidth: '200px', margin: '0 10px' }}
          title={props.data
            .filter((x: any) => props.excludeGameIds.indexOf(x.GameID) > -1)
            .map((x: any) => x.Description.replace(/([A-Za-z0-9]+) :.+/g, '$1'))
            .join('\n')}
        >
          <InputLabel>Excluded Games</InputLabel>
          <Select
            style={{ maxHeight: '50vh' }}
            multiple
            value={value}
            onChange={(e: any) => {
              setValue(e.target.value);
              props.setExcludeGameIds(e.target.value);
              props.update(e.target.value);
            }}
            input={<Input id="select-multiple-chip" />}
            renderValue={(selected: any) =>
              props.data
                .filter((x: any) => value.indexOf(x.GameID) > -1)
                .map((x: any) => x.Description.replace(/([A-Za-z0-9]+) :.+/g, '$1'))
                .join(', ')
            }
          >
            {props.data.map((game: any) => (
              <MenuItem key={game.GameID} value={game.GameID}>
                <Checkbox color="primary" checked={value.indexOf(game.GameID) > -1} />
                <ListItemText primary={game.Description} />
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
