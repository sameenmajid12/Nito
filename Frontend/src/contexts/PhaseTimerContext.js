import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "@env";
import { useSocket } from "./SocketContext";
import { getTimeUntil } from "../utils/Format";
const PhaseTimerContext = createContext();

export const PhaseTimerProvider = ({ children }) => {
  const [timers, setTimers] = useState({
    revealPhaseStart: null,
    revealPhaseEnd: null,
    nextPairing: null,
  });

  const [countdowns, setCountdowns] = useState({
    untilRevealStart: null,
    untilRevealEnd: null,
    untilNextPair: null,
  });
  const { socket } = useSocket();
  const getTimes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/phase-timer`);
      const { times } = response.data;
      setTimers({
        revealPhaseStart: new Date(times.revealPhaseStart),
        revealPhaseEnd: new Date(times.revealPhaseEnd),
        nextPairing: new Date(times.nextPairing),
      });
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getTimes();
    if (!socket) return;
    const handler = () => getTimes();
    socket.on("phaseTimerUpdated", handler);
    return () => {
      socket.off("phaseTimerUpdated", handler);
    };
  }, [socket]);
  useEffect(() => {
    if (
      !timers.nextPairing ||
      !timers.revealPhaseStart ||
      !timers.revealPhaseEnd
    )
      return;

    const interval = setInterval(() => {
      setCountdowns({
        untilNextPair: getTimeUntil(timers.nextPairing),
        untilRevealStart: getTimeUntil(timers.revealPhaseStart),
        untilRevealEnd: getTimeUntil(timers.revealPhaseEnd),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timers]);
  return (
    <PhaseTimerContext.Provider value={{ countdowns, timers }}>
      {children}
    </PhaseTimerContext.Provider>
  );
};

export const usePhaseTimer = () => useContext(PhaseTimerContext);
