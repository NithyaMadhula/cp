// src/ui/theme/index.js

import { createMuiTheme } from '@material-ui/core/styles';

const palette = {
  primary: { main: '#346da8' },
  secondary: { main: '#ff902e' }
};
const themeName = 'Azure Neon Carrot Hamster';

export default createMuiTheme({ palette, themeName });
