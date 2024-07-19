import ToggleStar from "../../../../../components/ToggleStar";

type GradeSectionProps = {
  grade: number;
  setGrade: (arg: number) => void;
};

export default function GradeSection({ grade, setGrade }: GradeSectionProps) {
  return (
    <div className="flex justify-center gap-2">
      {[1, 2, 3, 4, 5].map((num) => (
        <div key={num} onClick={() => setGrade(num)} className="cursor-pointer">
          <ToggleStar isFill={grade >= num} size="lg" />
        </div>
      ))}
    </div>
  );
}
