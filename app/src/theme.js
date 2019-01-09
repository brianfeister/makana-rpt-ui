import { createMuiTheme } from '@material-ui/core/styles';

const WHITE = '#FFFFFF';
const VERY_LIGHT_GRAY = '#D6D6D6';
const LIGHT_GRAY = '#A1A1A1';
const GRAY = '#888888';
const LIGHT_MEDIUM_GRAY = '#737373';
const MEDIUM_GRAY = '#404040';
const DARK_GRAY = '#353535';
const VERY_DARK_GRAY = '#353535';
const LIGHT_PURPLE = '#a291c2';
const PURPLE = '#7e57c2';

const SECONDARY_TEXT = GRAY;
const LINK = SECONDARY_TEXT;
const MAIN_TEXT = WHITE;
const MAIN_UI = '#4A90E2';
const MAIN_BUTTON = '#4A90E2';
const ACCENT = '#EAEAEA';
const WARNING = '#F3AC50';
const NEUTRAL = '#92afdc';
const SAFE = '#aef7a4';
const DANGER = '#e65768';
const DANGER_HOVER = '#bf2a3c';
const LIGHT_BACKGROUND_ACCENT = '#F7F7F7';
const DARK_BACKGROUND_ACCENT = '#E4E4E4';
const MAIN_UI_DARK = '#909090';
const ERROR_BUUBLE_RED = '#DB686A';
const ERROR_MSG = '#e65768';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    useNextVariants: true,
  },
  palette: {
    type: 'dark',
    primary: {
      main: PURPLE,
    },
    secondary: {
      main: LIGHT_PURPLE,
    },
    custom: {
      white: WHITE,
      veryLightGray: VERY_LIGHT_GRAY,
      lightGray: LIGHT_GRAY,
      gray: GRAY,
      lightMediumGray: LIGHT_MEDIUM_GRAY,
      mediumGray: MEDIUM_GRAY,
      veryDarkGray: VERY_DARK_GRAY,
      background: DARK_GRAY,
      secondaryText: SECONDARY_TEXT,
      accent: ACCENT,
      mainText: MAIN_TEXT,
      link: LINK,
      main: MAIN_BUTTON,
      mainUi: MAIN_UI,
      danger: DANGER,
      dangerHover: DANGER_HOVER,
      lightBackgroundAccent: LIGHT_BACKGROUND_ACCENT,
      darkBackgroundAccent: DARK_BACKGROUND_ACCENT,
      mainUiDark: MAIN_UI_DARK,
      darGrey: DARK_GRAY,
      lightGrey: LIGHT_GRAY,
      errorBubbleBackgroundAccent: ERROR_BUUBLE_RED,
      errorMsg: ERROR_MSG,
      warning: WARNING,
      neutral: NEUTRAL,
      safe: SAFE,
    },
  },
  link: {
    textDecoration: 'none',
    color: LINK
  },
  utils: {
    clearfix: {
      '&:after': {
        content: '"."',
        visibility: 'hidden',
        display: 'block',
        height: '0',
        clear: 'both'
      }
    },
    left: {
      float: 'left'
    },
    right: {
      float: 'right'
    },
    inlineFlex: {
      display: 'inline-flex'
    },
    resetMargin: {
      margin: '0'
    }
  }
});

export default theme;
