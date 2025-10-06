
import type { RouteObject } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/home/page";
import Zodiac from "../pages/zodiac/page";
import Numerology from "../pages/numerology/page";
import Compatibility from "../pages/compatibility/page";
import Dreams from "../pages/dreams/page";
import Community from "../pages/community/page";
import Profile from "../pages/profile/page";
import ProfileSettings from "../pages/profile/settings/page";
import ProfileDocuments from "../pages/profile/documents/page";
import ProfileBilling from "../pages/profile/billing/page";
import ProfileHelp from "../pages/profile/help/page";
import Admin from "../pages/admin/page";
import AdminTheme from "../pages/admin/theme/page";
import Premium from "../pages/premium/page";
import About from "../pages/about/page";
import Legal from "../pages/legal/page";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/zodiac",
    element: <Zodiac />,
  },
  {
    path: "/numerology",
    element: <Numerology />,
  },
  {
    path: "/compatibility",
    element: <Compatibility />,
  },
  {
    path: "/dreams",
    element: <Dreams />,
  },
  {
    path: "/community",
    element: <Community />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/profile/settings",
    element: <ProfileSettings />,
  },
  {
    path: "/profile/documents",
    element: <ProfileDocuments />,
  },
  {
    path: "/profile/billing",
    element: <ProfileBilling />,
  },
  {
    path: "/profile/help",
    element: <ProfileHelp />,
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/theme",
    element: <AdminTheme />,
  },
  {
    path: "/premium",
    element: <Premium />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/legal/terms",
    element: <Legal />,
  },
  {
    path: "/legal/privacy",
    element: <Legal />,
  },
  {
    path: "/legal/faq",
    element: <Legal />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
