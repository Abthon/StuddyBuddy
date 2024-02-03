import "./App.css";
import Home from "./template/Home";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Server from "./components/Server";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import { store } from "./store/store";
import { Provider } from "react-redux";
import ProtectedRoute from "./utils/ProtectedRoute";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/explore/:ServerName"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/server/:ServerId/"
        element={
          <ProtectedRoute>
            <Server />
          </ProtectedRoute>
        }
      />
      <Route
        path="/server/:ServerId/:ChannelId/"
        element={
          <ProtectedRoute>
            <Server />
          </ProtectedRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
    </Route>
  )
);

const App = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
