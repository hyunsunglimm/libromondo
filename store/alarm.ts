import { create } from "zustand";

type AlarmStore = {
  isAlarm: boolean;
  onAlarm: () => void;
  offAlarm: () => void;
};

export const useAlarmStore = create<AlarmStore>()((set) => ({
  isAlarm: false,
  onAlarm: () => set(() => ({ isAlarm: true })),
  offAlarm: () => set(() => ({ isAlarm: false })),
}));
