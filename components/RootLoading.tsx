"use client";

import { SyncLoader } from "react-spinners";

export default function RootLoading() {
  return (
    <div className="fixed top-0 left-0 backdrop-blur-sm w-full h-full flex justify-center items-center">
      <SyncLoader />
    </div>
  );
}
