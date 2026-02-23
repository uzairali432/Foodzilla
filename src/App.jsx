import { BrowserRouter} from "react-router-dom";
import { useState } from "react";
import Provider from "./components/Provider";
import AllRoutes from "./routes/AllRoutes";


const App = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <BrowserRouter>
      <Provider>
        <AllRoutes setShowNavbar={setShowNavbar} />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
