import {
  Outlet,
  RouterProvider,
  ScrollRestoration,
  createBrowserRouter,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import WhatsAppFloatingButton from "./components/WhatsAppFloatingButton";
import Home from "./pages/Home";

const BrandPage = lazy(() => import("./pages/BrandPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const JoinTeamPage = lazy(() => import("./pages/JoinTeamPage"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));

function RouteFallback() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#F6F8FC] p-6" aria-busy="true">
      <div className="h-10 w-10 animate-pulse rounded-full border-4 border-[#0B1F4A]/15 border-t-[#F4B400]" />
      <span className="sr-only">Cargando página</span>
    </main>
  );
}

function withRouteFallback(Page) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Page />
    </Suspense>
  );
}

function RootLayout() {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
      <WhatsAppFloatingButton />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/contacto", element: withRouteFallback(ContactPage) },
      { path: "/trabaja-con-nosotros", element: withRouteFallback(JoinTeamPage) },
      { path: "/marcas/:brandId", element: withRouteFallback(BrandPage) },
      { path: "/proyectos/:projectSlug", element: withRouteFallback(ProjectDetail) },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
