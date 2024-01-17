import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Chat, Login, Register } from "./pages";
import { SetAvatar } from "./pages/SetAvatar";

function App() {
  return (
    <BrowserRouter>
      <div className=" w-full min-h-9">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/setavatar" element={<SetAvatar />} />
          <Route path="/" element={<Chat />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
