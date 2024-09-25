import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./styles/App.css";
import DefaultLayout from "./components/layouts/DefaultLayout";
import RegisterPage from "./components/pages/auth/Register";
import LoginPage from "./components/pages/auth/Login";
import PrivateRoute from "./components/PrivateRoute";
import NotesPage, { LoadData } from "./components/pages/notes/Notes";
import NotesLayout from "./components/layouts/NotesLayout";

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
