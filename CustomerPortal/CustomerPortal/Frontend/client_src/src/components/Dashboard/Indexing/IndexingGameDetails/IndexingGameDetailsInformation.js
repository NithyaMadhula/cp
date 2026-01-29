import React from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const replacePipe = (value) => {
  return value ? value.replace('|', ', ') : '';
};

const IndexingGameDetailsInformation = (props) => {
  return (
    <>
      <Card>
        <h2 style={{ margin: '5px' }}>Summary</h2>
        <div style={{ margin: '5px' }}>
          <br />
        </div>
        <TextField label="Game Number" inputProps={{ readonly: 'true', value: props.data.gameNumber || '' }} />

        <TextField
          label="Game ID"
          inputProps={{
            readonly: 'true',
            value: props.data.gameReferenceID || '',
          }}
        />

        <TextField label="Launch Date" inputProps={{ readonly: 'true', value: props.data.startDate || '' }} />

        <TextField
          label="Ticket Price"
          inputProps={{ readonly: 'true', value: `$${Number(props.data.ticketPrice || '').toFixed(2)}` }}
        />

        <TextField
          label="Tickets Ordered"
          inputProps={{
            readonly: 'true',
            value: numberWithCommas(props.data.ticketsOrdered || 0),
          }}
        />

        <TextField
          label="Odds"
          inputProps={{
            readonly: 'true',
            value: props.data.odds || 0,
          }}
        />

        <TextField
          label="Payout"
          inputProps={{
            readonly: 'true',
            value: (props.data.prizePayoutPercent || 0) + '%',
          }}
        />

        <TextField
          label="Calculated Odds"
          inputProps={{
            readonly: 'true',
            value: props.data.calcOdds || 0,
          }}
        />

        <TextField
          label="Calculated Payout"
          g
          inputProps={{
            readonly: 'true',
            value: (props.data.calcPrizePayoutPercent || 0) + '%',
          }}
        />
        <div style={{ margin: '10px' }}>
          <br />
        </div>
      </Card>

      <Card style={{ marginTop: '15px' }}>
        <h2 style={{ margin: '5px' }}>Details</h2>
        <div style={{ margin: '5px' }}>
          <br />
        </div>
        <TextField
          label="# of Play Areas"
          inputProps={{
            readonly: 'true',
            value: props.data.numPlayAreas || '',
          }}
        />

        {props.data.numPlayStyle ? (
          <TextField
            label="# of Play Styles"
            inputProps={{
              readonly: 'true',
              value: props.data.numPlayStyle || '',
            }}
          />
        ) : (
          <></>
        )}

        <TextField
          label="# of Chances to Win"
          inputProps={{
            readonly: 'true',
            value: props.data.numChancesToWin || '',
          }}
        />

        <TextField
          label="# of Callouts"
          inputProps={{
            readonly: 'true',
            value: props.data.numCallouts || '',
          }}
        />

        <div style={{ margin: '10px' }}>
          <br />
        </div>

        <TextField
          label="Theme"
          multiline={true}
          inputProps={{
            readonly: 'true',
            value: replacePipe(props.data.theme || ''),
          }}
        />

        <TextField
          label="Playstyle"
          multiline={true}
          inputProps={{
            readonly: 'true',
            value: replacePipe(props.data.playStyle || ''),
          }}
        />

        <TextField
          label="Feature"
          multiline={true}
          inputProps={{
            readonly: 'true',
            value: replacePipe(props.data.feature || ''),
          }}
        />

        {props.data.color ? (
          <TextField
            label="Color"
            multiline={true}
            inputProps={{
              readonly: 'true',
              value: replacePipe(props.data.color),
            }}
          />
        ) : (
          <></>
        )}

        <div style={{ margin: '10px' }}>
          <br />
        </div>

        <TextField
          label="Multiple Scenes"
          inputProps={{
            readonly: 'true',
            value: props.data.multipleScenes || '',
          }}
        />

        <TextField
          label="Multi Color Imaging"
          inputProps={{
            readonly: 'true',
            value: props.data.multiColorImaging || '',
          }}
        />

        <TextField
          label="Low Top Prize"
          inputProps={{
            readonly: 'true',
            value: props.data.lowTopPrize || '',
          }}
        />

        <TextField
          label="Limited Tier"
          inputProps={{
            readonly: 'true',
            value: props.data.limitedTier || '',
          }}
        />

        <TextField
          label="Low Marquee"
          inputProps={{
            readonly: 'true',
            value: props.data.lowMarquee || '',
          }}
        />

        <TextField
          label="No-Breakeven"
          inputProps={{
            readonly: 'true',
            value: props.data.noBreakeven || '',
          }}
        />

        <TextField
          label="Spotlight"
          inputProps={{
            readonly: 'true',
            value: props.data.spotlight || '',
          }}
        />
        <div style={{ margin: '10px' }}>
          <br />
        </div>
      </Card>
    </>
  );
};

export default IndexingGameDetailsInformation;
