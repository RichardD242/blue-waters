import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import HistoryPage from "./pages/HistoryPage.tsx";
import { useDarkMode } from "./hooks/useDarkMode.ts";

export default function App() {
  const { dark, toggle } = useDarkMode();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<HomePage dark={dark} onToggleDark={toggle} />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
