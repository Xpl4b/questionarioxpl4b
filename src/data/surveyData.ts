import { CardContent, FeedbackOption } from "../types";

export const surveyCards: CardContent[] = [
  {
    id: 1,
    question: "Fumetti sulla Gamification",
    image: "/images/comics.jpg"
  },
  {
    id: 2,
    question: "Attività Icebreaker",
    image: "/images/icebreaker.jpg"
  },
  {
    id: 3,
    question: "Sistema di Gemme e Premi",
    image: "/images/gems.jpg"
  },
  {
    id: 4,
    question: "Gioco di Ruolo con Master",
    image: "/images/roleplay.jpg"
  },
  {
    id: 5,
    question: "Minigiochi (Cruciverba, Reverse AI, Keep Talking)",
    image: "/images/minigames.jpg"
  }
];

export const feedbackOptions: FeedbackOption[] = [
  { id: 1, text: "Coinvolgente" },
  { id: 2, text: "Educativo" },
  { id: 3, text: "Divertente" },
  { id: 4, text: "Creativo" },
  { id: 5, text: "Sfidante" },
  { id: 6, text: "Ben organizzato" },
  { id: 7, text: "Chiaro" },
  { id: 8, text: "Motivante" },
  { id: 9, text: "Collaborativo" },
  { id: 10, text: "Innovativo" }
];
