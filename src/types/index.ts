export interface CardContent {
  id: number;
  question: string;
  image?: string;
}

export interface FeedbackOption {
  id: number;
  text: string;
}

export interface SurveyResponse {
  cardId: number;
  liked: boolean;
  selectedOptions: number[];
  customFeedback?: string;
}
