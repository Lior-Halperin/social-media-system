// Define a TypeScript interface for the theme
export interface Theme {
  borderRadius: string;
  fonts: {
    primary: string;
    secondary: string;
  };
  transition: string;
  colors: {
    background: string;
    text: string;
    primary: string;
    secondary: string;
    border: string;
  };
}
