import BrowserShell from "./pages/BrowserShell.tsx";
import LockScreen from "./components/LockScreen.tsx";
import { useLock } from "./hooks/useLock.ts";

export default function App() {
  const lock = useLock();

  if (lock.hasPasscode && !lock.unlocked) {
    return <LockScreen onUnlock={lock.unlock} />;
  }

  return <BrowserShell lock = {lock} />;
}