import { useAlarmStore } from "@/store/alarm";
import { useEffect } from "react";
import { useMe } from "./useMe";

export default function useAlarm() {
  const { isAlarm, onAlarm, offAlarm } = useAlarmStore();
  const { data: loginUser } = useMe();

  useEffect(() => {
    if (isAlarm) {
      const timer = setTimeout(() => {
        offAlarm();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isAlarm, offAlarm]);

  const withAlarm = (callback: () => void) => {
    if (!loginUser) {
      onAlarm();
    } else {
      callback();
    }
  };

  return { withAlarm };
}
