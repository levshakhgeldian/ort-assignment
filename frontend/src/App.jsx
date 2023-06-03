import { Route, Routes } from "react-router-dom";
import Client from "./components/client/clientForm";
import Header from "./components/pages/header"
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from "./components/pages/home";
import NotFound from "./components/pages/notFound";
import ClientList from "./components/pages/clientList";
import ClientDetails from "./components/pages/clientDetails";
import ClientNew from "./components/pages/clientNew";

export default () => {
  return (
    <>
      <Header />

      <Routes>
        <Route path="/" >
          <Route index element={<Home />} />
          <Route path="clients" element={<ClientList />} />
          <Route path="newclient" element={<ClientNew />} />
          <Route path="client/:clientId" element={<ClientDetails />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
};