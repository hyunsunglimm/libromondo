import { useAlarmStore } from "@/store/alarm";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function useAlarm() {
  const { isAlarm, onAlarm, offAlarm } = useAlarmStore();
  const { data: session } = useSession();

  useEffect(() => {
    if (isAlarm) {
      const timer = setTimeout(() => {
        offAlarm();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [isAlarm, offAlarm]);

  const withAlarm = (callback: () => void) => {
    if (!session) {
      onAlarm();
    } else {
      callback();
    }
  };

  return { withAlarm };
}
