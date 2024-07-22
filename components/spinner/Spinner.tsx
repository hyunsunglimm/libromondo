type SpinnerProps = {
  type?: "white" | "black";
};

const Spinner = ({ type = "white" }: SpinnerProps) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-6 h-6 border-4 border-t-4 border-t-transparent rounded-full animate-spin ${type === "white" ? "border-white" : type === "black" ? "border-black" : ""}`}
      />
    </div>
  );
};

export default Spinner;
