import { DefaultTheme } from 'styled-components';
import baseTheme from './baseTheme';

const lightTheme: DefaultTheme = { //Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.
  ...baseTheme,
  colors: {
    background: '#FFFFFF',
    text: '#333333',
    primary: '#139adc',
    secondary: '#ffc300',
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    border: '#dee2e6',
  },
};

export default lightTheme;
