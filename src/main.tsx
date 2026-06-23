import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App";
import SeoPage from "./pages/SeoPage";
import NotFound from "./pages/NotFound";
import { initAnalytics } from "./lib/analytics";
import "./index.css";

initAnalytics();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/what-is-studnexus" element={<SeoPage slug="what-is-studnexus" />} />
          <Route path="/ai-notes-generator" element={<SeoPage slug="ai-notes-generator" />} />
          <Route path="/chat-with-pdfs" element={<SeoPage slug="chat-with-pdfs" />} />
          <Route path="/ai-quiz-generator" element={<SeoPage slug="ai-quiz-generator" />} />
          <Route path="/study-planner" element={<SeoPage slug="study-planner" />} />
          <Route path="/community" element={<SeoPage slug="community" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);
