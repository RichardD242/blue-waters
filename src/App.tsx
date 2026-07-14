import BrowserShell from "./pages/BrowserShell.tsx";
import LockScreen from "./components/LockScreen.tsx";
import WelcomeModal from "./components/WelcomeModal.tsx";
import { useLock } from "./hooks/useLock.ts";
import { useUserName } from "./hooks/useUserName.ts";
import { useDarkMode } from "./hooks/useDarkMode.ts";

export default function App() {
  const lock = useLock();
  const { name, hasName, setName, clearName } = useUserName();
  const dark = useDarkMode();

  if (lock.hasPasscode && !lock.unlocked) {
    return <LockScreen onUnlock={lock.unlock} />;
  }

  if (!hasName) {
    return <WelcomeModal onSubmit={setName} />;
  }

  return <BrowserShell lock={lock} name={name as string} dark={dark} onClearName={clearName} />;
}