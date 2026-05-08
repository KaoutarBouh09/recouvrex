import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter } from "react-router-dom";
import App from "src/App";
import { SidebarProvider } from "src/contexts/SidebarContext";
import * as serviceWorker from "src/serviceWorker";
import { UserProvider } from "./contexts/UserContext";
import { CaseProvider } from "./contexts/CaseContext";
import { GuaranteeProvider } from "./contexts/GuaranteeContext";
import { ClientProvider } from "./contexts/ClientContext";
import { CreditProvider } from "./contexts/CreditContext";
import { DueDateProvider } from "./contexts/DueDateContext";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");

const root = createRoot(container); // Create a root.

root.render(
  <HelmetProvider>
    <UserProvider>
      <SidebarProvider>
        <CaseProvider>
          <GuaranteeProvider>
            <ClientProvider>
              <CreditProvider>
                <DueDateProvider>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </DueDateProvider>
              </CreditProvider>
            </ClientProvider>
          </GuaranteeProvider>
        </CaseProvider>
      </SidebarProvider>
    </UserProvider>
  </HelmetProvider>
);

serviceWorker.unregister();
