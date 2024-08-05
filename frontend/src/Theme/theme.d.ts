import 'styled-components';

// Define the structure of your custom theme directly within the module declaration
 declare module 'styled-components' {
    export interface DefaultTheme  {
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
      success: string;
      danger: string;
      warning: string;
      info: string;
      border: string;
    };
  }
}
