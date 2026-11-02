import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useSync } from "./useSync";

const SyncManager = () => {
  const { sync } = useSync();

  const appState = useRef<AppStateStatus>(
  (AppState.currentState ?? "active") as AppStateStatus
);
  useEffect(() => {
    // App launch / initial foreground
    sync();

    const subscription = AppState.addEventListener(
      "change",
      (nextState) => {
        const wasBackground =
          appState.current === "background" ||
          appState.current === "inactive";

        const isForeground = nextState === "active";

        if (wasBackground && isForeground) {
          sync();
        }

        appState.current = nextState;
      }
    );

    return () => {
      subscription.remove();
    };
  }, [sync]);

  return null;
};

export default SyncManager;
