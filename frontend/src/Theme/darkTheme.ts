import { DefaultTheme } from 'styled-components';
import baseTheme from './baseTheme';

const darkTheme: DefaultTheme = {// Constructs a type with all properties of Type set to optional. This utility will return a type that represents all subsets of a given type.
  ...baseTheme,
  colors: {
    background: '#343a40',
    text: '#FFFFFF',
    primary: '#007bff',
    secondary: '#6c757d',
    success: "#28a745",
    danger: "#dc3545",
    warning: "#ffc107",
    info: "#17a2b8",
    border: '#495057',
  },
};

export default darkTheme;
