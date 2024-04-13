import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { PayPalScriptProvider} from '@paypal/react-paypal-js'
// import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/styles/bootstrap.custom.css'
import './assets/styles/index.css'
import App from './App';
import { Provider } from 'react-redux';
import store from './store.js';
import HomeScreen from './screens/HomeScreen';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute.js';
import PrivateRouteAdmin from './components/AdminRoute.js';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ShippingAddress from './screens/ShippingScreen.js';
import PaymentScreen from './screens/PaymentScreen.js';
import PlaceOrderScreen  from './screens/PlaceOrderScreen.js';
import OrderScreen from './screens/OrderScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import OrderListScreen from './screens/Admin/OrderListScreen.js';
import ProductListScreen from './screens/Admin/ProductListScreen.js';
import EditScreen from './screens/Admin/EditScreen.js';
import UserListScreen from './screens/Admin/UserListScreen.js';
import UserEditScreen from './screens/Admin/UserEditScreen.js';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>
        
        <Route index={true} path="/" element={<HomeScreen/>}/>
        <Route  path="/product/:id" element={<ProductScreen/>}/>
        <Route  path="/cart" element={<CartScreen/>}/>
        <Route  path="/login" element={<LoginScreen/>}/>
        <Route  path="/register" element={<RegisterScreen/>}/>
        

        <Route path='' element={<PrivateRoute/>}>
          <Route  path="/shipping" element={<ShippingAddress/>}/>
          <Route  path="/payment" element={<PaymentScreen/>}/>
          <Route  path="/placeorder" element={<PlaceOrderScreen/>}/>
          <Route  path="/order/:id" element={<OrderScreen/>}/>
          <Route  path="/profile" element={<ProfileScreen/>}/>

        </Route>

        <Route path='' element={<PrivateRouteAdmin/>}>
          <Route  path="/admin/orderlist" element={<OrderListScreen/>}/>
          <Route  path="/admin/productlist" element={<ProductListScreen/>}/>
          <Route  path="/admin/products/:id/edit" element={<EditScreen/>}/>
          <Route  path="/admin/userlist" element={<UserListScreen/>}/>
          <Route  path="/admin/user/:id/edit" element={<UserEditScreen/>}/>


        </Route>


    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
    <Provider store={store}>

      <PayPalScriptProvider deferLoading={ true} >
        <RouterProvider router={router}/>
      </PayPalScriptProvider>
    
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
