import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    white: '#ffffff',
    black: '#000000',
    backgroundLight: '#ebebf0',
    backgroundDark: '#232526',
    yellow: '#FFA500',
    blue: '#246199',
    text: '#7c7c80',
    link: '#007AFF',
    error: '#d70015',
    success: '#43db5b',
  }, 
  pallete: {
    1: '#5ac8fa',
    2: '#007aff',
    3: '#4cd964',
    4: '#ffcc00',
    5: '#ff9500',
    6: '#5856d6',
    7: '#ff3b30',
    8: '#ff2d55',
    9: '#ebebf0',
    10:'#013a70',
    11:'#231161',
    12:'#f5b630'
  } 
}
//...DefaultTheme.pallete,

export const colors = theme.pallete
export const randomColor = theme.pallete[Math.floor(Math.random()*Object.keys(theme.pallete).length)+1]