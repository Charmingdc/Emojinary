import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { IconContext } from "@phosphor-icons/react";
import { SoundProvider } from "@/contexts/SoundContext";

import App from "./App.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <SoundProvider>
        <BrowserRouter>
          <IconContext.Provider
            value={{
              size: 20,
              weight: "bold",
              mirrored: false,
              className: "-mt-1"
            }}
          >
            <App />
          </IconContext.Provider>
        </BrowserRouter>
        <ReactQueryDevtools />
      </SoundProvider>
    </QueryClientProvider>
  </StrictMode>
);
