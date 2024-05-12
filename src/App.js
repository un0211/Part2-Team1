import Header from "components/common/Header";
import MainPage from "pages/MainPage";
import NotFoundPage from "pages/NotFoundPage";
import RollingPaperPage from "pages/RollingPaperPage";
import ListPage from "pages/ListPage";
import CreateRollingPage from "pages/CreateRollingPage";
import Modal from "react-modal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateRollingPaPer from "pages/CreateRollingPaperPage";

Modal.setAppElement("#root");

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="list" element={<ListPage />} />
        <Route path="post">
          <Route index element={<CreateRollingPaPer />} />
          <Route path="create" element={<CreateRollingPage />} />
          <Route path=":postId">
            <Route index element={<RollingPaperPage />} />
            <Route path="edit" element={<RollingPaperPage />} />
            <Route path="message" element={<>message</>} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
