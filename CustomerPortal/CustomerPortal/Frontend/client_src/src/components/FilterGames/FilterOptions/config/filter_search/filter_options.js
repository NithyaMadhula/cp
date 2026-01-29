import { fetch_data } from '../../../../../utils/fetch_data/fetch_data';

const { gameMetadata } = fetch_data;

export const filter_options = {
  'returnOptions': function (options) {
    return console.log(options);
  },
  'getOptions': async function () {
    try {
      let options = await gameMetadata();

      return options;
    } catch (error) {
      throw error;
    }
  },
  'theme': [
    'Money / Cash',
    'Wacky',
    'Cards',
    'Music',
    'Luck',
    'Holiday',
    'Multiplier',
    'Numbers',
    'Dice',
    'Anniversary',
    'Tic-Tac-Toe',
    'Slots',
    'Games (nonLottery)',
    'Gems',
    'Precious Metals',
    'Crossword',
    'Annuity / For Life',
    'Keno',
    'Casino',
    'Whimsical',
    'TV / Movie',
    'Sports',
    'Extended Play - Other',
    'Food',
  ],
  'color': ['Blue', 'Gold'],
  'features': ['Foil Ticket'],
  'playstyles': ['Scratch Off'],
  'orientation': ['Horizontal'],
  'price-range': ['$0-$20', '$30+'],
  'prizes': ['Cash', 'Car'],
  'picked_options': ['ticketPrice', 'color', 'licensedProperty', 'theme', 'playStyle', 'jurisdiction'],
};
