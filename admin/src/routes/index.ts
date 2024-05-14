import { lazy } from 'react';

const Calendar = lazy(() => import('../pages/Calendar'));
const Chart = lazy(() => import('../pages/Chart'));
const FormElements = lazy(() => import('../pages/Form/AddProducts'));
const ImportProducts=lazy(()=>import('../pages/Form/Import'))
const FormLayout = lazy(() => import('../pages/Form/Login'));
const Profile = lazy(() => import('../pages/Profile'));
const Settings = lazy(() => import('../pages/Settings'));
const Tables = lazy(() => import('../pages/Tables'));
const Alerts = lazy(() => import('../pages/UiElements/Alerts'));
const Buttons = lazy(() => import('../pages/UiElements/Buttons'));
const Products =lazy(()=>import('../pages/Dashboard/Products'));
const Users =lazy(()=>import('../pages/Dashboard/Users'));
const Orders =lazy(()=>import('../pages/Dashboard/Oders'));
const UpdateProducts =lazy(()=>import('../components/UpdateProducts'));
const ProductNavigate=lazy(()=>import('../components/PoductNavigator'));
const ECommerce =lazy(()=>import ('../pages/Dashboard/ECommerce'));
const BulkUpdate=lazy(()=>import ('../components/BulkUpdate'));




const coreRoutes = [
  {
    path: '/BulkUpdate/product',
    title: 'Bulk',
    component:BulkUpdate,

  },
  {
    path: '/dashboard',
    title: 'ecomerce',
    component:ECommerce,

  },
  
  {
    path: '/products',
    title: 'products',
    component:Products,

  },
  {
    path: '/product',
    title: 'product',
    component:ProductNavigate,

  },
  {
    path: '/UpdateProducts/:id',
    title: 'UpdateProducts',
    component:UpdateProducts,

  },
  {
    path: '/users',
    title: 'users',
    component:Users,

  },
  {
    path: '/orders',
    title: 'orders',
    component:Orders,

  },
  {
    path: '/calendar',
    title: 'Calender',
    component: Calendar,
  },
  {
    path: '/profile',
    title: 'Profile',
    component: Profile,
  },
  {
    path: '/new/product',
    title: 'Forms Elements',
    component: FormElements,
  },
  {
    path: '/import',
    title: 'import',
    component:ImportProducts,
  },
  {
    path: '/forms/form-layout',
    title: 'Form Layouts',
    component: FormLayout,
  },
  {
    path: '/tables',
    title: 'Tables',
    component: Tables,
  },
  {
    path: '/settings',
    title: 'Settings',
    component: Settings,
  },
  {
    path: '/chart',
    title: 'Chart',
    component: Chart,
  },
  {
    path: '/ui/alerts',
    title: 'Alerts',
    component: Alerts,
  },
  {
    path: '/ui/buttons',
    title: 'Buttons',
    component: Buttons,
  },
];

const routes = [...coreRoutes];
export default routes;
