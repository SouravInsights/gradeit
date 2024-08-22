import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FileMetadata {
  name: string;
  size: number;
  type: string;
}

interface EvaluationResult {
  overallScore: number;
  criteriaScores: {
    A: number;
    B: number;
    C: number;
  };
  evaluationDate: string;
}

interface Coursework {
  id: string;
  title: string;
  subject: string;
  wordCount: number;
  uploadDate: string;
  type: string;
  fileMetadata: FileMetadata;
  rating: number;
  language: string;
  thumbnailUrl: string;
}

interface EssayEvaluationState {
  courseworkType: string;
  subject: string;
  essayTitle: string;
  pdfFileMetadata: FileMetadata[];
  evaluationResult: EvaluationResult | null;
  isLoading: boolean;
  isEvaluationRequested: boolean;
  courseworkList: Coursework[];
  setCourseworkType: (type: string) => void;
  setSubject: (subject: string) => void;
  setEssayTitle: (title: string) => void;
  setPdfFileMetadata: (metadata: FileMetadata[]) => void;
  setEvaluationResult: (result: EvaluationResult) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsEvaluationRequested: (isRequested: boolean) => void;
  addCoursework: (
    coursework: Omit<Coursework, "id" | "uploadDate" | "rating">
  ) => void;
  resetEvaluation: () => void;
}

const useEssayEvaluationStore = create<EssayEvaluationState>()(
  persist(
    (set) => ({
      courseworkType: "",
      subject: "",
      essayTitle: "",
      pdfFileMetadata: [],
      evaluationResult: null,
      isLoading: false,
      isEvaluationRequested: false,
      courseworkList: [],
      setCourseworkType: (type) => set({ courseworkType: type }),
      setSubject: (subject) => set({ subject }),
      setEssayTitle: (title) => set({ essayTitle: title }),
      setPdfFileMetadata: (metadata) => set({ pdfFileMetadata: metadata }),
      setEvaluationResult: (result) => set({ evaluationResult: result }),
      setIsLoading: (isLoading) => set({ isLoading }),
      setIsEvaluationRequested: (isRequested) =>
        set({ isEvaluationRequested: isRequested }),
      addCoursework: (coursework) =>
        set((state) => ({
          courseworkList: [
            ...state.courseworkList,
            {
              ...coursework,
              id: Date.now().toString(),
              uploadDate: new Date().toISOString(),
              rating: 0, // Default rating
            },
          ],
        })),
      resetEvaluation: () =>
        set({
          evaluationResult: null,
          isLoading: false,
          isEvaluationRequested: false,
        }),
    }),
    {
      name: "essay-evaluation-storage",
    }
  )
);

export default useEssayEvaluationStore;
