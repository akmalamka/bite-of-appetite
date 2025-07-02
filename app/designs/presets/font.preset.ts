import type { Preflight } from 'unocss';

export const preflightFont: Preflight = {
  layer: 'fonts',

  getCSS() {
    return `
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter/Inter-Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter/Inter-ExtraBold.woff2') format('woff2');
  font-weight: 800;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter/Inter-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter/Inter-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter/Inter-Medium.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
  
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter/Inter-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter/Inter-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter/Inter-ExtraLight.woff2') format('woff2');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter/Inter-Thin.woff2') format('woff2');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Recoleta Alt';
  src: url('/fonts/Recoleta/RecoletaAlt-Black.woff2') format('woff2');
  font-weight: 900;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Recoleta Alt';
  src: url('/fonts/Recoleta/RecoletaAlt-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Recoleta Alt';
  src: url('/fonts/Recoleta/RecoletaAlt-SemiBold.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Recoleta Alt';
  src: url('/fonts/Recoleta/RecoletaAlt-Medium.woff2') format('woff2');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}
  
@font-face {
  font-family: 'Recoleta Alt';
  src: url('/fonts/Recoleta/RecoletaAlt-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Recoleta Alt';
  src: url('/fonts/Recoleta/RecoletaAlt-Light.woff2') format('woff2');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Recoleta Alt';
  src: url('/fonts/Recoleta/RecoletaAlt-Thin.woff2') format('woff2');
  font-weight: 100;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Yournotes';
  src: url('/fonts/Yournotes/Yournotes-Bold.woff2') format('woff2');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Yournotes';
  src: url('/fonts/Yournotes/Yournotes-Bold-Italic.woff2') format('woff2');
  font-weight: 700;
  font-style: italic;
  font-display: swap;
}

@font-face {
  font-family: 'Yournotes';
  src: url('/fonts/Yournotes/Yournotes-Regular.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Yournotes';
  src: url('/fonts/Yournotes/Yournotes-Regular-Italic.woff2') format('woff2');
  font-weight: 400;
  font-style: italic;
  font-display: swap;
}
`;
  },
};
