import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { webLightTheme, makeStaticStyles } from "@/design-system/ms-fluent-for-bic-65f6c6";
import { CopilotProvider } from "@fluentui-copilot/react-provider";
import { CopilotTheme } from "@fluentui-copilot/react-copilot-theme";
import { SEGOE_SANS_WOFF2 } from "@fluentui-copilot/react-text";
import NotFound from "./pages/NotFound";
import Ride from "./pages/Ride";
import McpProject from "./pages/McpProject";
import ErpLifecycleProject from "./pages/ErpLifecycleProject";
import LegacyProject from "./pages/LegacyProject";
import Resume from "./pages/Resume";
import { PortfolioAccessProvider, ProtectedProject } from "@/components/PortfolioAccess";
import "./portfolio-accent-theme.css";
import "./card-hover-motion.css";
import { portfolioHomeRedirect } from "@/lib/portfolio-navigation";

const useStaticStyles = makeStaticStyles(`
  @font-face {
    font-family: 'Segoe Sans';
    src: url('${SEGOE_SANS_WOFF2}') format('woff2');
    font-weight: 100 900;
    font-style: normal;
  }
`);

const copilotTheme = {
  ...webLightTheme,
  colorBrandBackground: webLightTheme.colorPalettePurpleBorderActive,
  colorBrandBackgroundHover: webLightTheme.colorPalettePurpleForeground2,
  colorBrandBackgroundPressed: webLightTheme.colorPalettePurpleForeground2,
  colorBrandBackgroundSelected: webLightTheme.colorPalettePurpleForeground2,
  colorBrandBackgroundStatic: webLightTheme.colorPalettePurpleBorderActive,
  colorBrandBackground2: webLightTheme.colorPalettePurpleBackground2,
  colorBrandBackground2Hover: webLightTheme.colorPalettePurpleBackground2,
  colorBrandBackground2Pressed: webLightTheme.colorPalettePurpleBackground2,
  colorBrandBackgroundInverted: webLightTheme.colorNeutralBackground1,
  colorBrandBackgroundInvertedHover: webLightTheme.colorPalettePurpleBackground2,
  colorBrandBackgroundInvertedPressed: webLightTheme.colorPalettePurpleBackground2,
  colorBrandBackgroundInvertedSelected: webLightTheme.colorPalettePurpleBackground2,
  colorBrandForeground1: webLightTheme.colorPalettePurpleForeground2,
  colorBrandForeground2: webLightTheme.colorPalettePurpleForeground2,
  colorBrandForeground2Hover: webLightTheme.colorPalettePurpleForeground2,
  colorBrandForeground2Pressed: webLightTheme.colorPalettePurpleForeground2,
  colorBrandForegroundLink: webLightTheme.colorPalettePurpleForeground2,
  colorBrandForegroundLinkHover: webLightTheme.colorPalettePurpleForeground2,
  colorBrandForegroundLinkPressed: webLightTheme.colorPalettePurpleForeground2,
  colorBrandForegroundLinkSelected: webLightTheme.colorPalettePurpleForeground2,
  colorBrandForegroundInverted: webLightTheme.colorPalettePurpleBackground2,
  colorBrandForegroundInvertedHover: webLightTheme.colorPalettePurpleBackground2,
  colorBrandForegroundInvertedPressed: webLightTheme.colorPalettePurpleBackground2,
  colorBrandStroke1: webLightTheme.colorPalettePurpleBorderActive,
  colorBrandStroke2: webLightTheme.colorPalettePurpleBorderActive,
  colorBrandStroke2Hover: webLightTheme.colorPalettePurpleBorderActive,
  colorBrandStroke2Pressed: webLightTheme.colorPalettePurpleBorderActive,
  colorBrandStroke2Contrast: webLightTheme.colorPalettePurpleBorderActive,
  colorCompoundBrandBackground: webLightTheme.colorPalettePurpleBorderActive,
  colorCompoundBrandBackgroundHover: webLightTheme.colorPalettePurpleForeground2,
  colorCompoundBrandBackgroundPressed: webLightTheme.colorPalettePurpleForeground2,
  colorCompoundBrandForeground1: webLightTheme.colorPalettePurpleForeground2,
  colorCompoundBrandForeground1Hover: webLightTheme.colorPalettePurpleForeground2,
  colorCompoundBrandForeground1Pressed: webLightTheme.colorPalettePurpleForeground2,
  colorCompoundBrandStroke: webLightTheme.colorPalettePurpleBorderActive,
  colorCompoundBrandStrokeHover: webLightTheme.colorPalettePurpleForeground2,
  colorCompoundBrandStrokePressed: webLightTheme.colorPalettePurpleForeground2,
  colorNeutralForeground2BrandHover: webLightTheme.colorPalettePurpleForeground2,
  colorNeutralForeground2BrandPressed: webLightTheme.colorPalettePurpleForeground2,
  colorNeutralForeground2BrandSelected: webLightTheme.colorPalettePurpleForeground2,
  colorNeutralForeground3BrandHover: webLightTheme.colorPalettePurpleForeground2,
  colorNeutralForeground3BrandPressed: webLightTheme.colorPalettePurpleForeground2,
  colorNeutralForeground3BrandSelected: webLightTheme.colorPalettePurpleForeground2,
  fontFamilyBase:
    "'Segoe Sans', 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif",
};

const queryClient = new QueryClient();

const PortfolioHomeRedirect = () => {
  const { search } = useLocation();
  return <Navigate to={portfolioHomeRedirect(search)} replace />;
};

const App = () => {
  useStaticStyles();
  return (
  <QueryClientProvider client={queryClient}>
    <CopilotProvider {...CopilotTheme} theme={copilotTheme}>
      <BrowserRouter>
        <PortfolioAccessProvider>
          <Routes>
            <Route path="/" element={<PortfolioHomeRedirect />} />
            <Route path="/ride" element={<Ride />} />
            <Route path="/resume" element={<Resume />} />
            <Route path="/work/mcp-apps" element={<ProtectedProject><McpProject /></ProtectedProject>} />
            <Route path="/work/erp-agent-lifecycle" element={<ProtectedProject><ErpLifecycleProject /></ProtectedProject>} />
            <Route path="/work/data-onboarding" element={<ProtectedProject><LegacyProject key="data-onboarding" projectId="data-onboarding" /></ProtectedProject>} />
            <Route path="/work/delivery-im" element={<ProtectedProject><LegacyProject key="delivery-im" projectId="delivery-im" /></ProtectedProject>} />
            <Route path="/work/traceability" element={<ProtectedProject><LegacyProject key="traceability" projectId="traceability" /></ProtectedProject>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PortfolioAccessProvider>
      </BrowserRouter>
    </CopilotProvider>
  </QueryClientProvider>
  );
};

export default App;
