import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./styles/App.css";
import DefaultLayout from "./layouts/DefaultLayout";
import RegisterPage from "./pages/public/Register";
import LoginPage from "./pages/public/Login";
import PrivateRoute from "./components/PrivateRoute";
import NotesPage, { LoadData } from "./pages/private/Notes";
import NotesLayout from "./layouts/NotesLayout";
import ProfilePage from "./pages/private/Profile";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path={"/"} element={<DefaultLayout />}>
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route element={<PrivateRoute />}>
          <Route element={<NotesLayout />}>
            <Route
              index
              element={<NotesPage />}
              loader={LoadData}
              errorElement={<Navigate to={"/signin"} />}
            />
          </Route>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Route>
    )
  );

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
