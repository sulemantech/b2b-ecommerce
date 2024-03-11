import { Suspense, lazy, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import ECommerce from './pages/Dashboard/ECommerce';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Loader from './common/Loader';
import routes from './routes';
import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom';

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'));

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  const isLogin = Cookies.get('token');
  
  

  return loading ? (
    <Loader />
  ) : (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        containerClassName="overflow-auto"
      />
      <Routes>
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp/>} />
        <Route element={<DefaultLayout />}>
          <Route path='/' element={isLogin?<ECommerce />: <Navigate to="/auth/signin"/> } />
          
          {routes.map((route, index) => {
          const { path, component: Component } = route;
          return (
            <Route
              key={index}
              path={path}
              element={
                isLogin ? (
                  <Suspense fallback={<Loader />}>
                    <Component />
                  </Suspense>
                ) : (
                  <Navigate to="/auth/signin" />
                )
              }
            />
          );
        })}
        </Route>
      </Routes>
    </>
  );
}

export default App;
