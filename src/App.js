import Header from "components/common/Header";
import ListPage from 'pages/ListPage/ListPage';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
      <Route path="/ListPage" element={<ListPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
