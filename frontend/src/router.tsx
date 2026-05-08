import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import { RouteObject } from "react-router";

import SidebarLayout from "src/layouts/SidebarLayout";
import BaseLayout from "src/layouts/BaseLayout";

import SuspenseLoader from "src/components/SuspenseLoader";
import InvoiceDetails from "./content/Case/caseNonPaidInvoices/InvoiceDetails";
import Credits from "./content/credits";
import ClientDetails from "./content/clients/clientDetails";
import CreditsDetails from "./content/credits/creditsDetails";
import DueDateDetails from "./content/credits/creditsDetails/dueDateDetails/caseNonPaidInvoices/InvoiceDetails";
import AgreementsHistory from "./content/Case/agreement/AgreementHistory";
import { CaseAffectToUser } from "./content/superviseur/affectationAndReaffectaion/CaseAffectToUser";
import DashboardCrypto from "src/content/dashboards/main";

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const ChatbotPage = Loader(lazy(() => import('src/content/chatbot/ChatbotPage')));
const ConversationsPage = Loader(lazy(() => import('src/content/chatbot/ConversationsTab')));

// Pages
const Home = Loader(lazy(() => import("src/content/home")));

// Dashboards
const Crypto = Loader(lazy(() => import("src/content/dashboards/main")));

// Application routes
const Cases = Loader(lazy(() => import("src/content/Cases")));
const Case = Loader(lazy(() => import("src/content/Case")));
const Contrat = Loader(lazy(() => import("src/content/contrat")));
const Tasks = Loader(lazy(() => import("src/content/tasks")));
const Clients = Loader(lazy(() => import("src/content/clients")));
const Guarantees = Loader(lazy(() => import("src/content/guarantees")));
const Supply = Loader(lazy(() => import("src/content/supplyPage")));

const routes: RouteObject[] = [
  {
    path: "/chat/negociation",
    element: <ChatbotPage />,
  },
  {
    path: "",
    element: <BaseLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "overview",
        element: <Navigate to="/" replace />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
  {
    path: "dashboards",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="crypto" replace />,
      },
      {
        path: "crypto",
        element: <Crypto />,
      },
    ],
  },
  {
    path: "cases",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Cases />,
      },
    ],
  },
  {
    path: "case/:id",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Case />,
      },
    ],
  },
  {
    path: "alimentation/:type",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Supply />,
      },
    ],
  },
  {
    path: "credit/:creditId",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Guarantees />,
      },
    ],
  },
  {
    path: "contrat/:contratId",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Contrat />,
      },
    ],
  },
  {
    path: "invoice/:dueDateId",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <InvoiceDetails />,
      },
    ],
  },
  {
    path: "dueDate/:dueDateId",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <DueDateDetails />,
      },
    ],
  },
  {
    path: "tasks/:selectedCaseId",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Tasks />,
      },
    ],
  },
  {
    path: "client/:clientId",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <ClientDetails />,
      },
    ],
  },
  {
    path: "clients",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Clients />,
      },
    ],
  },
  {
    path: "credits",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Credits />,
      },
    ],
  },
  {
    path: "credits/:creditId",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <CreditsDetails />,
      },
    ],
  },
  {
    path: "agreement/agreementHistory",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <AgreementsHistory />,
      },
    ],
  },
  {
    path: "supervisor/affectation",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <CaseAffectToUser />,
      },
    ],
  },
  {
    path: "dashboard",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <DashboardCrypto />,
      },
    ],
  },
  // ✅ Conversations Chatbot
  {
    path: "chatbot/conversations",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <ConversationsPage />,
      },
    ],
  },
  {
    path: "management",
    element: <SidebarLayout />,
    children: [
      {
        path: "",
        element: <Navigate to="transactions" replace />,
      },
      {
        path: "transactions",
      },
      {
        path: "profile",
        children: [
          {
            path: "",
            element: <Navigate to="details" replace />,
          },
        ],
      },
    ],
  },
];

export default routes;