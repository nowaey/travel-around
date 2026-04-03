interface ProgressBarProps {
  questionCount: number;
  maxQuestions?: number;
}

export default function ProgressBar({
  questionCount,
  maxQuestions = 6,
}: ProgressBarProps) {
  const progress = Math.min((questionCount / maxQuestions) * 100, 100);

  return (
    <div className="flex items-center gap-3">
      <span className="text-xs text-stone-400 whitespace-nowrap">
        Frage {Math.min(questionCount, maxQuestions)} von ~{maxQuestions}
      </span>
      <div className="flex-1 h-1.5 bg-stone-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-teal-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
