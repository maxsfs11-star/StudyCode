import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import LottieView from "lottie-react-native";
import { forwardRef, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Linking,
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text as NativeText,
  TextInput,
  View,
  useWindowDimensions,
} from "react-native";
import {
  allCssLessons,
  allHtmlLessons,
  allJavascriptLessons,
  allNextLessons,
  allNodeLessons,
  allReactLessons,
  allTypescriptLessons,
  courses,
  getAnyLessonById,
  getMaximumLessonXp,
  cssModules,
  htmlModules,
  javascriptLessons,
  javascriptModules,
  nextModules,
  nodeModules,
  reactModules,
  scoringRules,
  typescriptModules,
} from "./src/data/courseContent";
import { colors, gradients, shadows } from "./src/theme/tokens";
import { askMentor } from "./src/services/mentorService";
import { loginStudent, registerStudent } from "./src/services/studycodeApi";
import {
  cancelPremiumSubscription,
  createCodeCoinCheckout,
  createPremiumCheckout,
  getStudyCodeCatalog,
  getStudyCodeCodeCoinCatalog,
  getStudyCodeCodeCoinBalance,
  getBillingHistory,
  getSubscriptionStatus,
} from "./src/services/studycodeBilling";
import { getLearningPath, learningPaths } from "./src/data/learningPaths";
import {
  getPracticeProject,
  practiceProjects,
} from "./src/data/practiceProjects";
import { getGuidedPractice } from "./src/data/guidedPractice";
import { buildInteractiveQuiz } from "./src/data/interactiveQuiz";
import {
  getDictionaryEntry,
  programmerDictionary,
} from "./src/data/programmerDictionary";

const GLOBAL_TEXT_LAYOUT = Object.freeze({
  minWidth: 0,
  flexShrink: 1,
});

const Text = forwardRef(function SafeText({ style, ...props }, ref) {
  return (
    <NativeText
      ref={ref}
      {...props}
      style={[GLOBAL_TEXT_LAYOUT, style]}
    />
  );
});

const STORAGE_KEY = "@codequest/progress";
const PROFILE_KEY = "@codequest/profile";
const AUTH_KEY = "@codequest/auth";
const MIN_LOADING_DURATION_MS = 4000;
const MAX_FOCUS_CHIPS = 5;
const LEGAL_VERSION = "2026-08-06";

function getQuizQuestions(lesson) {
  return buildInteractiveQuiz(lesson);
}

function normalizeCodeAnswer(value) {
  return String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();
}
const LOADING_BULB_ART = require("./assets/branding/studycode-bulb-animation.png");
const BRAND_ICON = require("./assets/branding/studycode-bulb-animation.png");
const CODECOIN_ART = require("./assets/branding/studycode-codecoin.png");
const COURSE_CERTIFICATE = require("./assets/animations/course-certificate.json");
const MEDAL_GOLD = require("./assets/animations/medal-gold.json");
const MEDAL_SILVER = require("./assets/animations/medal-silver.json");

function colorWithAlpha(color, alpha) {
  if (!color?.startsWith("#") || (color.length !== 7 && color.length !== 4)) {
    return color;
  }
  const hex =
    color.length === 4
      ? color
          .slice(1)
          .split("")
          .map((part) => part + part)
          .join("")
      : color.slice(1);
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);
  return `rgba(${red},${green},${blue},${alpha})`;
}

const palette = {
  background: colors.background,
  surface: colors.surface,
  surfaceLight: colors.surfaceElevated,
  line: colors.border,
  text: colors.text,
  muted: colors.textSecondary,
  purple: colors.secondary,
  purpleLight: colors.primaryLight,
  green: colors.success,
  yellow: colors.gold,
  danger: colors.error,
};

const RESULT_CONFETTI = [
  {
    left: "7%",
    top: 78,
    width: 8,
    height: 22,
    color: colors.logoYellow,
    rotate: 28,
    distance: 210,
    delay: 0,
    duration: 2400,
  },
  {
    left: "19%",
    top: 142,
    width: 7,
    height: 16,
    color: colors.primaryLight,
    rotate: -24,
    distance: 188,
    delay: 420,
    duration: 2200,
  },
  {
    left: "33%",
    top: 54,
    width: 9,
    height: 9,
    color: colors.success,
    rotate: 0,
    distance: 228,
    delay: 860,
    duration: 2500,
  },
  {
    left: "47%",
    top: 122,
    width: 7,
    height: 20,
    color: colors.pink,
    rotate: 34,
    distance: 202,
    delay: 1160,
    duration: 2350,
  },
  {
    left: "61%",
    top: 68,
    width: 8,
    height: 14,
    color: colors.flame,
    rotate: -32,
    distance: 238,
    delay: 260,
    duration: 2250,
  },
  {
    left: "75%",
    top: 154,
    width: 10,
    height: 10,
    color: colors.info,
    rotate: 18,
    distance: 194,
    delay: 720,
    duration: 2450,
  },
  {
    left: "88%",
    top: 96,
    width: 7,
    height: 21,
    color: colors.logoGold,
    rotate: -18,
    distance: 216,
    delay: 1420,
    duration: 2300,
  },
  {
    left: "28%",
    top: 186,
    width: 6,
    height: 13,
    color: colors.error,
    rotate: 42,
    distance: 166,
    delay: 1720,
    duration: 2100,
  },
  {
    left: "68%",
    top: 210,
    width: 8,
    height: 8,
    color: colors.secondaryLight,
    rotate: -45,
    distance: 174,
    delay: 1880,
    duration: 2150,
  },
];

const initialProgress = {
  xp: 0,
  streak: 0,
  completedLessons: [],
  reviewQueue: [],
  mistakeNotebook: [],
  completedProjectIds: [],
  projectChecklist: {},
  lastStudyDate: null,
  dailyMissionDate: null,
  dailyLessonsCompleted: 0,
  dailyCorrectAnswers: 0,
  dailyXp: 0,
  dailyMissionRewardClaimed: false,
  bestQuizPercent: 0,
  lessonResults: {},
};

const initialProfile = {
  avatarUri: null,
  themeMode: "light",
  themeVersion: 2,
  displayName: "",
  email: "",
  experienceLevel: "",
  learningGoal: "",
  learningPathId: "web-zero",
  preferredCourseId: "javascript",
  onboardingCompleted: false,
};

function dateKey(date = new Date()) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

function previousDateKey() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return dateKey(yesterday);
}

function futureDateKey(days) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return dateKey(date);
}

function formatDateKeyLabel(value) {
  if (!value) return "em breve";
  const [year, month, day] = value.split("-");
  return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
}

function getReviewCount(progress) {
  return Math.max(
    progress.mistakeNotebook?.length ?? 0,
    progress.reviewQueue?.length ?? 0,
  );
}

const dailyMissionDefinitions = [
  {
    id: "lesson",
    icon: "▶",
    title: "Concluir uma aula",
    target: 1,
    getValue: (stats) => stats.lessons,
  },
  {
    id: "correct",
    icon: "✦",
    title: "Acertar 3 desafios",
    target: 3,
    getValue: (stats) => stats.correctAnswers,
  },
  {
    id: "xp",
    icon: "⚡",
    title: "Ganhar 20 XP",
    target: 20,
    getValue: (stats) => stats.xp,
  },
];

function getDailyStats(progress) {
  if (progress.dailyMissionDate !== dateKey()) {
    return { lessons: 0, correctAnswers: 0, xp: 0 };
  }

  return {
    lessons: progress.dailyLessonsCompleted ?? 0,
    correctAnswers: progress.dailyCorrectAnswers ?? 0,
    xp: progress.dailyXp ?? 0,
  };
}

function getDailyMissions(progress) {
  const stats = getDailyStats(progress);
  return dailyMissionDefinitions.map((mission) => {
    const value = mission.getValue(stats);
    return {
      ...mission,
      value,
      complete: value >= mission.target,
      percent: Math.min(100, Math.round((value / mission.target) * 100)),
    };
  });
}

function getAchievements(progress) {
  return [
    {
      id: "first-lesson",
      icon: "✦",
      title: "Primeiro passo",
      detail: "Complete sua primeira aula",
      unlocked: progress.completedLessons.length >= 1,
    },
    {
      id: "focus-streak",
      icon: "◈",
      title: "Ritmo criado",
      detail: "Estude por 3 dias seguidos",
      unlocked: progress.streak >= 3,
    },
    {
      id: "ten-lessons",
      icon: "◆",
      title: "Em evolução",
      detail: "Conclua 10 aulas",
      unlocked: progress.completedLessons.length >= 10,
    },
    {
      id: "xp-100",
      icon: "⚡",
      title: "Carga total",
      detail: "Alcance 100 XP",
      unlocked: progress.xp >= 100,
    },
    {
      id: "perfect-quiz",
      icon: "⌘",
      title: "Código preciso",
      detail: "Faça 100% em um desafio",
      unlocked: (progress.bestQuizPercent ?? 0) >= 100,
    },
    {
      id: "week-streak",
      icon: "↗",
      title: "Em órbita",
      detail: "Mantenha 7 dias seguidos",
      unlocked: progress.streak >= 7,
    },
  ];
}

export default function App() {
  const [screen, setScreen] = useState("home");
  const [selectedCourseId, setSelectedCourseId] = useState("javascript");
  const [selectedLessonId, setSelectedLessonId] = useState(
    javascriptLessons[0].id,
  );
  const [selectedProjectId, setSelectedProjectId] = useState(
    "javascript-task-list",
  );
  const [selectedDictionaryEntryId, setSelectedDictionaryEntryId] = useState(
    programmerDictionary[0].id,
  );
  const [progress, setProgress] = useState(initialProgress);
  const [profile, setProfile] = useState(initialProfile);
  const [authSession, setAuthSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const isLightTheme = profile.themeMode === "light";
  const selectedLesson = getAnyLessonById(selectedLessonId);
  const selectedProject = getPracticeProject(selectedProjectId);
  const selectedCourse =
    courses.find((course) => course.id === selectedCourseId) ?? courses[0];
  const selectedModules =
    selectedCourseId === "html"
      ? htmlModules
      : selectedCourseId === "css"
        ? cssModules
        : selectedCourseId === "react"
          ? reactModules
          : selectedCourseId === "nextjs"
            ? nextModules
            : selectedCourseId === "nodejs"
              ? nodeModules
              : selectedCourseId === "typescript"
                ? typescriptModules
                : javascriptModules;
  const selectedCourseLessons =
    selectedCourseId === "html"
      ? allHtmlLessons
      : selectedCourseId === "css"
        ? allCssLessons
        : selectedCourseId === "react"
          ? allReactLessons
          : selectedCourseId === "nextjs"
            ? allNextLessons
            : selectedCourseId === "nodejs"
              ? allNodeLessons
              : selectedCourseId === "typescript"
                ? allTypescriptLessons
                : allJavascriptLessons;

  useEffect(() => {
    async function loadProgress() {
      const startedAt = Date.now();
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved) setProgress({ ...initialProgress, ...JSON.parse(saved) });
        const savedProfile = await AsyncStorage.getItem(PROFILE_KEY);
        if (savedProfile) {
          const parsedProfile = JSON.parse(savedProfile);
          const legacyPathId =
            parsedProfile.preferredCourseId === "javascript"
              ? "frontend"
              : "web-zero";
          const nextProfile = {
            ...initialProfile,
            ...parsedProfile,
            themeMode:
              parsedProfile.themeVersion === 2
                ? (parsedProfile.themeMode ?? initialProfile.themeMode)
                : initialProfile.themeMode,
            themeVersion: 2,
            learningPathId: parsedProfile.learningPathId ?? legacyPathId,
          };
          setProfile(nextProfile);
          await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(nextProfile));
        }
        const savedAuth = await AsyncStorage.getItem(AUTH_KEY);
        if (savedAuth) setAuthSession(JSON.parse(savedAuth));
      } catch {
        // The app still works if local storage is unavailable.
      } finally {
        const remainingTime =
          MIN_LOADING_DURATION_MS - (Date.now() - startedAt);
        if (remainingTime > 0) {
          await new Promise((resolve) => setTimeout(resolve, remainingTime));
        }
        setLoading(false);
      }
    }

    loadProgress();
  }, []);

  async function updateProfile(nextProfile) {
    const updatedProfile = { ...profile, ...nextProfile };
    setProfile(updatedProfile);
    try {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(updatedProfile));
    } catch {
      // Profile preferences remain available during the current session.
    }
  }

  // Limpa dados locais da conta anterior ao iniciar uma nova sessão.
  async function clearLocalUserCache() {
    try {
      await AsyncStorage.multiRemove([STORAGE_KEY, PROFILE_KEY]);
    } catch {
      // O estado em memória ainda é resetado se o armazenamento falhar.
    }
    setProgress(initialProgress);
    setProfile(initialProfile);
    setSelectedCourseId("javascript");
    setSelectedLessonId(javascriptLessons[0].id);
    setSelectedProjectId("javascript-task-list");
    setSelectedDictionaryEntryId(programmerDictionary[0].id);
  }

  async function setAuthenticatedProfile(nextProfile) {
    const persistedProfile = { ...initialProfile, ...nextProfile };
    setProfile(persistedProfile);
    try {
      await AsyncStorage.setItem(PROFILE_KEY, JSON.stringify(persistedProfile));
    } catch {
      // O perfil em memória continua disponível nesta sessão.
    }
  }

  async function completeOnboarding(details) {
    const { password, ...profileDetails } = details;
    const normalizedEmail = profileDetails.email?.trim().toLowerCase();
    let auth = null;
    let authError = "Não foi possível criar sua conta agora. Tente novamente.";
    if (normalizedEmail && password?.length >= 8) {
      try {
        auth = await registerStudent({
          name: profileDetails.displayName,
          email: normalizedEmail,
          password,
          acceptedTerms: true,
          legalVersion: LEGAL_VERSION,
        });
      } catch (error) {
        authError = error.message || authError;
        if (error.status === 409) {
          try {
            auth = await loginStudent({ email: normalizedEmail, password });
          } catch (loginError) {
            authError =
              loginError.message ||
              "Este e-mail já está cadastrado. Confira sua senha ou entre na conta existente.";
          }
        }
      }
    }
    if (!auth?.accessToken) return { ok: false, error: authError };
    if (auth?.accessToken) {
      await clearLocalUserCache();
      setAuthSession(auth);
      try {
        await AsyncStorage.setItem(
          AUTH_KEY,
          JSON.stringify({
            accessToken: auth.accessToken,
            refreshToken: auth.refreshToken,
            student: auth.student,
          }),
        );
      } catch {
        // The local profile remains usable if storage is unavailable.
      }
    }
    await setAuthenticatedProfile({
      ...profileDetails,
      email: normalizedEmail,
      onboardingCompleted: true,
    });
    setSelectedCourseId(profileDetails.preferredCourseId ?? "javascript");
    return { ok: true };
  }

  async function loginExistingStudent({ email, password }) {
    try {
      const auth = await loginStudent({ email: email.trim().toLowerCase(), password });
      await clearLocalUserCache();
      await AsyncStorage.setItem(
        AUTH_KEY,
        JSON.stringify({
          accessToken: auth.accessToken,
          refreshToken: auth.refreshToken,
          student: auth.student,
        }),
      );
      setAuthSession(auth);
      await setAuthenticatedProfile({
        displayName: auth.student.name || "Estudante",
        email: auth.student.email,
        onboardingCompleted: true,
      });
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        error: error.message || "Não foi possível entrar. Confira seus dados.",
      };
    }
  }

  async function refreshAuthSession() {
    if (!authSession?.refreshToken) return null;
    try {
      const refreshed = await refreshStudent(authSession.refreshToken);
      const nextSession = { ...authSession, ...refreshed };
      setAuthSession(nextSession);
      await AsyncStorage.setItem(AUTH_KEY, JSON.stringify(nextSession));
      return nextSession.accessToken;
    } catch {
      return null;
    }
  }

  async function returnToLogin() {
    await clearLocalUserCache();
    setAuthSession(null);
    try {
      await AsyncStorage.removeItem(AUTH_KEY);
    } catch {
      // The app can still return to login during the current session.
    }
  }

  async function completeLesson(lesson, result) {
    const alreadyCompleted = progress.completedLessons.includes(lesson.id);
    const today = dateKey();
    let nextStreak = progress.streak;

    if (progress.lastStudyDate !== today) {
      nextStreak =
        progress.lastStudyDate === previousDateKey() ? progress.streak + 1 : 1;
    }

    const currentReviewQueue = progress.reviewQueue ?? [];
    const nextReviewQueue = currentReviewQueue.filter((id) => id !== lesson.id);
    if (result.wrongCount > 0) nextReviewQueue.push(lesson.id);
    const currentDailyStats = getDailyStats(progress);
    const earnedLessonXp = alreadyCompleted ? 0 : Math.max(0, result.xpChange);
    const nextDailyStats = {
      lessons: currentDailyStats.lessons + (alreadyCompleted ? 0 : 1),
      correctAnswers:
        currentDailyStats.correctAnswers + (result.correctCount ?? 0),
      xp: currentDailyStats.xp + earnedLessonXp,
    };
    const dailyMissionsComplete = dailyMissionDefinitions.every(
      (mission) => mission.getValue(nextDailyStats) >= mission.target,
    );
    const dailyRewardAlreadyClaimed =
      progress.dailyMissionDate === today && progress.dailyMissionRewardClaimed;
    const dailyMissionBonus =
      dailyMissionsComplete && !dailyRewardAlreadyClaimed ? 25 : 0;
    const lessonCourse = courses.find((course) =>
      lesson.id.startsWith(getCoursePrefix(course.id)),
    );
    const answerResults = result.answers ?? [];
    const correctedQuestionIds = new Set(
      answerResults
        .filter((answer) => answer.correct)
        .map((answer) => answer.questionId),
    );
    const nextMistakeNotebook = (progress.mistakeNotebook ?? []).filter(
      (mistake) => !correctedQuestionIds.has(mistake.questionId),
    );

    answerResults
      .filter((answer) => !answer.correct)
      .forEach((answer) => {
        const existingIndex = nextMistakeNotebook.findIndex(
          (mistake) => mistake.questionId === answer.questionId,
        );
        const existingMistake =
          existingIndex >= 0 ? nextMistakeNotebook[existingIndex] : null;
        const mistake = {
          id: `${lesson.id}-${answer.questionId}`,
          questionId: answer.questionId,
          lessonId: lesson.id,
          lessonTitle: lesson.title,
          courseId: lessonCourse?.id ?? "javascript",
          courseTitle: lessonCourse?.title ?? "JavaScript",
          prompt: answer.prompt,
          selectedAnswer:
            answer.selectedAnswer ?? answer.options?.[answer.selectedIndex] ?? "",
          correctAnswer:
            answer.correctAnswer ?? answer.options?.[answer.correctIndex] ?? "",
          explanation: answer.explanation,
          attempts: (existingMistake?.attempts ?? 0) + 1,
          lastWrongDate: today,
          reviewDate: futureDateKey(1),
        };

        if (existingIndex >= 0) nextMistakeNotebook[existingIndex] = mistake;
        else nextMistakeNotebook.push(mistake);
      });

    const nextProgress = {
      ...progress,
      xp: alreadyCompleted
        ? progress.xp + dailyMissionBonus
        : Math.max(0, progress.xp + result.xpChange) + dailyMissionBonus,
      streak: nextStreak,
      lastStudyDate: today,
      completedLessons: alreadyCompleted
        ? progress.completedLessons
        : [...progress.completedLessons, lesson.id],
      reviewQueue: [...new Set(nextReviewQueue)],
      mistakeNotebook: nextMistakeNotebook,
      dailyMissionDate: today,
      dailyLessonsCompleted: nextDailyStats.lessons,
      dailyCorrectAnswers: nextDailyStats.correctAnswers,
      dailyXp: nextDailyStats.xp,
      dailyMissionRewardClaimed:
        dailyRewardAlreadyClaimed || dailyMissionsComplete,
      bestQuizPercent: Math.max(
        progress.bestQuizPercent ?? 0,
        result.percent ?? 0,
      ),
      lessonResults: {
        ...(progress.lessonResults ?? {}),
        [lesson.id]: {
          place:
            result.wrongCount === 0
              ? 1
              : result.wrongCount <= 2
                ? 2
                : 3,
          percent: result.percent ?? 0,
          wrongCount: result.wrongCount ?? 0,
        },
      },
      lastResult: {
        ...result,
        lessonId: lesson.id,
        rewarded: !alreadyCompleted,
        dailyMissionBonus,
      },
    };

    setProgress(nextProgress);

    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
    } catch {
      // Progress remains available during the current session.
    }
  }

  async function updateProjectChecklist(projectId, itemIndex) {
    const currentItems = progress.projectChecklist?.[projectId] ?? [];
    const nextItems = currentItems.includes(itemIndex)
      ? currentItems.filter((index) => index !== itemIndex)
      : [...currentItems, itemIndex];
    const nextProgress = {
      ...progress,
      projectChecklist: {
        ...(progress.projectChecklist ?? {}),
        [projectId]: nextItems,
      },
    };
    setProgress(nextProgress);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
    } catch {
      // The checklist remains available during the current session.
    }
  }

  async function completeProject(project) {
    if (progress.completedProjectIds?.includes(project.id)) return;
    const nextProgress = {
      ...progress,
      xp: progress.xp + project.rewardXp,
      completedProjectIds: [
        ...(progress.completedProjectIds ?? []),
        project.id,
      ],
    };
    setProgress(nextProgress);
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(nextProgress));
    } catch {
      // The completed project remains available during the current session.
    }
  }

  if (loading) {
    return <LoadingScreen />;
  }

  if (!profile.onboardingCompleted) {
    return (
      <OnboardingScreen
        onComplete={completeOnboarding}
        onLogin={loginExistingStudent}
      />
    );
  }

  return (
    <View style={[styles.app, isLightTheme && styles.appLight]}>
      <AnimatedBackground isLightTheme={isLightTheme} />
      <StatusBar
        style="light"
        backgroundColor={colors.primary}
        translucent={false}
      />
      {screen === "home" && (
        <HomeScreen
          progress={progress}
          profile={profile}
          isLightTheme={isLightTheme}
          onUpdateProfile={updateProfile}
          onOpenReview={() => setScreen("review")}
          onOpenDashboard={() => setScreen("dashboard")}
          onOpenBilling={() => setScreen("billing")}
          onOpenCodeCoin={() => setScreen("codecoin")}
          onOpenProjects={() => setScreen("projects")}
          onOpenDictionary={() => setScreen("dictionary")}
          onSignOut={returnToLogin}
          onOpenCourse={async (courseId = "javascript") => {
            setSelectedCourseId(courseId);
            setScreen("course");
            await updateProfile({ preferredCourseId: courseId });
          }}
        />
      )}
      {screen === "course" && (
        <CourseScreen
          progress={progress}
          course={selectedCourse}
          modules={selectedModules}
          lessons={selectedCourseLessons}
          onBack={() => setScreen("home")}
          onStartLesson={(lesson) => {
            setSelectedLessonId(lesson.id);
            setScreen("lesson");
          }}
        />
      )}
      {screen === "review" && (
        <ReviewScreen
          progress={progress}
          lessons={(progress.reviewQueue ?? [])
            .map((lessonId) => getAnyLessonById(lessonId))
            .filter(Boolean)}
          onBack={() => setScreen("home")}
          onStartLesson={(lesson) => {
            setSelectedLessonId(lesson.id);
            setScreen("lesson");
          }}
        />
      )}
      {screen === "dashboard" && (
        <DashboardScreen
          progress={progress}
          profile={profile}
          onBack={() => setScreen("home")}
          onOpenReview={() => setScreen("review")}
          onOpenProjects={() => setScreen("projects")}
          onOpenCourse={(courseId) => {
            setSelectedCourseId(courseId);
            setScreen("course");
          }}
        />
      )}
      {screen === "billing" && (
        <BillingScreen
          profile={profile}
          authSession={authSession}
          onAuthRefresh={refreshAuthSession}
          onSessionExpired={returnToLogin}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "codecoin" && (
        <CodeCoinScreen
          authSession={authSession}
          onAuthRefresh={refreshAuthSession}
          onBack={() => setScreen("home")}
        />
      )}
      {screen === "projects" && (
        <ProjectsScreen
          progress={progress}
          onBack={() => setScreen("home")}
          onOpenProject={(projectId) => {
            setSelectedProjectId(projectId);
            setScreen("project");
          }}
        />
      )}
      {screen === "dictionary" && (
        <DictionaryScreen
          onBack={() => setScreen("home")}
          onOpenEntry={(entryId) => {
            setSelectedDictionaryEntryId(entryId);
            setScreen("dictionary-entry");
          }}
        />
      )}
      {screen === "dictionary-entry" && (
        <DictionaryEntryScreen
          entry={getDictionaryEntry(selectedDictionaryEntryId)}
          onBack={() => setScreen("dictionary")}
        />
      )}
      {screen === "project" && selectedProject && (
        <ProjectDetailScreen
          project={selectedProject}
          progress={progress}
          onBack={() => setScreen("projects")}
          onToggleChecklist={updateProjectChecklist}
          onCompleteProject={completeProject}
        />
      )}
      {screen === "lesson" && (
        <LessonScreen
          lesson={selectedLesson}
          profile={profile}
          progress={progress}
          onBack={() => setScreen("course")}
          onStartPractice={() => setScreen("practice")}
          onStartQuiz={() => setScreen("quiz")}
        />
      )}
      {screen === "practice" && (
        <GuidedPracticeScreen
          lesson={selectedLesson}
          onBack={() => setScreen("lesson")}
          onStartQuiz={() => setScreen("quiz")}
        />
      )}
      {screen === "quiz" && (
        <QuizScreen
          lesson={selectedLesson}
          onBack={() => setScreen("lesson")}
          onComplete={async (result) => {
            await completeLesson(selectedLesson, result);
            setScreen("result");
          }}
        />
      )}
      {screen === "result" && (
        <ResultScreen
          lesson={selectedLesson}
          progress={progress}
          onContinue={() => setScreen("course")}
        />
      )}
    </View>
  );
}

function LoadingScreen() {
  const reveal = useRef(new Animated.Value(0)).current;
  const bulbPower = useRef(new Animated.Value(0)).current;
  const cursorPulse = useRef(new Animated.Value(1)).current;
  const [brandText, setBrandText] = useState("");

  useEffect(() => {
    Animated.timing(reveal, {
      toValue: 1,
      duration: 650,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    const ignitionTimer = setTimeout(() => {
      Animated.sequence([
        Animated.timing(bulbPower, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(bulbPower, {
          toValue: 0.52,
          duration: 75,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bulbPower, {
          toValue: 1,
          duration: 260,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }, 2000);

    let typingInterval;
    const typingTimer = setTimeout(() => {
      let index = 0;
      typingInterval = setInterval(() => {
        index += 1;
        setBrandText("StudyCode".slice(0, index));
        if (index >= "StudyCode".length) clearInterval(typingInterval);
      }, 95);
    }, 2350);

    const cursorAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(cursorPulse, {
          toValue: 0.2,
          duration: 480,
          useNativeDriver: true,
        }),
        Animated.timing(cursorPulse, {
          toValue: 1,
          duration: 480,
          useNativeDriver: true,
        }),
      ]),
    );
    cursorAnimation.start();

    return () => {
      cursorAnimation.stop();
      clearTimeout(ignitionTimer);
      clearTimeout(typingTimer);
      if (typingInterval) clearInterval(typingInterval);
    };
  }, [bulbPower, cursorPulse, reveal]);

  return (
    <View style={styles.loadingScreen}>
      <LinearGradient
        colors={gradients.loadingBackground}
        locations={[0, 0.52, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          styles.loadingMain,
          {
            opacity: reveal,
            transform: [
              {
                translateY: reveal.interpolate({
                  inputRange: [0, 1],
                  outputRange: [24, 0],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.loadingBrandRow}>
          <Animated.Image
            source={LOADING_BULB_ART}
            resizeMode="contain"
            style={[
              styles.loadingBulbArt,
              {
                opacity: bulbPower.interpolate({
                  inputRange: [0, 0.25, 1],
                  outputRange: [0.12, 0.66, 1],
                }),
                transform: [
                  {
                    scale: bulbPower.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0.92, 1],
                    }),
                  },
                  {
                    translateY: bulbPower.interpolate({
                      inputRange: [0, 1],
                      outputRange: [6, 0],
                    }),
                  },
                  {
                    rotate: bulbPower.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["-5deg", "0deg"],
                    }),
                  },
                ],
              },
            ]}
          />
          <View style={styles.loadingBrandTextWrap}>
            <Text style={styles.loadingBrandText}>
              {brandText.slice(0, 5)}
              {brandText.length > 5 && (
                <Text style={styles.loadingBrandCodeText}>
                  {brandText.slice(5)}
                </Text>
              )}
            </Text>
            {brandText.length > 0 && (
              <Animated.Text
                style={[styles.loadingBrandCursor, { opacity: cursorPulse }]}
              >
                |
              </Animated.Text>
            )}
          </View>
        </View>
      </Animated.View>
      <StatusBar
        style="light"
        backgroundColor={colors.primary}
        translucent={false}
      />
    </View>
  );
}

const LEGAL_DOCUMENTS = {
  terms: {
    title: "Termos de Uso",
    updatedAt: "Atualizado em 6 de agosto de 2026",
    sections: [
      {
        title: "1. Sobre o StudyCode",
        text: "O StudyCode é uma plataforma educacional da VM Nexus Digital para estudo de programação. O aplicativo oferece aulas, exercícios, gamificação, acompanhamento de progresso e, futuramente, recursos de inteligência artificial.",
      },
      {
        title: "2. Conta do usuário",
        text: "Você deve fornecer informações verdadeiras, manter sua senha protegida e não compartilhar sua conta. Você é responsável pelas atividades realizadas com suas credenciais.",
      },
      {
        title: "3. Conteúdo educacional",
        text: "As aulas apoiam o aprendizado, mas não garantem emprego, certificação profissional ou resultado específico. Exemplos de código devem ser testados e adaptados antes de uso em projetos reais.",
      },
      {
        title: "4. Planos e recursos",
        text: "O plano gratuito e o plano Premium podem oferecer recursos e limites diferentes. Preços, períodos e benefícios serão apresentados antes da contratação. Compras nas lojas seguirão também as regras da plataforma responsável pelo pagamento.",
      },
      {
        title: "5. Uso adequado",
        text: "Não é permitido tentar invadir o serviço, explorar falhas, prejudicar outros usuários, copiar conteúdo de forma indevida ou utilizar o aplicativo para atividades ilegais.",
      },
      {
        title: "6. Alterações e disponibilidade",
        text: "O StudyCode poderá receber melhorias, correções e mudanças de conteúdo. Interrupções temporárias podem ocorrer por manutenção ou serviços externos.",
      },
      {
        title: "7. Encerramento",
        text: "O usuário poderá solicitar a exclusão da conta. Contas que violem estes termos poderão ser suspensas, respeitando a legislação aplicável.",
      },
    ],
  },
  privacy: {
    title: "Política de Privacidade",
    updatedAt: "Atualizada em 6 de agosto de 2026",
    sections: [
      {
        title: "1. Responsável pelos dados",
        text: "A VM Nexus Digital é responsável pelas decisões sobre o tratamento de dados pessoais realizados pelo StudyCode.",
      },
      {
        title: "2. Dados tratados",
        text: "Podemos tratar nome, e-mail, senha protegida por hash, preferências de estudo, trilhas escolhidas, respostas, progresso, XP, conquistas, assinatura e informações técnicas necessárias para segurança e funcionamento.",
      },
      {
        title: "3. Para que usamos os dados",
        text: "Usamos os dados para criar e proteger sua conta, salvar seu progresso, personalizar a experiência, liberar recursos do plano, prestar suporte, prevenir fraudes e melhorar o aplicativo.",
      },
      {
        title: "4. Inteligência artificial",
        text: "Quando a IA online for ativada, perguntas, contexto da aula, respostas, quantidade de tokens e custo estimado poderão ser registrados para prestar o serviço e controlar limites. Essa função ainda não está ativa nesta versão.",
      },
      {
        title: "5. Serviços utilizados",
        text: "Os dados poderão ser processados por fornecedores de infraestrutura, banco de dados, autenticação, pagamentos, notificações e inteligência artificial, somente na medida necessária para o funcionamento do StudyCode.",
      },
      {
        title: "6. Segurança e conservação",
        text: "Adotamos controles técnicos e organizacionais para proteger os dados. Eles serão mantidos pelo período necessário às finalidades informadas e às obrigações legais aplicáveis.",
      },
      {
        title: "7. Seus direitos",
        text: "Você poderá solicitar confirmação, acesso, correção, informações sobre compartilhamento, portabilidade quando aplicável, revogação de consentimento e exclusão nos casos previstos pela LGPD.",
      },
      {
        title: "8. Contato",
        text: "Solicitações sobre privacidade poderão ser enviadas pelo canal de suporte da VM Nexus Digital. Antes da publicação nas lojas, este documento receberá o endereço oficial de contato.",
      },
    ],
  },
};

function LegalDocumentScreen({ document, onBack }) {
  return (
    <View style={styles.legalScreen}>
      <StatusBar style="light" backgroundColor={colors.primary} />
      <LinearGradient
        colors={gradients.loadingBackground}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.legalHeader}
      >
        <Pressable onPress={onBack} style={styles.legalBackButton}>
          <Text style={styles.legalBackButtonText}>‹</Text>
        </Pressable>
        <View style={styles.legalHeaderText}>
          <Text style={styles.legalEyebrow}>STUDYCODE • VM NEXUS DIGITAL</Text>
          <Text style={styles.legalTitle}>{document.title}</Text>
          <Text style={styles.legalUpdated}>{document.updatedAt}</Text>
        </View>
      </LinearGradient>
      <ScrollView
        contentContainerStyle={styles.legalContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.legalNotice}>
          <Text style={styles.legalNoticeText}>
            Documento inicial para testes e portfólio. Será revisado antes da publicação comercial.
          </Text>
        </View>
        {document.sections.map((section) => (
          <View key={section.title} style={styles.legalSection}>
            <Text style={styles.legalSectionTitle}>{section.title}</Text>
            <Text style={styles.legalSectionText}>{section.text}</Text>
          </View>
        ))}
        <Pressable onPress={onBack} style={styles.legalDoneButton}>
          <Text style={styles.legalDoneButtonText}>Voltar ao cadastro</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function OnboardingScreen({ onComplete, onLogin }) {
  // Keep the authentication layout stable while Android resizes the window
  // to show the keyboard. A live height here creates a focus/keyboard loop.
  const screenHeight = useRef(Dimensions.get("screen").height).current;
  const [step, setStep] = useState(0);
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [authMessage, setAuthMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [legalDocument, setLegalDocument] = useState(null);
  const loginFloat = useRef(new Animated.Value(0)).current;
  const [experienceLevel, setExperienceLevel] = useState("beginner");
  const [learningGoal, setLearningGoal] = useState("frontend");
  const [learningPathId, setLearningPathId] = useState("web-zero");
  const [preferredCourseId, setPreferredCourseId] = useState("javascript");

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(loginFloat, {
          toValue: 1,
          duration: 2200,
          useNativeDriver: true,
        }),
        Animated.timing(loginFloat, {
          toValue: 0,
          duration: 2200,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [loginFloat]);

  const experienceOptions = [
    {
      id: "beginner",
      label: "Estou começando",
      helper: "Quero criar uma base sólida",
    },
    {
      id: "basic",
      label: "Já vi o básico",
      helper: "Quero praticar e evoluir",
    },
    {
      id: "intermediate",
      label: "Intermediário",
      helper: "Quero construir projetos",
    },
    { id: "advanced", label: "Avançado", helper: "Quero me especializar" },
  ];
  const goalOptions = [
    { id: "frontend", label: "Interfaces web", icon: "◈" },
    { id: "backend", label: "Back-end", icon: "⌘" },
    { id: "fullstack", label: "Full stack", icon: "⬡" },
    { id: "mobile", label: "Aplicativos", icon: "▣" },
  ];
  const popularCourses = ["javascript", "react", "nodejs", "python"]
    .map((courseId) => courses.find((course) => course.id === courseId))
    .filter(Boolean);

  async function finish() {
    setAuthLoading(true);
    const result = await onComplete({
      displayName: displayName.trim() || "Estudante",
      email: email.trim(),
      password,
      experienceLevel,
      learningGoal,
      learningPathId,
      preferredCourseId,
    });
    setAuthLoading(false);
    if (!result?.ok) {
      setStep(0);
      setAuthMessage(result?.error || "Não foi possível criar a conta.");
    }
  }

  async function continueAuthentication() {
    const normalizedEmail = email.trim().toLowerCase();
    if (!/^\S+@\S+\.\S+$/.test(normalizedEmail)) {
      setAuthMessage("Digite um e-mail válido.");
      return;
    }
    if (password.length < 8) {
      setAuthMessage("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    if (authMode === "register") {
      if (!displayName.trim()) {
        setAuthMessage("Digite seu nome.");
        return;
      }
      if (password !== confirmPassword) {
        setAuthMessage("As senhas não são iguais.");
        return;
      }
      if (!acceptedTerms) {
        setAuthMessage(
          "Aceite os Termos de Uso e a Política de Privacidade para continuar.",
        );
        return;
      }
      setAuthMessage("");
      setStep(1);
      return;
    }

    setAuthLoading(true);
    setAuthMessage("");
    const result = await onLogin({ email: normalizedEmail, password });
    setAuthLoading(false);
    if (!result.ok) setAuthMessage(result.error);
  }

  function changeAuthMode(mode) {
    setAuthMode(mode);
    setAuthMessage("");
    setConfirmPassword("");
  }

  function chooseLearningPath(pathId) {
    const path = getLearningPath(pathId);
    const firstAvailableCourse = path.courseIds
      .map((courseId) => courses.find((course) => course.id === courseId))
      .find((course) => course?.status === "available");
    setLearningPathId(pathId);
    if (firstAvailableCourse) setPreferredCourseId(firstAvailableCourse.id);
  }

  return (
    <KeyboardAvoidingView
      style={styles.onboardingScreen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 8 : 0}
    >
      <LinearGradient
        colors={gradients.lightBackground}
        locations={[0, 0.52, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          styles.onboardingGlowBlue,
          {
            transform: [
              {
                translateX: loginFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-18, 22],
                }),
              },
              {
                translateY: loginFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-8, 34],
                }),
              },
              {
                scale: loginFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.12],
                }),
              },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.onboardingGlowPurple,
          {
            transform: [
              {
                translateX: loginFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [24, -16],
                }),
              },
              {
                translateY: loginFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [18, -24],
                }),
              },
              {
                scale: loginFloat.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1.1, 0.96],
                }),
              },
            ],
          },
        ]}
      />
      <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
      />

      <ScrollView
        contentContainerStyle={[
          styles.onboardingContent,
          step === 0 && styles.onboardingContentStatic,
        ]}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        scrollEnabled={step !== 0 || authMode === "register"}
        bounces={false}
        overScrollMode="never"
      >
        {step === 0 ? (
          <View style={styles.loginScreenContent}>
            <LinearGradient
              colors={gradients.loadingBackground}
              locations={[0, 0.54, 1]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[
                styles.loginHero,
                authMode === "login" && styles.loginHeroCompact,
                authMode === "register" && styles.loginHeroRegister,
                {
                  minHeight:
                    authMode === "register"
                      ? 300
                      : Math.max(400, screenHeight * 0.43),
                },
              ]}
            >
              <View style={styles.loginHeroLayerOne} />
              <View style={styles.loginHeroLayerTwo} />
              <View
                style={[styles.loginCircuitLine, styles.loginCircuitLineOne]}
              />
              <View
                style={[styles.loginCircuitLine, styles.loginCircuitLineTwo]}
              />
              <View
                style={[styles.loginCircuitLine, styles.loginCircuitLineThree]}
              />
              <View
                style={[styles.loginCircuitLine, styles.loginCircuitLineFour]}
              />
              <View
                style={[styles.loginCircuitNode, styles.loginCircuitNodeOne]}
              />
              <View
                style={[styles.loginCircuitNode, styles.loginCircuitNodeTwo]}
              />
              <View
                style={[styles.loginCircuitNode, styles.loginCircuitNodeThree]}
              />
              <View
                style={[
                  styles.loginBrandArea,
                  authMode === "register" && styles.loginBrandAreaRegister,
                ]}
              >
                {authMode !== "register" && (
                  <>
                    <View style={styles.loginOrbitOuter} />
                    <View style={styles.loginOrbitInner} />
                    <Animated.View
                      style={[
                        styles.loginBulbGlow,
                        {
                          opacity: loginFloat.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0.08, 0.18],
                          }),
                          transform: [
                            { scaleX: 1.12 },
                            {
                              scale: loginFloat.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0.92, 1.08],
                              }),
                            },
                          ],
                        },
                      ]}
                    />
                  </>
                )}
                <Animated.Image
                  source={BRAND_ICON}
                  resizeMode="contain"
                  style={[
                    styles.loginBulb,
                    authMode === "register" && styles.loginBulbRegister,
                    {
                      transform: [
                        {
                          translateY: loginFloat.interpolate({
                            inputRange: [0, 1],
                            outputRange: [3, -8],
                          }),
                        },
                        
                        {
                          scale: loginFloat.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.025],
                          }),
                        },
                      ],
                    },
                  ]}
                />
                <View
                  style={[
                    styles.loginBrandNameRow,
                    authMode === "register" && styles.loginBrandNameRowRegister,
                  ]}
                >
                  <Text
                    style={[
                      styles.loginBrandStudy,
                      authMode === "register" && styles.loginBrandTextRegister,
                    ]}
                  >
                    Study
                  </Text>
                  <Text
                    style={[
                      styles.loginBrandCode,
                      authMode === "register" && styles.loginBrandTextRegister,
                    ]}
                  >
                    Code
                  </Text>
                </View>
              </View>
            </LinearGradient>

            <View
              importantForAutofill={
                authMode === "register" ? "noExcludeDescendants" : "auto"
              }
              style={[
                styles.loginForm,
                authMode === "login" && styles.loginFormCompact,
                authMode === "register" && styles.loginFormRegister,
              ]}
            >
              <View style={styles.loginFormAccent} />
              <Text style={styles.loginFormTitle}>
                {authMode === "register" ? "Crie sua conta" : "Bem-vindo de volta"}
              </Text>
              <Text style={styles.loginFormSubtitle}>
                {authMode === "register"
                  ? "Salve seu progresso e evolua em qualquer dispositivo."
                  : "Entre para continuar exatamente de onde parou."}
              </Text>
              <View style={styles.loginModeSwitch}>
                {[
                  { id: "login", label: "Entrar" },
                  { id: "register", label: "Criar conta" },
                ].map((mode) => (
                  <Pressable
                    key={mode.id}
                    onPress={() => changeAuthMode(mode.id)}
                    style={[
                      styles.loginModeOption,
                      authMode === mode.id && styles.loginModeOptionActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.loginModeOptionText,
                        authMode === mode.id && styles.loginModeOptionTextActive,
                      ]}
                    >
                      {mode.label}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {authMode === "register" && (
                <View style={styles.loginInputShell}>
                  <Text style={styles.loginInputIcon}>◇</Text>
                  <TextInput
                    value={displayName}
                    onChangeText={setDisplayName}
                    placeholder="Seu nome"
                    placeholderTextColor={colors.textMuted}
                    autoCapitalize="words"
                    autoCorrect={false}
                    autoComplete="off"
                    style={styles.loginInput}
                  />
                </View>
              )}
              <View
                style={[
                  styles.loginInputShell,
                  authMode === "login" && styles.loginInputShellCompact,
                ]}
              >
                <Text style={styles.loginInputIcon}>@</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  placeholder="E-mail"
                  placeholderTextColor={colors.textMuted}
                  autoCapitalize="none"
                  autoCorrect={false}
                  autoComplete="off"
                  keyboardType="email-address"
                  style={styles.loginInput}
                />
              </View>
              <View
                style={[
                  styles.loginInputShell,
                  authMode === "login" && styles.loginInputShellCompact,
                ]}
              >
                <Text style={styles.loginInputIcon}>●</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="Senha"
                  placeholderTextColor={colors.textMuted}
                  secureTextEntry={!passwordVisible}
                  autoComplete="off"
                  style={styles.loginInput}
                />
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={
                    passwordVisible ? "Ocultar senha" : "Mostrar senha"
                  }
                  onPress={() => setPasswordVisible((current) => !current)}
                  hitSlop={8}
                >
                  <Text style={styles.loginPasswordToggle}>
                    {passwordVisible ? "OCULTAR" : "VER"}
                  </Text>
                </Pressable>
              </View>

              {authMode === "register" && (
                <View style={styles.loginInputShell}>
                  <Text style={styles.loginInputIcon}>●</Text>
                  <TextInput
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder="Confirme sua senha"
                    placeholderTextColor={colors.textMuted}
                    secureTextEntry={!passwordVisible}
                    autoComplete="off"
                    style={styles.loginInput}
                  />
                </View>
              )}

              {authMode === "register" && (
                <View style={styles.loginTermsRow}>
                  <Pressable
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: acceptedTerms }}
                    onPress={() => setAcceptedTerms((current) => !current)}
                    style={[
                      styles.loginTermsCheck,
                      acceptedTerms && styles.loginTermsCheckActive,
                    ]}
                  >
                    <Text style={styles.loginTermsCheckText}>
                      {acceptedTerms ? "✓" : ""}
                    </Text>
                  </Pressable>
                  <Text style={styles.loginTermsText}>
                    Li e aceito os{" "}
                    <Text
                      style={styles.loginTermsLink}
                      onPress={() => setLegalDocument("terms")}
                    >
                      Termos de Uso
                    </Text>{" "}
                    e a{" "}
                    <Text
                      style={styles.loginTermsLink}
                      onPress={() => setLegalDocument("privacy")}
                    >
                      Política de Privacidade
                    </Text>
                    .
                  </Text>
                </View>
              )}

              {Boolean(authMessage) && (
                <View style={styles.loginMessage}>
                  <Text style={styles.loginMessageText}>{authMessage}</Text>
                </View>
              )}

              <Pressable
                accessibilityRole="button"
                onPress={continueAuthentication}
                disabled={authLoading}
                style={({ pressed }) => [
                  styles.onboardingPrimaryButton,
                  styles.loginButton,
                  authMode === "login" && styles.loginButtonCompact,
                  pressed && styles.pressed,
                ]}
              >
                <LinearGradient
                  colors={gradients.primaryButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                <Text style={styles.onboardingPrimaryButtonText}>
                  {authLoading
                    ? "Conectando..."
                    : authMode === "register"
                      ? "Continuar cadastro"
                      : "Entrar"}
                </Text>
                <Text style={styles.loginButtonArrow}>→</Text>
              </Pressable>
              <Pressable
                onPress={() =>
                  changeAuthMode(authMode === "register" ? "login" : "register")
                }
                style={styles.loginAlternativeButton}
              >
                <Text style={styles.loginAlternativeText}>
                  {authMode === "register"
                    ? "Já possui uma conta? Entrar"
                    : "Primeira vez aqui? Criar uma conta"}
                </Text>
              </Pressable>
            </View>

            <View
              style={[
                styles.loginPopularSection,
                authMode === "login" && styles.loginPopularSectionCompact,
              ]}
            >
              <Text style={styles.loginPopularLabel}>
                TRILHAS MAIS PROCURADAS
              </Text>
              <View style={styles.loginPopularChips}>
                {popularCourses.map((course) => (
                  <View
                    key={course.id}
                    style={[
                      styles.loginPopularChip,
                      {
                        backgroundColor: colorWithAlpha(course.color, 0.18),
                        borderColor: colorWithAlpha(course.color, 0.7),
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.loginPopularIcon,
                        { backgroundColor: course.color },
                      ]}
                    >
                      <Text
                        style={[
                          styles.loginPopularIconText,
                          { color: course.textColor },
                        ]}
                      >
                        {course.shortName}
                      </Text>
                    </View>
                    <Text style={styles.loginPopularChipText}>
                      {course.title}
                    </Text>
                  </View>
                ))}
              </View>
            </View>

            <Text
              style={[
                styles.loginFooter,
                authMode === "login" && styles.loginFooterCompact,
              ]}
            >
              VM Nexus Digital
            </Text>
          </View>
        ) : (
          <View style={styles.onboardingPanel}>
            <Text style={styles.onboardingEyebrow}>
              VAMOS AJUSTAR SUA TRILHA
            </Text>
            <Text style={styles.onboardingTitle}>
              Conte um pouco sobre você.
            </Text>
            <Text style={styles.onboardingDescription}>
              Essas escolhas ajudam o StudyCode a recomendar aulas na
              dificuldade certa.
            </Text>

            <Text style={styles.onboardingFieldLabel}>Qual é o seu nível?</Text>
            <View style={styles.onboardingOptionGrid}>
              {experienceOptions.map((option) => (
                <Pressable
                  key={option.id}
                  onPress={() => setExperienceLevel(option.id)}
                  style={[
                    styles.onboardingOption,
                    experienceLevel === option.id &&
                      styles.onboardingOptionSelected,
                  ]}
                >
                  <Text style={styles.onboardingOptionTitle}>
                    {option.label}
                  </Text>
                  <Text style={styles.onboardingOptionHelper}>
                    {option.helper}
                  </Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.onboardingFieldLabel}>
              O que você quer criar?
            </Text>
            <View style={styles.onboardingGoalGrid}>
              {goalOptions.map((option) => (
                <Pressable
                  key={option.id}
                  onPress={() => setLearningGoal(option.id)}
                  style={[
                    styles.onboardingGoal,
                    learningGoal === option.id && styles.onboardingGoalSelected,
                  ]}
                >
                  <Text style={styles.onboardingGoalIcon}>{option.icon}</Text>
                  <Text style={styles.onboardingGoalLabel}>{option.label}</Text>
                </Pressable>
              ))}
            </View>

            <Text style={styles.onboardingFieldLabel}>
              Qual caminho quer seguir?
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.onboardingPathRow}
            >
              {learningPaths.map((path) => (
                <Pressable
                  key={path.id}
                  onPress={() => chooseLearningPath(path.id)}
                  style={[
                    styles.onboardingPathCard,
                    learningPathId === path.id &&
                      styles.onboardingPathCardSelected,
                  ]}
                >
                  <Text style={styles.onboardingPathIcon}>{path.icon}</Text>
                  <Text style={styles.onboardingPathTitle}>{path.title}</Text>
                  <Text style={styles.onboardingPathText}>{path.subtitle}</Text>
                </Pressable>
              ))}
            </ScrollView>

            <Text style={styles.onboardingFieldLabel}>
              Escolha sua primeira trilha
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.onboardingCourseRow}
            >
              {courses
                .filter((course) => course.status === "available")
                .map((course) => (
                  <Pressable
                    key={course.id}
                    onPress={() => setPreferredCourseId(course.id)}
                    style={[
                      styles.onboardingCourse,
                      preferredCourseId === course.id &&
                        styles.onboardingCourseSelected,
                    ]}
                  >
                    <View
                      style={[
                        styles.onboardingCourseIcon,
                        { backgroundColor: course.color },
                      ]}
                    >
                      <CourseSymbol course={course} />
                    </View>
                    <Text style={styles.onboardingCourseTitle}>
                      {course.title}
                    </Text>
                    <Text style={styles.onboardingCourseStatus}>
                      disponível
                    </Text>
                  </Pressable>
                ))}
            </ScrollView>

            <View style={styles.onboardingButtonRow}>
              <Pressable
                onPress={() => setStep(0)}
                style={styles.onboardingBackButton}
              >
                <Text style={styles.onboardingBackButtonText}>Voltar</Text>
              </Pressable>
              <Pressable
                onPress={finish}
                disabled={authLoading}
                style={({ pressed }) => [
                  styles.onboardingPrimaryButton,
                  styles.onboardingFinishButton,
                  pressed && styles.pressed,
                ]}
              >
                <LinearGradient
                  colors={gradients.primaryButton}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                <Text style={styles.onboardingPrimaryButtonText}>
                  {authLoading ? "Criando conta..." : "Começar agora"}
                </Text>
                <Text style={styles.onboardingPrimaryButtonArrow}>›</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function AnimatedBackground({ isLightTheme }) {
  const { width, height } = useWindowDimensions();

  return (
    <View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]}
    >
      <LinearGradient
        colors={
          isLightTheme
            ? gradients.auroraBackground
            : gradients.auroraDarkBackground
        }
        locations={[0, 0.54, 1]}
        start={{ x: 0.08, y: 0 }}
        end={{ x: 0.92, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View
        style={[
          styles.auroraGlowCyan,
          {
            width: width * 0.95,
            height: width * 0.95,
            borderRadius: width * 0.475,
          },
        ]}
      />
      <View
        style={[
          styles.auroraGlowPurple,
          {
            width: width * 1.08,
            height: width * 1.08,
            borderRadius: width * 0.54,
            top: height * 0.62,
          },
        ]}
      />
      <View
        style={[styles.auroraDot, { top: height * 0.16, left: width * 0.13 }]}
      />
      <View
        style={[styles.auroraDot, { top: height * 0.31, right: width * 0.11 }]}
      />
      <View
        style={[
          styles.auroraDot,
          styles.auroraDotSmall,
          { top: height * 0.52, left: width * 0.09 },
        ]}
      />
      <View
        style={[
          styles.auroraDot,
          styles.auroraDotSmall,
          { top: height * 0.7, right: width * 0.17 },
        ]}
      />
      <LinearGradient
        colors={[
          colors.auroraOverlayTop,
          colors.transparent,
          colors.auroraOverlayBottom,
        ]}
        locations={[0, 0.5, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0.7, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
    </View>
  );
}

function ScreenHeader({ title, onBack, right }) {
  return (
    <View style={styles.screenHeader}>
      <Pressable
        accessibilityRole="button"
        onPress={onBack}
        style={styles.backButton}
      >
        <Text style={styles.backButtonText}>‹</Text>
      </Pressable>
      <Text style={styles.screenHeaderTitle} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.headerRight}>{right}</View>
    </View>
  );
}

function CourseSymbol({ course, large = false }) {
  const size = large ? 38 : 25;
  const color = course.textColor;

  if (course.id === "react") {
    return (
      <View
        style={{
          width: size,
          height: size,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {["0deg", "60deg", "-60deg"].map((rotation) => (
          <View
            key={rotation}
            style={[
              styles.reactSymbolOrbit,
              {
                width: size * 1.45,
                height: size * 0.62,
                borderRadius: size,
                borderColor: color,
                transform: [{ rotate: rotation }],
              },
            ]}
          />
        ))}
        <View
          style={[
            styles.reactSymbolCore,
            {
              width: size * 0.27,
              height: size * 0.27,
              borderRadius: size,
              backgroundColor: color,
            },
          ]}
        />
      </View>
    );
  }

  if (course.id === "nextjs") {
    return (
      <View style={[styles.nextSymbol, { width: size, height: size }]}>
        <Text style={[styles.nextSymbolText, { color }]}>N</Text>
        <View style={[styles.nextSymbolSlash, { backgroundColor: color }]} />
      </View>
    );
  }

  if (course.id === "nodejs") {
    return (
      <Text style={[styles.nodeSymbol, { color, fontSize: size * 0.9 }]}>
        ⬡
      </Text>
    );
  }

  return (
    <Text
      style={[
        styles.courseBadgeText,
        {
          color,
          fontSize: large
            ? course.shortName.length > 2
              ? 15
              : 21
            : course.shortName.length > 2
              ? 10
              : 14,
        },
      ]}
    >
      {course.shortName}
    </Text>
  );
}

function ProfileAchievement({ icon, title, detail, unlocked }) {
  return (
    <View
      style={[
        styles.profileAchievement,
        !unlocked && styles.profileAchievementLocked,
      ]}
    >
      <Text style={styles.profileAchievementIcon}>{unlocked ? icon : "?"}</Text>
      <Text style={styles.profileAchievementTitle}>{title}</Text>
      <Text style={styles.profileAchievementDetail}>{detail}</Text>
      <View
        style={[
          styles.profileAchievementDot,
          unlocked && styles.profileAchievementDotUnlocked,
        ]}
      />
    </View>
  );
}

function DailyMissionCard({
  missions,
  onPress,
  compact = false,
  rewardClaimed = false,
}) {
  const completedCount = missions.filter((mission) => mission.complete).length;
  const card = (
    <View
      style={[
        styles.dailyMissionCard,
        compact && styles.dailyMissionCardCompact,
      ]}
    >
      <LinearGradient
        colors={
          completedCount === missions.length
            ? gradients.achievement
            : gradients.brand
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.dailyMissionAccent}
      />
      <LinearGradient
        colors={gradients.sunCorner}
        locations={[0, 0.42, 1]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.sunCornerGlowTopRight}
      />
      <View style={styles.dailyMissionCopy}>
        <View style={styles.dailyMissionHeading}>
          <View>
            <Text style={styles.dailyMissionEyebrow}>MISSÕES DE HOJE</Text>
            <Text style={styles.dailyMissionTitle}>
              {completedCount === missions.length
                ? rewardClaimed
                  ? "Missão cumprida · +25 XP"
                  : "Missão cumprida!"
                : `${completedCount} de ${missions.length} concluídas`}
            </Text>
          </View>
          <Text style={styles.dailyMissionCount}>
            {completedCount}/{missions.length}
          </Text>
        </View>
        <View style={styles.dailyMissionList}>
          {missions.map((mission) => (
            <View key={mission.id} style={styles.dailyMissionItem}>
              <Text style={styles.dailyMissionIcon}>
                {mission.complete ? "✓" : mission.icon}
              </Text>
              <View style={{ flex: 1 }}>
                <View style={styles.dailyMissionLabelRow}>
                  <Text style={styles.dailyMissionLabel}>{mission.title}</Text>
                  <Text style={styles.dailyMissionValue}>
                    {Math.min(mission.value, mission.target)}/{mission.target}
                  </Text>
                </View>
                <View style={styles.dailyMissionTrack}>
                  <View
                    style={[
                      styles.dailyMissionFill,
                      mission.complete && styles.dailyMissionFillComplete,
                      {
                        width: `${Math.max(mission.percent, mission.value ? 6 : 0)}%`,
                      },
                    ]}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      </View>
    </View>
  );

  if (!onPress) return card;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed && styles.pressed]}
    >
      {card}
    </Pressable>
  );
}

function AchievementGrid({ achievements, limit }) {
  const visibleAchievements = limit
    ? achievements.slice(0, limit)
    : achievements;

  return (
    <View style={styles.achievementGrid}>
      {visibleAchievements.map((achievement) => (
        <View
          key={achievement.id}
          style={[
            styles.achievementCard,
            achievement.unlocked && styles.achievementCardUnlocked,
          ]}
        >
          <View
            style={[
              styles.achievementBadge,
              achievement.unlocked && styles.achievementBadgeUnlocked,
            ]}
          >
            <Text style={styles.achievementBadgeIcon}>
              {achievement.unlocked ? achievement.icon : "?"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.achievementTitle}>{achievement.title}</Text>
            <Text style={styles.achievementDetail}>{achievement.detail}</Text>
          </View>
          {achievement.unlocked && (
            <Text style={styles.achievementCheck}>✓</Text>
          )}
        </View>
      ))}
    </View>
  );
}

function ProfileSettingsRow({ icon, title, detail, onPress, last = false }) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.profileSettingsRow,
        last && styles.profileSettingsRowLast,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.profileSettingsIconWrap}>
        <Text style={styles.profileSettingsIcon}>{icon}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.profileSettingsTitle}>{title}</Text>
        <Text style={styles.profileSettingsDetail}>{detail}</Text>
      </View>
      <Text style={styles.profileSettingsArrow}>›</Text>
    </Pressable>
  );
}

function HomeScreen({
  progress,
  profile,
  isLightTheme,
  onUpdateProfile,
  onOpenReview,
  onOpenDashboard,
  onOpenBilling,
  onOpenCodeCoin,
  onOpenProjects,
  onOpenDictionary,
  onSignOut,
  onOpenCourse,
}) {
  const [avatarMenuVisible, setAvatarMenuVisible] = useState(false);
  const [profilePanel, setProfilePanel] = useState(null);
  const [profileNameDraft, setProfileNameDraft] = useState("");
  const [profileEmailDraft, setProfileEmailDraft] = useState("");
  const [mentorVisible, setMentorVisible] = useState(false);
  const [mentorTopic, setMentorTopic] = useState("next");
  const [mentorInput, setMentorInput] = useState("");
  const [mentorSending, setMentorSending] = useState(false);
  const [mentorChat, setMentorChat] = useState([]);
  const profileInitial = (profile.displayName || "Estudante")
    .charAt(0)
    .toUpperCase();
  const featuredCourse =
    getRecommendedCourse(profile, progress) ??
    courses.find((course) => course.id === "javascript") ??
    courses[0];
  const featuredLessons = getCourseLessons(featuredCourse.id);
  const nextLesson =
    featuredLessons.find(
      (lesson) => !progress.completedLessons.includes(lesson.id),
    ) ?? featuredLessons[0];
  const completedCount = progress.completedLessons.filter((id) =>
    id.startsWith(getCoursePrefix(featuredCourse.id)),
  ).length;
  const progressPercent = Math.round(
    (completedCount / Math.max(featuredLessons.length, 1)) * 100,
  );
  const preferredCourse = featuredCourse;
  const activeLearningPath = getLearningPath(profile.learningPathId);
  const dailyMissions = getDailyMissions(progress);
  const completedDailyMissions = dailyMissions.filter(
    (mission) => mission.complete,
  ).length;
  const courseCertificates = courses.map((course) => {
    const lessons = getCourseLessons(course.id);
    const completed = lessons.filter((lesson) =>
      progress.completedLessons.includes(lesson.id),
    ).length;
    return {
      ...course,
      completed,
      total: lessons.length,
      percent: Math.round((completed / Math.max(lessons.length, 1)) * 100),
      unlocked: lessons.length > 0 && completed === lessons.length,
    };
  });
  const earnedCertificateCount = courseCertificates.filter(
    (course) => course.unlocked,
  ).length;
  const dailyRewardClaimed =
    progress.dailyMissionDate === dateKey() &&
    progress.dailyMissionRewardClaimed;
  const mentorMessages = {
    next:
      progress.completedLessons.length === 0
        ? `Comece pela primeira aula de ${preferredCourse.title}. Uma missao curta hoje ja coloca sua jornada em movimento.`
        : `Seu proximo passo e concluir a aula que esta aberta. Depois do desafio, revise a explicacao antes de avancar.`,
    progress: `Voce ja acumulou ${progress.xp} XP e concluiu ${progress.completedLessons.length} aula(s). Progresso consistente vence a pressa.`,
    focus:
      progress.streak > 0
        ? `Sua sequencia esta em ${progress.streak} dia(s). Reserve 10 minutos e mantenha o foguete no ar.`
        : "Escolha um bloco de 10 minutos, desligue as notificacoes e faca apenas uma aula. Foco pequeno tambem e evolucao.",
  };

  function selectMentorTopic(topic) {
    setMentorTopic(topic);
    setMentorChat((current) => [
      ...current,
      {
        id: `${Date.now()}-${topic}`,
        role: "assistant",
        text: mentorMessages[topic],
      },
    ]);
  }

  async function sendMentorQuestion() {
    const message = mentorInput.trim();
    if (!message || mentorSending) return;

    setMentorInput("");
    setMentorChat((current) => [
      ...current,
      { id: `${Date.now()}-user`, role: "user", text: message },
    ]);
    setMentorSending(true);
    const reply = await askMentor({ message, profile, progress });
    setMentorChat((current) => [
      ...current,
      { id: `${Date.now()}-assistant`, role: "assistant", text: reply },
    ]);
    setMentorSending(false);
  }
  const entrance = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(entrance, {
      toValue: 1,
      duration: 700,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [entrance]);

  async function chooseAvatarPhoto() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.85,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      await onUpdateProfile({ avatarUri: result.assets[0].uri });
    }
  }

  function openProfilePanel(panel) {
    if (panel === "edit") {
      setProfileNameDraft(profile.displayName || "");
      setProfileEmailDraft(profile.email || "");
    }
    setAvatarMenuVisible(false);
    setProfilePanel(panel);
  }

  async function saveProfileDetails() {
    await onUpdateProfile({
      displayName: profileNameDraft.trim() || "Estudante",
      email: profileEmailDraft.trim(),
    });
    setProfilePanel(null);
  }

  async function shareStudyCode() {
    setAvatarMenuVisible(false);
    await Share.share({
      title: "StudyCode",
      message:
        "Estou estudando programação com o StudyCode: aulas, desafios, revisão e evolução em uma única jornada.",
    });
  }

  async function changeLearningPath(pathId) {
    const path = getLearningPath(pathId);
    const firstAvailableCourse = path.courseIds
      .map((courseId) => courses.find((course) => course.id === courseId))
      .find((course) => course?.status === "available");
    await onUpdateProfile({
      learningPathId: pathId,
      preferredCourseId: firstAvailableCourse?.id ?? profile.preferredCourseId,
    });
  }

  return (
    <Animated.ScrollView
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      style={{
        opacity: entrance,
        transform: [
          {
            translateY: entrance.interpolate({
              inputRange: [0, 1],
              outputRange: [22, 0],
            }),
          },
        ],
      }}
    >
      <View style={styles.homeTopPanel}>
        <LinearGradient
          colors={[colors.secondary, colors.primary, colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.homeStudyHeader}
        >
          <View style={styles.homeStudyHeaderRow}>
            <Pressable
              accessibilityLabel="Abrir menu do perfil"
              accessibilityRole="button"
              onPress={() => setAvatarMenuVisible(true)}
              style={({ pressed }) => [
                styles.homeMenuButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.homeMenuButtonText}>≡</Text>
            </Pressable>
            <View style={styles.homeGreetingBlock}>
              <Text style={styles.homeGreeting}>
                Olá, {profile.displayName?.split(" ")[0] || "Dev"}!{" "}
                <Text style={styles.homeGreetingAccent}>👋</Text>
              </Text>
              <Text style={styles.homeGreetingSubtitle}>
                Bora aprender algo novo hoje?
              </Text>
            </View>
            <Pressable
              accessibilityLabel="Ver sequência de estudos"
              accessibilityRole="button"
              onPress={() => setAvatarMenuVisible(true)}
              style={({ pressed }) => [
                styles.homeStreakButton,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.homeStreakIcon}>🔥</Text>
              <Text style={styles.homeStreakValue}>{progress.streak}</Text>
            </Pressable>
          </View>
          <LinearGradient
            pointerEvents="none"
            colors={[
              "rgba(11,49,72,0.52)",
              "rgba(11,49,72,0.18)",
              "rgba(11,49,72,0)",
            ]}
            locations={[0, 0.42, 1]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.homeHeaderDropShadow}
          />
        </LinearGradient>

        <Modal
          visible={avatarMenuVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setAvatarMenuVisible(false)}
        >
          <Pressable
            style={styles.avatarModalBackdrop}
            onPress={() => setAvatarMenuVisible(false)}
          >
            <Pressable style={styles.avatarMenu} onPress={() => {}}>
              <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.profileScrollContent}
              >
                <LinearGradient
                  colors={[
                    colors.secondary,
                    colors.primary,
                    colors.primaryLight,
                  ]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.avatarMenuHero}
                >
                  <View style={styles.avatarMenuHeader}>
                    <View style={styles.avatarMenuAvatarRing}>
                      <View style={styles.avatarMenuAvatar}>
                        {profile.avatarUri ? (
                          <Image
                            source={{ uri: profile.avatarUri }}
                            resizeMode="cover"
                            style={styles.avatarMenuAvatarImage}
                          />
                        ) : (
                          <Text style={styles.avatarMenuAvatarText}>
                            {profileInitial}
                          </Text>
                        )}
                      </View>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.avatarMenuEyebrow}>
                        PERFIL DE ESTUDO
                      </Text>
                      <Text style={styles.avatarMenuTitle}>
                        {profile.displayName || "Estudante"}
                      </Text>
                      <Text style={styles.avatarMenuSubtitle}>
                        {activeLearningPath.title}
                      </Text>
                    </View>
                    <Pressable
                      accessibilityLabel="Fechar menu do perfil"
                      accessibilityRole="button"
                      onPress={() => setAvatarMenuVisible(false)}
                      style={styles.avatarMenuClose}
                    >
                      <Text style={styles.avatarMenuCloseText}>{"\u00D7"}</Text>
                    </Pressable>
                  </View>
                </LinearGradient>

                <View style={styles.avatarMenuStats}>
                  <View style={styles.avatarMenuStat}>
                    <Text style={styles.avatarMenuStatKicker}>XP</Text>
                    <Text style={styles.avatarMenuStatValue}>
                      {progress.xp}
                    </Text>
                    <Text style={styles.avatarMenuStatLabel}>XP total</Text>
                  </View>
                  <View style={styles.avatarMenuStatDivider} />
                  <View style={styles.avatarMenuStat}>
                    <Text style={styles.avatarMenuStatKicker}>FOGO</Text>
                    <Text style={styles.avatarMenuStatValue}>
                      {progress.streak}
                    </Text>
                    <Text style={styles.avatarMenuStatLabel}>
                      dias seguidos
                    </Text>
                  </View>
                  <View style={styles.avatarMenuStatDivider} />
                  <View style={styles.avatarMenuStat}>
                    <Text style={styles.avatarMenuStatKicker}>AULAS</Text>
                    <Text style={styles.avatarMenuStatValue}>
                      {progress.completedLessons.length}
                    </Text>
                    <Text style={styles.avatarMenuStatLabel}>aulas</Text>
                  </View>
                </View>

                <View style={styles.profileActionRow}>
                  <Pressable
                    onPress={() => {
                      setAvatarMenuVisible(false);
                      onOpenCourse(featuredCourse.id);
                    }}
                    style={({ pressed }) => [
                      styles.avatarMenuAction,
                      pressed && styles.pressed,
                    ]}
                  >
                    <LinearGradient
                      colors={gradients.primaryButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={StyleSheet.absoluteFill}
                    />
                    <Text style={styles.avatarMenuActionIcon}>{"\u2192"}</Text>
                    <Text style={styles.avatarMenuActionTitle}>Continuar</Text>
                    <Text style={styles.avatarMenuActionText} numberOfLines={1}>
                      {featuredCourse.title}
                    </Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      setAvatarMenuVisible(false);
                      onOpenDashboard();
                    }}
                    style={({ pressed }) => [
                      styles.avatarMenuDashboardAction,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.avatarMenuDashboardIcon}>↗</Text>
                    <Text style={styles.avatarMenuDashboardTitle}>
                      Evolução
                    </Text>
                    <Text style={styles.avatarMenuDashboardText}>
                      Ver painel
                    </Text>
                  </Pressable>
                </View>

                <View style={styles.profilePreferenceRow}>
                  <Pressable
                    onPress={chooseAvatarPhoto}
                    style={({ pressed }) => [
                      styles.avatarMenuOption,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.avatarMenuOptionIcon}>FOTO</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.avatarMenuOptionTitle}>
                        Sua imagem
                      </Text>
                      <Text style={styles.avatarMenuOptionText}>
                        Alterar foto
                      </Text>
                    </View>
                    <Text style={styles.avatarMenuOptionArrow}>{"\u203A"}</Text>
                  </Pressable>

                  <Pressable
                    onPress={() =>
                      onUpdateProfile({
                        themeMode: isLightTheme ? "dark" : "light",
                      })
                    }
                    style={({ pressed }) => [
                      styles.avatarMenuOption,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.avatarMenuOptionIcon}>
                      {isLightTheme ? "SOL" : "LUA"}
                    </Text>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.avatarMenuOptionTitle}>
                        Aparência
                      </Text>
                      <Text style={styles.avatarMenuOptionText}>
                        Tema {isLightTheme ? "claro" : "escuro"}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.themeSwitch,
                        isLightTheme && styles.themeSwitchActive,
                      ]}
                    >
                      <View
                        style={[
                          styles.themeSwitchThumb,
                          isLightTheme && styles.themeSwitchThumbActive,
                        ]}
                      />
                    </View>
                  </Pressable>
                </View>

                <View style={styles.profileSectionHeader}>
                  <Text style={styles.profileSectionTitle}>Configurações</Text>
                  <Text style={styles.profileSectionMeta}>seu perfil</Text>
                </View>
                <View style={styles.profileSettingsCard}>
                  <ProfileSettingsRow
                    icon="EU"
                    title="Editar perfil"
                    detail="Nome, e-mail e informações pessoais"
                    onPress={() => openProfilePanel("edit")}
                  />
                  <ProfileSettingsRow
                    icon="ALVO"
                    title="Missões de hoje"
                    detail={`${completedDailyMissions}/${dailyMissions.length} objetivos concluídos`}
                    onPress={() => openProfilePanel("missions")}
                  />
                  <ProfileSettingsRow
                    icon="CERT"
                    title="Certificados"
                    detail={`${earnedCertificateCount} certificado(s) conquistado(s)`}
                    onPress={() => openProfilePanel("certificates")}
                  />
                  <ProfileSettingsRow
                    icon="PRO"
                    title="Plano e assinatura"
                    detail="Veja benefícios, status e pagamentos"
                    onPress={() => {
                      setAvatarMenuVisible(false);
                      onOpenBilling();
                    }}
                  />
                  <ProfileSettingsRow
                    icon="CC"
                    title="CodeCoin"
                    detail="Saldo, benefícios e pacotes de moedas"
                    onPress={() => {
                      setAvatarMenuVisible(false);
                      onOpenCodeCoin();
                    }}
                  />
                  <ProfileSettingsRow
                    icon="+1"
                    title="Compartilhar StudyCode"
                    detail="Convide alguém para estudar com você"
                    onPress={shareStudyCode}
                  />
                  <ProfileSettingsRow
                    icon="SAIR"
                    title="Sair da conta local"
                    detail="Voltar para a tela de login sem apagar seu progresso"
                    onPress={() => {
                      setAvatarMenuVisible(false);
                      onSignOut();
                    }}
                    last
                  />
                </View>

                <View style={styles.profileSectionHeader}>
                  <Text style={styles.profileSectionTitle}>Caminho guiado</Text>
                  <Text style={styles.profileSectionMeta}>
                    {activeLearningPath.title}
                  </Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.profilePathRow}
                >
                  {learningPaths.map((path) => (
                    <Pressable
                      key={path.id}
                      onPress={() => changeLearningPath(path.id)}
                      style={[
                        styles.profilePathCard,
                        path.id === activeLearningPath.id &&
                          styles.profilePathCardSelected,
                      ]}
                    >
                      <Text style={styles.profilePathIcon}>{path.icon}</Text>
                      <Text style={styles.profilePathTitle}>{path.title}</Text>
                      <Text style={styles.profilePathText}>
                        {path.subtitle}
                      </Text>
                    </Pressable>
                  ))}
                </ScrollView>
                <View style={styles.profileSectionHeader}>
                  <Text style={styles.profileSectionTitle}>Trilha atual</Text>
                  <Text style={styles.profileSectionMeta}>
                    {completedCount}/{featuredLessons.length} aulas
                  </Text>
                </View>

                <Pressable
                  onPress={() => {
                    setAvatarMenuVisible(false);
                    onOpenCourse(featuredCourse.id);
                  }}
                  style={({ pressed }) => [
                    styles.profileCurrentCourse,
                    pressed && styles.pressed,
                  ]}
                >
                  <LinearGradient
                    colors={[
                      colors.white,
                      colorWithAlpha(featuredCourse.color, 0.24),
                    ]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />
                  <View
                    style={[
                      styles.profileCourseIcon,
                      { backgroundColor: featuredCourse.color },
                    ]}
                  >
                    <CourseSymbol course={featuredCourse} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.profileCurrentCourseTitle}>
                      {featuredCourse.title}
                    </Text>
                    <Text style={styles.profileCurrentCourseText}>
                      {progressPercent}% concluído · próxima aula disponível
                    </Text>
                    <View style={styles.profileCourseProgressTrack}>
                      <View
                        style={[
                          styles.profileCourseProgressFill,
                          {
                            width: `${Math.max(progressPercent, 3)}%`,
                            backgroundColor: featuredCourse.color,
                          },
                        ]}
                      />
                    </View>
                  </View>
                  <Text style={styles.profileChevron}>›</Text>
                </Pressable>

                <View style={styles.profileSectionHeader}>
                  <Text style={styles.profileSectionTitle}>
                    Próximas linguagens
                  </Text>
                  <Text style={styles.profileSectionMeta}>explore</Text>
                </View>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.profileLanguageRow}
                >
                  {courses
                    .filter((course) => course.id !== featuredCourse.id)
                    .map((course) => (
                      <Pressable
                        key={course.id}
                        disabled={course.status !== "available"}
                        onPress={() => {
                          setAvatarMenuVisible(false);
                          onOpenCourse(course.id);
                        }}
                        style={({ pressed }) => [
                          styles.profileLanguageCard,
                          course.status !== "available" &&
                            styles.profileLanguageLocked,
                          pressed && styles.pressed,
                        ]}
                      >
                        <View
                          style={[
                            styles.profileLanguageIcon,
                            { backgroundColor: course.color },
                          ]}
                        >
                          <CourseSymbol course={course} />
                        </View>
                        <Text style={styles.profileLanguageName}>
                          {course.title}
                        </Text>
                        <Text style={styles.profileLanguageStatus}>
                          {course.status === "available"
                            ? "começar"
                            : "em breve"}
                        </Text>
                      </Pressable>
                    ))}
                </ScrollView>

                <View style={styles.profileSectionHeader}>
                  <Text style={styles.profileSectionTitle}>Conquistas</Text>
                  <Text style={styles.profileSectionMeta}>sua evolução</Text>
                </View>
                <View style={styles.profileAchievementGrid}>
                  <ProfileAchievement
                    icon="✦"
                    title="Primeiro passo"
                    detail="Complete uma aula"
                    unlocked={progress.completedLessons.length > 0}
                  />
                  <ProfileAchievement
                    icon="🔥"
                    title="Constância"
                    detail="3 dias seguidos"
                    unlocked={progress.streak >= 3}
                  />
                  <ProfileAchievement
                    icon="⚡"
                    title="Impulso"
                    detail="Alcance 50 XP"
                    unlocked={progress.xp >= 50}
                  />
                  <ProfileAchievement
                    icon="⌘"
                    title="Explorador"
                    detail="Conheça outra trilha"
                    unlocked={progress.completedLessons.some((id) =>
                      id.startsWith("react-"),
                    )}
                  />
                </View>

                <Text style={styles.profileVersion}>
                  StudyCode · sua evolução em código
                </Text>
              </ScrollView>
            </Pressable>
          </Pressable>
        </Modal>

        <Modal
          visible={Boolean(profilePanel)}
          transparent
          animationType="slide"
          onRequestClose={() => setProfilePanel(null)}
        >
          <Pressable
            style={styles.profileDetailBackdrop}
            onPress={() => setProfilePanel(null)}
          >
            <Pressable style={styles.profileDetailSheet} onPress={() => {}}>
              <View style={styles.profileDetailHandle} />
              <View style={styles.profileDetailHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.profileDetailEyebrow}>MEU STUDYCODE</Text>
                  <Text style={styles.profileDetailTitle}>
                    {profilePanel === "edit"
                      ? "Editar perfil"
                      : profilePanel === "missions"
                        ? "Missões de hoje"
                        : "Certificados"}
                  </Text>
                </View>
                <Pressable
                  accessibilityLabel="Fechar painel"
                  accessibilityRole="button"
                  onPress={() => setProfilePanel(null)}
                  style={styles.profileDetailClose}
                >
                  <Text style={styles.profileDetailCloseText}>×</Text>
                </Pressable>
              </View>

              {profilePanel === "edit" && (
                <View style={styles.profileEditForm}>
                  <Text style={styles.profileFieldLabel}>NOME</Text>
                  <TextInput
                    value={profileNameDraft}
                    onChangeText={setProfileNameDraft}
                    placeholder="Como você quer ser chamado?"
                    placeholderTextColor={colors.textMuted}
                    style={styles.profileFieldInput}
                  />
                  <Text style={styles.profileFieldLabel}>E-MAIL</Text>
                  <TextInput
                    value={profileEmailDraft}
                    onChangeText={setProfileEmailDraft}
                    placeholder="seuemail@exemplo.com"
                    placeholderTextColor={colors.textMuted}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={styles.profileFieldInput}
                  />
                  <Pressable
                    onPress={saveProfileDetails}
                    style={({ pressed }) => [
                      styles.profileSaveButton,
                      pressed && styles.pressed,
                    ]}
                  >
                    <LinearGradient
                      colors={gradients.primaryButton}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={StyleSheet.absoluteFill}
                    />
                    <Text style={styles.profileSaveButtonText}>
                      Salvar alterações
                    </Text>
                  </Pressable>
                </View>
              )}

              {profilePanel === "missions" && (
                <View style={styles.profileMissionList}>
                  {dailyMissions.map((mission) => (
                    <View key={mission.id} style={styles.profileMissionItem}>
                      <View
                        style={[
                          styles.profileMissionStatus,
                          mission.complete && styles.profileMissionStatusDone,
                        ]}
                      >
                        <Text style={styles.profileMissionStatusText}>
                          {mission.complete ? "✓" : mission.icon}
                        </Text>
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.profileMissionTitle}>
                          {mission.title}
                        </Text>
                        <View style={styles.profileMissionTrack}>
                          <View
                            style={[
                              styles.profileMissionFill,
                              { width: `${Math.max(mission.percent, 3)}%` },
                            ]}
                          />
                        </View>
                      </View>
                      <Text style={styles.profileMissionValue}>
                        {Math.min(mission.value, mission.target)}/
                        {mission.target}
                      </Text>
                    </View>
                  ))}
                  <Text style={styles.profileDetailFootnote}>
                    Complete todas as missões para receber o bônus diário de XP.
                  </Text>
                </View>
              )}

              {profilePanel === "certificates" && (
                <ScrollView
                  style={styles.profileCertificateScroll}
                  showsVerticalScrollIndicator={false}
                >
                  {courseCertificates.map((course) => (
                    <View
                      key={course.id}
                      style={[
                        styles.profileCertificateItem,
                        course.unlocked && styles.profileCertificateItemDone,
                      ]}
                    >
                      <View
                        style={[
                          styles.profileCertificateIcon,
                          { backgroundColor: course.color },
                        ]}
                      >
                        <CourseSymbol course={course} />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.profileCertificateTitle}>
                          {course.title}
                        </Text>
                        <Text style={styles.profileCertificateText}>
                          {course.unlocked
                            ? "Certificado conquistado"
                            : `${course.completed}/${course.total} aulas concluídas`}
                        </Text>
                      </View>
                      <Text
                        style={[
                          styles.profileCertificatePercent,
                          course.unlocked &&
                            styles.profileCertificatePercentDone,
                        ]}
                      >
                        {course.unlocked ? "✓" : `${course.percent}%`}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              )}
            </Pressable>
          </Pressable>
        </Modal>

        <Modal
          visible={mentorVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setMentorVisible(false)}
        >
          <View style={styles.mentorModalBackdrop}>
            <Pressable
              accessibilityLabel="Fechar assistente de estudo"
              onPress={() => setMentorVisible(false)}
              style={StyleSheet.absoluteFill}
            />
            <View style={styles.mentorModalSheet}>
              <View style={styles.mentorModalHandle} />
              <LinearGradient
                colors={[colors.primary, colors.primaryLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.mentorModalHero}
              >
                <View style={styles.mentorModalHeader}>
                  <View>
                    <View style={styles.mentorAiStatus}>
                      <View style={styles.mentorAiStatusDot} />
                      <Text style={styles.mentorAiStatusText}>
                        STUDYCODE AI
                      </Text>
                    </View>
                    <Text style={styles.mentorModalEyebrow}>
                      ASSISTENTE DE ESTUDO
                    </Text>
                    <Text style={styles.mentorModalTitle}>
                      Como posso te ajudar?
                    </Text>
                  </View>
                  <Pressable
                    accessibilityLabel="Fechar assistente de estudo"
                    accessibilityRole="button"
                    onPress={() => setMentorVisible(false)}
                    style={[styles.avatarMenuClose, styles.mentorModalClose]}
                  >
                    <Text style={styles.avatarMenuCloseText}>×</Text>
                  </Pressable>
                </View>
                <Text style={styles.mentorModalSubtitle}>
                  Tire dúvidas, revise conteúdos e descubra seu próximo passo.
                </Text>
              </LinearGradient>
              <StudyHint
                mood={mentorTopic === "progress" ? "success" : "study"}
                message={mentorMessages[mentorTopic]}
              />
              <Text style={styles.mentorTopicLabel}>ESCOLHA UM ATALHO</Text>
              <View style={styles.mentorTopicRow}>
                {[
                  ["next", "Próximo passo"],
                  ["progress", "Meu progresso"],
                  ["focus", "Manter foco"],
                ].map(([topic, label]) => (
                  <Pressable
                    key={topic}
                    onPress={() => selectMentorTopic(topic)}
                    style={({ pressed }) => [
                      styles.mentorTopicButton,
                      mentorTopic === topic && styles.mentorTopicButtonActive,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.mentorTopicButtonIcon}>
                      {topic === "next"
                        ? "→"
                        : topic === "progress"
                          ? "↗"
                          : "◎"}
                    </Text>
                    <Text
                      style={[
                        styles.mentorTopicButtonText,
                        mentorTopic === topic &&
                          styles.mentorTopicButtonTextActive,
                      ]}
                    >
                      {label}
                    </Text>
                  </Pressable>
                ))}
              </View>
              <ScrollView
                style={styles.mentorChatLog}
                contentContainerStyle={styles.mentorChatLogContent}
                showsVerticalScrollIndicator
                persistentScrollbar
                nestedScrollEnabled
                scrollEnabled
                keyboardShouldPersistTaps="handled"
              >
                {mentorChat.length === 0 && (
                  <Text style={styles.mentorChatEmpty}>
                    Escreva uma dúvida sobre JavaScript, React, Next.js, Node.js
                    ou TypeScript.
                  </Text>
                )}
                {mentorChat.slice(-6).map((item) => (
                  <View
                    key={item.id}
                    style={[
                      styles.mentorChatBubble,
                      item.role === "user" && styles.mentorChatBubbleUser,
                    ]}
                  >
                    <Text style={styles.mentorChatRole}>
                      {item.role === "user" ? "VOCÊ" : "STUDYCODE"}
                    </Text>
                    <Text style={styles.mentorChatText}>{item.text}</Text>
                  </View>
                ))}
                {mentorSending && (
                  <Text style={styles.mentorChatTyping}>
                    StudyCode está pensando...
                  </Text>
                )}
              </ScrollView>
              <View style={styles.mentorInputRow}>
                <TextInput
                  value={mentorInput}
                  onChangeText={setMentorInput}
                  placeholder="Digite sua dúvida..."
                  placeholderTextColor={colors.textMuted}
                  style={styles.mentorInput}
                  returnKeyType="send"
                  onSubmitEditing={sendMentorQuestion}
                  editable={!mentorSending}
                />
                <Pressable
                  onPress={sendMentorQuestion}
                  disabled={!mentorInput.trim() || mentorSending}
                  style={({ pressed }) => [
                    styles.mentorSendButton,
                    (!mentorInput.trim() || mentorSending) &&
                      styles.mentorSendButtonDisabled,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text style={styles.mentorSendButtonText}>↑</Text>
                </Pressable>
              </View>
              <Text style={styles.mentorDisclaimer}>
                Dicas locais e personalizadas com seus dados de estudo. A IA
                online entra em uma próxima etapa com segurança.
              </Text>
            </View>
          </View>
        </Modal>

        <View style={styles.statsBand}>
          <View style={styles.statsRow}>
            <StatCard
              icon="⚡"
              value={`${progress.xp}`}
              label="XP total"
              color={palette.yellow}
            />
            <StatCard
              icon="🔥"
              value={`${progress.streak}`}
              label="dias seguidos"
              color={colors.flame}
            />
            <StatCard
              icon="◆"
              value={`${progress.completedLessons.length}`}
              label="aulas feitas"
              color={palette.green}
            />
          </View>
        </View>
      </View>

      <DailyMissionCard
        missions={dailyMissions}
        onPress={onOpenDashboard}
        compact
        rewardClaimed={dailyRewardClaimed}
      />

      <Pressable
        onPress={onOpenProjects}
        style={({ pressed }) => [
          styles.projectsLauncher,
          pressed && styles.pressed,
        ]}
      >
        <LinearGradient
          colors={gradients.primaryButton}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.projectsLauncherCopy}>
          <Text style={styles.projectsLauncherEyebrow}>APLIQUE NA PRÁTICA</Text>
          <Text style={styles.projectsLauncherTitle}>Projetos práticos</Text>
          <Text style={styles.projectsLauncherText}>
            Transforme suas aulas em projetos reais.
          </Text>
        </View>
        <Text style={styles.projectsLauncherArrow}>›</Text>
      </Pressable>

      <Pressable
        onPress={() => setMentorVisible(true)}
        style={({ pressed }) => [
          styles.mentorLauncher,
          pressed && styles.pressed,
        ]}
      >
        <LinearGradient
          colors={[
            colors.white,
            colors.white,
            colorWithAlpha(colors.logoYellow, 0.5),
          ]}
          locations={[0, 0.3, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.mentorLauncherIcon}>
          <Text style={styles.mentorLauncherIconText}>?</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.mentorLauncherEyebrow}>DICA DE ESTUDO</Text>
          <Text style={styles.mentorLauncherText}>
            Tem uma dica rápida para sua jornada.
          </Text>
        </View>
        <Text style={styles.mentorLauncherArrow}>›</Text>
      </Pressable>

      <Pressable
        onPress={onOpenReview}
        style={({ pressed }) => [
          styles.reviewLauncher,
          pressed && styles.pressed,
        ]}
      >
        <View style={styles.reviewLauncherIcon}>
          <Text style={styles.reviewLauncherIconText}>↻</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.reviewLauncherEyebrow}>REVISÃO INTELIGENTE</Text>
          <Text style={styles.reviewLauncherTitle}>
            {getReviewCount(progress)
              ? `${getReviewCount(progress)} ponto(s) esperando por você`
              : "Reforce o que você aprendeu"}
          </Text>
          <Text style={styles.reviewLauncherText}>
            Refazer desafios ajuda o conteúdo a ficar na memória.
          </Text>
        </View>
        <Text style={styles.reviewLauncherArrow}>›</Text>
      </Pressable>

      <Pressable
        onPress={onOpenDictionary}
        style={({ pressed }) => [
          styles.dictionaryLauncher,
          pressed && styles.pressed,
        ]}
      >
        <LinearGradient
          colors={[colors.primary, colors.primaryLight]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View style={styles.dictionaryLauncherIcon}>
          <Text style={styles.dictionaryLauncherIconText}>{"{ }"}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.dictionaryLauncherEyebrow}>CONSULTA RÁPIDA</Text>
          <Text style={styles.dictionaryLauncherTitle}>
            Dicionário do Programador
          </Text>
          <Text style={styles.dictionaryLauncherText}>
            Símbolos e conceitos explicados sem assumir o óbvio.
          </Text>
        </View>
        <Text style={styles.dictionaryLauncherArrow}>›</Text>
      </Pressable>

      <View style={styles.sectionHeading}>
        <View>
          <Text style={styles.sectionEyebrow}>CONTINUE APRENDENDO</Text>
          <Text style={styles.sectionTitle}>Sua trilha</Text>
        </View>
        <Pressable onPress={onOpenDashboard}>
          <Text style={styles.smallLink}>Ver evolução</Text>
        </Pressable>
      </View>

      <Pressable
        onPress={() => onOpenCourse(featuredCourse.id)}
        style={({ pressed }) => [styles.featureCard, pressed && styles.pressed]}
      >
        <LinearGradient
          colors={[
            colors.white,
            colors.white,
            colorWithAlpha(featuredCourse.color, 0.9),
          ]}
          locations={[0, 0.12, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <View
          style={[
            styles.courseBadgeLarge,
            { backgroundColor: featuredCourse.color },
          ]}
        >
          <CourseSymbol course={featuredCourse} large />
        </View>
        <View style={styles.featureContent}>
          <View style={styles.pill}>
            <Text style={styles.pillText}>
              {completedCount ? "PRÓXIMA AULA" : "COMECE AQUI"}
            </Text>
          </View>
          <Text style={styles.featureTitle}>{featuredCourse.title}</Text>
          <Text style={styles.featureSubtitle}>{nextLesson.title}</Text>
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressFill,
                { width: `${Math.max(progressPercent, 3)}%` },
              ]}
            />
          </View>
          <View style={styles.progressLabels}>
            <Text style={styles.progressText}>
              {completedCount
                ? `${completedCount} aulas concluídas`
                : "Pronto para começar"}
            </Text>
            <Text style={styles.progressTextStrong}>{progressPercent}%</Text>
          </View>
        </View>
        <View style={styles.roundArrow}>
          <Text style={styles.roundArrowText}>›</Text>
        </View>
      </Pressable>

      <View style={styles.sectionHeadingCompact}>
        <Text style={styles.sectionTitle}>Próximas tecnologias</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.courseCarousel}
      >
        {courses
          .filter((course) => course.id !== featuredCourse.id)
          .map((course) => (
            <Pressable
              key={course.id}
              disabled={course.status !== "available"}
              onPress={() => onOpenCourse(course.id)}
              style={({ pressed }) => [
                styles.courseMiniCard,
                course.status === "available" && pressed && styles.pressed,
              ]}
            >
              <LinearGradient
                colors={gradients.card}
                style={StyleSheet.absoluteFill}
              />
              <View
                style={[styles.courseBadge, { backgroundColor: course.color }]}
              >
                <CourseSymbol course={course} />
              </View>
              <Text style={styles.courseMiniTitle}>{course.title}</Text>
              <Text style={styles.comingText}>
                {course.status === "available" ? "COMEÇAR" : "EM BREVE"}
              </Text>
            </Pressable>
          ))}
      </ScrollView>

      <View style={styles.dailyCard}>
        <LinearGradient
          colors={gradients.achievement}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
        <Text style={styles.dailyIcon}>🎯</Text>
        <View style={{ flex: 1 }}>
          <Text style={styles.dailyTitle}>Meta diária</Text>
          <Text style={styles.dailyText}>
            Complete uma aula para manter sua sequência.
          </Text>
        </View>
      </View>
    </Animated.ScrollView>
  );
}

function StatCard({ icon, value, label, color, sunAccent = false }) {
  return (
    <View style={styles.statCard}>
      <LinearGradient
        colors={[colors.white, colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      {sunAccent && (
        <LinearGradient
          colors={gradients.sunCorner}
          locations={[0, 0.42, 1]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.sunCornerGlowCompact}
        />
      )}
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function CourseScreen({
  course,
  modules,
  lessons,
  progress,
  onBack,
  onStartLesson,
}) {
  const lessonPrefix =
    course.id === "html"
      ? "html-"
      : course.id === "css"
        ? "css-"
        : course.id === "react"
          ? "react-"
          : course.id === "nextjs"
            ? "next-"
            : course.id === "nodejs"
              ? "node-"
              : course.id === "typescript"
                ? "typescript-"
                : "js-";
  const completedCount = progress.completedLessons.filter((id) =>
    id.startsWith(lessonPrefix),
  ).length;
  const totalLessons = lessons.length;
  const progressPercent = Math.max(
    2,
    Math.round((completedCount / totalLessons) * 100),
  );
  const isModuleUnlocked = (module) => {
    if (module.locked) return false;
    if (!module.requiresModule) return true;

    const prerequisite = modules.find(
      (item) => item.id === module.requiresModule,
    );
    return prerequisite?.lessons.every((lesson) =>
      progress.completedLessons.includes(lesson.id),
    );
  };

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title={`Trilha ${course.title}`}
        onBack={onBack}
        right={
          <View style={styles.xpChip}>
            <Text style={styles.xpChipText}>⚡ {progress.xp} XP</Text>
          </View>
        }
      />
      <ScrollView
        contentContainerStyle={styles.courseScreenContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.courseHero}>
          <View
            style={[styles.courseHeroBadge, { backgroundColor: course.color }]}
          >
            <CourseSymbol course={course} large />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.courseHeroTitle}>{course.title}</Text>
            <Text style={styles.courseHeroSubtitle}>{course.description}</Text>
          </View>
        </View>

        <View style={styles.pathSummary}>
          <Text style={styles.pathSummaryText}>SEU PROGRESSO</Text>
          <Text style={styles.pathSummaryValue}>
            {completedCount} de {totalLessons} aulas
          </Text>
          <View style={styles.pathTrack}>
            <View style={[styles.pathFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        <View style={styles.rewardInfoCard}>
          <View style={styles.rewardInfoHeader}>
            <Text style={styles.rewardInfoIcon}>🎯</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.rewardInfoTitle}>
                Desafio com risco e recompensa
              </Text>
              <Text style={styles.rewardInfoText}>
                Leia com atenção: cada resposta altera o XP da primeira
                tentativa.
              </Text>
            </View>
          </View>
          <View style={styles.rewardRulesRow}>
            <Text style={styles.rewardPositive}>
              ✓ +{scoringRules.correct} acerto
            </Text>
            <Text style={styles.rewardNegative}>
              × {scoringRules.wrong} erro
            </Text>
            <Text style={styles.rewardBonus}>
              ★ +{scoringRules.perfect} perfeito
            </Text>
          </View>
        </View>

        {modules.map((module, moduleIndex) => {
          const moduleUnlocked = isModuleUnlocked(module);
          const prerequisiteTitle = module.requiresModule
            ? modules.find((item) => item.id === module.requiresModule)?.title
            : null;
          return (
            <View key={module.id} style={styles.moduleBlock}>
              <View style={styles.moduleHeadingRow}>
                <View
                  style={[
                    styles.moduleHeadingAccent,
                    {
                      backgroundColor: moduleUnlocked
                        ? module.color
                        : colors.locked,
                    },
                  ]}
                />
                <View
                  style={[
                    styles.moduleNumber,
                    {
                      backgroundColor: moduleUnlocked
                        ? module.color
                        : palette.line,
                    },
                  ]}
                >
                  <Text style={styles.moduleNumberText}>
                    {moduleUnlocked ? module.number : "🔒"}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    style={[
                      styles.moduleStatusLabel,
                      !moduleUnlocked && styles.textMuted,
                    ]}
                  >
                    {moduleUnlocked ? "MÓDULO DISPONÍVEL" : "MÓDULO BLOQUEADO"}
                  </Text>
                  <Text
                    style={[
                      styles.moduleTitle,
                      !moduleUnlocked && styles.textMuted,
                    ]}
                  >
                    {module.title}
                  </Text>
                  <Text style={styles.moduleDescription}>
                    {module.description}
                  </Text>
                  {!moduleUnlocked && (
                    <Text style={styles.moduleLockHint}>
                      {prerequisiteTitle
                        ? `Conclua “${prerequisiteTitle}” para liberar`
                        : "Novo conteúdo em breve"}
                    </Text>
                  )}
                </View>
              </View>

              {moduleUnlocked &&
                module.lessons.map((lesson, index) => {
                  const isCompleted = progress.completedLessons.includes(
                    lesson.id,
                  );
                  const lessonResult = progress.lessonResults?.[lesson.id];
                  const completionColor =
                    lessonResult?.place === 1
                      ? colors.logoGold
                      : lessonResult?.place === 2
                        ? colors.medalSilver
                        : lessonResult?.place === 3
                          ? colors.medalBronze
                          : colors.medalSilver;
                  const completionTextColor =
                    lessonResult?.place === 3 ? colors.white : colors.text;
                  const previousLesson = module.lessons[index - 1];
                  const canOpen =
                    index === 0 ||
                    progress.completedLessons.includes(previousLesson.id);
                  return (
                    <View key={lesson.id} style={styles.lessonRowWrap}>
                      {index < module.lessons.length - 1 && (
                        <View style={styles.lessonConnector} />
                      )}
                      <Pressable
                        disabled={!canOpen}
                        onPress={() => onStartLesson(lesson)}
                        style={({ pressed }) => [
                          styles.lessonRow,
                          isCompleted && styles.lessonRowCompleted,
                          isCompleted && { borderColor: completionColor },
                          !canOpen && styles.lessonRowLocked,
                          canOpen && pressed && styles.pressed,
                        ]}
                      >
                        {canOpen && !isCompleted && (
                          <View style={styles.lessonRowActiveRail} />
                        )}
                        <View
                          style={[
                            styles.lessonStatus,
                            isCompleted && styles.lessonStatusComplete,
                            isCompleted && {
                              backgroundColor: completionColor,
                            },
                            canOpen &&
                              !isCompleted &&
                              styles.lessonStatusActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.lessonStatusText,
                              isCompleted && { color: completionTextColor },
                            ]}
                          >
                            {isCompleted
                              ? lessonResult?.place
                                ? `${lessonResult.place}º`
                                : "✓"
                              : canOpen
                                ? "▶"
                                : "🔒"}
                          </Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={styles.lessonSequence}>
                            MISSÃO {String(index + 1).padStart(2, "0")}
                          </Text>
                          <Text
                            style={[
                              styles.lessonTitle,
                              !canOpen && styles.textMuted,
                            ]}
                          >
                            {lesson.title}
                          </Text>
                          <View style={styles.lessonMetaRow}>
                            <Text style={styles.lessonMeta}>
                              {lesson.duration}
                            </Text>
                            <Text style={styles.lessonReward}>
                              +{getMaximumLessonXp(lesson)} XP
                            </Text>
                          </View>
                        </View>
                        {canOpen && <Text style={styles.lessonArrow}>›</Text>}
                      </Pressable>
                    </View>
                  );
                })}
              {moduleIndex < modules.length - 1 && (
                <View style={styles.moduleDivider} />
              )}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}

function ProjectsScreen({ progress, onBack, onOpenProject }) {
  const completedProjectIds = progress.completedProjectIds ?? [];

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Projetos práticos"
        onBack={onBack}
        right={
          <Text style={styles.lessonCounter}>{completedProjectIds.length}</Text>
        }
      />
      <ScrollView
        contentContainerStyle={styles.projectsScreenContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={gradients.brand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.projectsHero}
        >
          <View style={styles.projectsHeroCopy}>
            <Text style={styles.projectsHeroEyebrow}>
              LABORATÓRIO STUDYCODE
            </Text>
            <Text style={styles.projectsHeroTitle}>
              Conhecimento vira projeto aqui.
            </Text>
            <Text style={styles.projectsHeroText}>
              Conclua uma trilha e entregue um desafio real para ganhar XP
              extra.
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.projectsIntroCard}>
          <Text style={styles.projectsIntroIcon}>✦</Text>
          <Text style={styles.projectsIntroText}>
            Cada projeto tem briefing, passos, checklist e uma dica de estudo. A
            recompensa só é liberada uma vez.
          </Text>
        </View>

        <View style={styles.projectsList}>
          {practiceProjects.map((project) => {
            const course = courses.find((item) => item.id === project.courseId);
            const lessons = getCourseLessons(project.courseId);
            const completedLessons = progress.completedLessons.filter(
              (lessonId) =>
                lessonId.startsWith(getCoursePrefix(project.courseId)),
            ).length;
            const unlocked =
              course?.status === "available" &&
              lessons.length > 0 &&
              completedLessons >= lessons.length;
            const complete = completedProjectIds.includes(project.id);

            return (
              <Pressable
                key={project.id}
                disabled={!unlocked}
                onPress={() => onOpenProject(project.id)}
                style={({ pressed }) => [
                  styles.projectCard,
                  !unlocked && styles.projectCardLocked,
                  pressed && unlocked && styles.pressed,
                ]}
              >
                <View
                  style={[
                    styles.projectCourseBadge,
                    {
                      backgroundColor: unlocked ? course.color : colors.locked,
                    },
                  ]}
                >
                  {course && <CourseSymbol course={course} />}
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.projectCardTopRow}>
                    <Text style={styles.projectCourseName}>
                      {course?.title ?? "Trilha"}
                    </Text>
                    <Text
                      style={[
                        styles.projectStatus,
                        complete && styles.projectStatusComplete,
                      ]}
                    >
                      {complete
                        ? "CONCLUÍDO"
                        : unlocked
                          ? project.level.toUpperCase()
                          : "BLOQUEADO"}
                    </Text>
                  </View>
                  <Text style={styles.projectCardTitle}>{project.title}</Text>
                  <Text style={styles.projectCardText}>{project.subtitle}</Text>
                  <View style={styles.projectCardMeta}>
                    <Text style={styles.projectCardMetaText}>
                      {project.duration}
                    </Text>
                    <Text style={styles.projectCardReward}>
                      +{project.rewardXp} XP
                    </Text>
                  </View>
                  {!unlocked && (
                    <Text style={styles.projectLockHint}>
                      Conclua as {lessons.length} aulas de {course?.title} para
                      liberar.
                    </Text>
                  )}
                </View>
                {unlocked && <Text style={styles.projectCardArrow}>›</Text>}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
}

function ProjectDetailScreen({
  project,
  progress,
  onBack,
  onToggleChecklist,
  onCompleteProject,
}) {
  const completedItems = progress.projectChecklist?.[project.id] ?? [];
  const checklistComplete = project.checklist.every((_, index) =>
    completedItems.includes(index),
  );
  const projectComplete = progress.completedProjectIds?.includes(project.id);
  const course = courses.find((item) => item.id === project.courseId);

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Projeto final"
        onBack={onBack}
        right={<Text style={styles.lessonCounter}>{project.rewardXp} XP</Text>}
      />
      <ScrollView
        contentContainerStyle={styles.projectDetailContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.projectDetailHero}>
          <View
            style={[
              styles.projectDetailCourseBadge,
              { backgroundColor: course?.color ?? colors.primary },
            ]}
          >
            {course && <CourseSymbol course={course} large />}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.projectDetailCourse}>
              {course?.title?.toUpperCase()}
            </Text>
            <Text style={styles.projectDetailTitle}>{project.title}</Text>
            <Text style={styles.projectDetailSubtitle}>{project.subtitle}</Text>
          </View>
        </View>

        <View style={styles.projectBriefingCard}>
          <Text style={styles.projectBriefingEyebrow}>SEU BRIEFING</Text>
          <Text style={styles.projectBriefingText}>{project.objective}</Text>
          <View style={styles.projectBriefingFooter}>
            <Text style={styles.projectBriefingMeta}>⏱ {project.duration}</Text>
            <Text style={styles.projectBriefingReward}>
              RECOMPENSA +{project.rewardXp} XP
            </Text>
          </View>
        </View>

        <Text style={styles.projectSectionTitle}>Roteiro de construção</Text>
        <View style={styles.projectStepsCard}>
          {project.steps.map((step, index) => (
            <View key={step} style={styles.projectStepItem}>
              <View style={styles.projectStepNumber}>
                <Text style={styles.projectStepNumberText}>{index + 1}</Text>
              </View>
              <Text style={styles.projectStepText}>{step}</Text>
            </View>
          ))}
        </View>

        <View style={styles.projectTipCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.projectTipEyebrow}>DICA DE ESTUDO</Text>
            <Text style={styles.projectTipText}>{project.tip}</Text>
          </View>
        </View>

        <View style={styles.projectChecklistHeading}>
          <View>
            <Text style={styles.projectSectionTitle}>Checklist de entrega</Text>
            <Text style={styles.projectChecklistSubtext}>
              {completedItems.length}/{project.checklist.length} itens marcados
            </Text>
          </View>
          <Text style={styles.projectChecklistProgress}>
            {Math.round(
              (completedItems.length / project.checklist.length) * 100,
            )}
            %
          </Text>
        </View>
        <View style={styles.projectChecklistCard}>
          {project.checklist.map((item, index) => {
            const checked = completedItems.includes(index);
            return (
              <Pressable
                key={item}
                disabled={projectComplete}
                onPress={() => onToggleChecklist(project.id, index)}
                style={({ pressed }) => [
                  styles.projectChecklistItem,
                  checked && styles.projectChecklistItemChecked,
                  pressed && !projectComplete && styles.pressed,
                ]}
              >
                <View
                  style={[
                    styles.projectCheckbox,
                    checked && styles.projectCheckboxChecked,
                  ]}
                >
                  <Text style={styles.projectCheckboxText}>
                    {checked ? "✓" : ""}
                  </Text>
                </View>
                <Text
                  style={[
                    styles.projectChecklistText,
                    checked && styles.projectChecklistTextChecked,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          disabled={!checklistComplete || projectComplete}
          onPress={() => onCompleteProject(project)}
          style={({ pressed }) => [
            styles.projectCompleteButton,
            (!checklistComplete || projectComplete) &&
              styles.projectCompleteButtonDisabled,
            pressed && !projectComplete && styles.pressed,
          ]}
        >
          <LinearGradient
            colors={
              projectComplete
                ? [colors.success, colors.success]
                : gradients.achievement
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.projectCompleteButtonText}>
            {projectComplete
              ? "Projeto concluído"
              : checklistComplete
                ? `Entregar projeto · +${project.rewardXp} XP`
                : "Complete o checklist para entregar"}
          </Text>
          <Text style={styles.projectCompleteButtonIcon}>
            {projectComplete ? "✓" : "→"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

function getCourseLessons(courseId) {
  const lessonMap = {
    html: allHtmlLessons,
    css: allCssLessons,
    javascript: allJavascriptLessons,
    react: allReactLessons,
    nextjs: allNextLessons,
    nodejs: allNodeLessons,
    typescript: allTypescriptLessons,
  };
  return lessonMap[courseId] ?? [];
}

function getCoursePrefix(courseId) {
  return courseId === "html"
    ? "html-"
    : courseId === "css"
      ? "css-"
      : courseId === "react"
        ? "react-"
        : courseId === "nextjs"
          ? "next-"
          : courseId === "nodejs"
            ? "node-"
            : courseId === "typescript"
              ? "typescript-"
              : "js-";
}

function getRecommendedCourse(profile, progress) {
  const path = getLearningPath(profile.learningPathId);
  const preferredCourse = courses.find(
    (course) =>
      course.id === profile.preferredCourseId && course.status === "available",
  );
  if (preferredCourse) return preferredCourse;

  const nextCourse = path.courseIds
    .map((courseId) => courses.find((course) => course.id === courseId))
    .find((course) => {
      if (!course || course.status !== "available") return false;
      const lessons = getCourseLessons(course.id);
      const completed = progress.completedLessons.filter((id) =>
        id.startsWith(getCoursePrefix(course.id)),
      ).length;
      return completed < lessons.length;
    });

  return nextCourse ?? courses.find((course) => course.id === "javascript");
}

function DictionaryScreen({ onBack, onOpenEntry }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");
  const entries = programmerDictionary.filter((entry) => {
    if (!normalizedQuery) return true;
    return `${entry.term} ${entry.category} ${entry.definition}`
      .toLocaleLowerCase("pt-BR")
      .includes(normalizedQuery);
  });

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Dicionário do Programador"
        onBack={onBack}
        right={<Text style={styles.lessonCounter}>A–Z</Text>}
      />
      <ScrollView
        contentContainerStyle={styles.dictionaryContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <LinearGradient
          colors={gradients.brand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dictionaryHero}
        >
          <Text style={styles.dictionaryHeroEyebrow}>NADA É ÓBVIO</Text>
          <Text style={styles.dictionaryHeroTitle}>
            Entenda cada palavra e cada símbolo.
          </Text>
          <Text style={styles.dictionaryHeroText}>
            Consulte uma definição, veja a sintaxe e descubra quando usar sem
            precisar sair do StudyCode.
          </Text>
        </LinearGradient>

        <View style={styles.dictionarySearchShell}>
          <Text style={styles.dictionarySearchIcon}>⌕</Text>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Buscar termo, símbolo ou conceito"
            placeholderTextColor={colors.textMuted}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.dictionarySearchInput}
          />
        </View>

        <View style={styles.dictionaryResultRow}>
          <Text style={styles.dictionaryResultTitle}>TERMOS EM ORDEM ALFABÉTICA</Text>
          <Text style={styles.dictionaryResultCount}>{entries.length}</Text>
        </View>

        <View style={styles.dictionaryList}>
          {entries.map((entry) => (
            <Pressable
              key={entry.id}
              onPress={() => onOpenEntry(entry.id)}
              style={({ pressed }) => [
                styles.dictionaryCard,
                pressed && styles.pressed,
              ]}
            >
              <View style={styles.dictionaryTermBadge}>
                <Text style={styles.dictionaryTermBadgeText}>{entry.term}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.dictionaryCardCategory}>{entry.category}</Text>
                <Text style={styles.dictionaryCardDefinition} numberOfLines={2}>
                  {entry.definition}
                </Text>
              </View>
              <Text style={styles.dictionaryCardArrow}>›</Text>
            </Pressable>
          ))}
        </View>

        {!entries.length && (
          <View style={styles.dictionaryEmpty}>
            <Text style={styles.dictionaryEmptyTitle}>Termo ainda não encontrado</Text>
            <Text style={styles.dictionaryEmptyText}>
              A busca continuará crescendo junto com cada nova aula.
            </Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function DictionaryDetailSection({ label, children, accent = false }) {
  return (
    <View style={[styles.dictionaryDetailSection, accent && styles.dictionaryDetailAccent]}>
      <Text style={styles.dictionaryDetailLabel}>{label}</Text>
      <Text style={styles.dictionaryDetailText}>{children}</Text>
    </View>
  );
}

function DictionaryEntryScreen({ entry, onBack }) {
  return (
    <View style={styles.screen}>
      <ScreenHeader
        title={entry.term}
        onBack={onBack}
        right={<Text style={styles.lessonCounter}>{entry.category}</Text>}
      />
      <ScrollView
        contentContainerStyle={styles.dictionaryDetailContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={gradients.brand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dictionaryDetailHero}
        >
          <Text style={styles.dictionaryDetailHeroTerm}>{entry.term}</Text>
          <Text style={styles.dictionaryDetailHeroDefinition}>{entry.definition}</Text>
        </LinearGradient>

        <DictionaryDetailSection label="PARA QUE SERVE" accent>
          {entry.purpose}
        </DictionaryDetailSection>
        <DictionaryDetailSection label="QUANDO USAR">{entry.use}</DictionaryDetailSection>
        <DictionaryDetailSection label="QUANDO NÃO USAR">{entry.avoid}</DictionaryDetailSection>

        <View style={styles.dictionaryCodeSection}>
          <Text style={styles.dictionaryCodeLabel}>SINTAXE</Text>
          <Text style={styles.dictionaryCodeText}>{entry.syntax}</Text>
        </View>
        <View style={styles.dictionaryCodeSection}>
          <Text style={styles.dictionaryCodeLabel}>EXEMPLO</Text>
          <Text style={styles.dictionaryCodeText}>{entry.example}</Text>
        </View>

        <DictionaryDetailSection label="ERROS COMUNS">{entry.errors}</DictionaryDetailSection>
        <DictionaryDetailSection label="CURIOSIDADE" accent>
          {entry.curiosity}
        </DictionaryDetailSection>

        {!!entry.related.length && (
          <View style={styles.dictionaryRelatedSection}>
            <Text style={styles.dictionaryDetailLabel}>CONTEÚDOS RELACIONADOS</Text>
            <View style={styles.dictionaryRelatedRow}>
              {entry.related.map((item) => (
                <View key={item} style={styles.dictionaryRelatedChip}>
                  <Text style={styles.dictionaryRelatedChipText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

function CodeCoinScreen({ authSession, onAuthRefresh, onBack }) {
  const [balance, setBalance] = useState(0);
  const [packs, setPacks] = useState([]);
  const [selectedPackId, setSelectedPackId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [purchaseLoading, setPurchaseLoading] = useState(false);

  async function withFreshToken(action) {
    try {
      return await action(authSession?.accessToken);
    } catch (requestError) {
      if (requestError.status !== 401 || !onAuthRefresh) throw requestError;
      const refreshedToken = await onAuthRefresh();
      if (!refreshedToken) throw requestError;
      return action(refreshedToken);
    }
  }

  async function loadCodeCoin() {
    setLoading(true);
    setError("");
    try {
      // O catálogo é público e não deve desaparecer apenas porque a sessão
      // da carteira expirou. Assim o aluno ainda consegue ver os pacotes.
      const catalog = await getStudyCodeCodeCoinCatalog();
      const nextPacks = catalog.packs || [];
      setPacks(nextPacks);
      setSelectedPackId((current) => current || nextPacks[0]?.id || nextPacks[0]?.slug || null);

      try {
        const wallet = await withFreshToken((token) => getStudyCodeCodeCoinBalance(token));
        setBalance(Number(wallet.balance) || 0);
      } catch (walletError) {
        setError(walletError.message || "Faça login novamente para carregar seu saldo CodeCoin.");
      }
    } catch (requestError) {
      setError(requestError.message || "Não foi possível carregar sua carteira CodeCoin.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCodeCoin();
  }, [authSession?.accessToken]);

  const selectedPack = packs.find((pack) => (pack.id || pack.slug) === selectedPackId);

  async function purchaseCodeCoins() {
    if (!selectedPack || purchaseLoading) return;
    setPurchaseLoading(true);
    setError("");
    setNotice("");
    try {
      const checkout = await withFreshToken((token) => createCodeCoinCheckout({
        token,
        packId: selectedPack.id,
        packSlug: selectedPack.slug,
        provider: "stripe",
      }));
      if (!checkout.checkoutUrl) throw new Error("O checkout Stripe não retornou um endereço válido.");
      await Linking.openURL(checkout.checkoutUrl);
      setNotice("Checkout seguro aberto. O saldo será atualizado após a confirmação do Stripe.");
    } catch (requestError) {
      setError(requestError.message || "Não foi possível abrir o checkout de CodeCoins.");
    } finally {
      setPurchaseLoading(false);
    }
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader title="CodeCoin" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.codeCoinContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={[colors.primaryLight, colors.primary, colors.secondary]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.codeCoinHero}>
          <View style={styles.codeCoinHeroCopy}>
            <Text style={styles.codeCoinEyebrow}>MOEDA DO STUDYCODE</Text>
            <Text style={styles.codeCoinHeroTitle}>Aprenda, conquiste e desbloqueie.</Text>
            <Text style={styles.codeCoinHeroText}>Use CodeCoins para acessar recursos extras sem interromper sua jornada de estudos.</Text>
          </View>
          <View style={styles.codeCoinArtOuter}>
            <Image source={CODECOIN_ART} resizeMode="contain" style={styles.codeCoinArtImage} />
          </View>
        </LinearGradient>

        <View style={styles.codeCoinBalanceCard}>
          <View>
            <Text style={styles.codeCoinSectionLabel}>SEU SALDO</Text>
            <Text style={styles.codeCoinBalanceValue}>{balance.toLocaleString("pt-BR")}</Text>
            <Text style={styles.codeCoinBalanceCaption}>CodeCoins disponíveis</Text>
          </View>
          <Pressable onPress={loadCodeCoin} style={({ pressed }) => [styles.codeCoinRefresh, pressed && styles.pressed]}>
            <Text style={styles.codeCoinRefreshText}>Atualizar</Text>
          </Pressable>
        </View>

        <View style={styles.codeCoinInfoCard}>
          <Text style={styles.codeCoinSectionLabel}>PARA QUE SERVE?</Text>
          <Text style={styles.codeCoinInfoTitle}>Mais possibilidades dentro do aprendizado</Text>
          <View style={styles.codeCoinBenefitRow}><Text style={styles.codeCoinBenefitIcon}>?</Text><Text style={styles.codeCoinBenefitText}>Comprar perguntas extras para o tutor de IA quando seu limite acabar.</Text></View>
          <View style={styles.codeCoinBenefitRow}><Text style={styles.codeCoinBenefitIcon}>+</Text><Text style={styles.codeCoinBenefitText}>Desbloquear conteúdos especiais, ferramentas e aulas avulsas.</Text></View>
          <View style={styles.codeCoinBenefitRow}><Text style={styles.codeCoinBenefitIcon}>★</Text><Text style={styles.codeCoinBenefitText}>Participar de recursos e recompensas futuras do StudyCode.</Text></View>
        </View>

        <View>
          <Text style={styles.codeCoinSectionLabel}>COMPRAR CODECOINS</Text>
          <Text style={styles.codeCoinSectionTitle}>Escolha seu pacote</Text>
        </View>

        {loading ? (
          <View style={styles.billingLoading}><ActivityIndicator color={colors.primary} /><Text style={styles.billingMuted}>Carregando sua carteira...</Text></View>
        ) : packs.length === 0 ? (
          <View style={styles.codeCoinEmpty}><Text style={styles.billingMuted}>Nenhum pacote disponível no momento.</Text></View>
        ) : (
          <View style={styles.codeCoinPackGrid}>
            {packs.map((pack) => {
              const packKey = pack.id || pack.slug;
              const selected = packKey === selectedPackId;
              return (
                <Pressable key={packKey} onPress={() => { setSelectedPackId(packKey); setNotice(""); }} style={({ pressed }) => [styles.codeCoinPackCard, selected && styles.codeCoinPackCardSelected, pressed && styles.pressed]}>
                  <View style={styles.codeCoinMiniCoin}><Text style={styles.codeCoinMiniCoinText}>CC</Text></View>
                  <View style={styles.codeCoinPackCopy}>
                    <Text style={styles.codeCoinPackName}>{pack.name}</Text>
                    <Text style={styles.codeCoinPackAmount}>{Number(pack.coin_amount || 0).toLocaleString("pt-BR")} CodeCoins</Text>
                  </View>
                  <Text style={styles.codeCoinPackPrice}>R$ {Number(pack.price || 0).toFixed(2).replace(".", ",")}</Text>
                </Pressable>
              );
            })}
          </View>
        )}

        <Pressable disabled={!selectedPack || loading || purchaseLoading} onPress={purchaseCodeCoins} style={({ pressed }) => [styles.codeCoinBuyButton, (!selectedPack || loading || purchaseLoading) && styles.codeCoinBuyButtonDisabled, pressed && styles.pressed]}>
          <Text style={styles.codeCoinBuyButtonText}>{purchaseLoading ? "Abrindo checkout..." : "Comprar CodeCoins"}</Text>
          <Text style={styles.codeCoinBuyButtonArrow}>→</Text>
        </Pressable>
        {!!notice && <View style={styles.billingNotice}><Text style={styles.billingNoticeText}>{notice}</Text></View>}
        {!!error && <View style={styles.billingError}><Text style={styles.billingErrorText}>{error}</Text></View>}

        <View style={styles.codeCoinHelpCard}>
          <Text style={styles.codeCoinSectionLabel}>DÚVIDAS E AJUDA</Text>
          <Text style={styles.codeCoinHelpQuestion}>CodeCoin expira?</Text>
          <Text style={styles.codeCoinHelpAnswer}>Não. Seu saldo permanece vinculado à sua conta até ser utilizado.</Text>
          <View style={styles.codeCoinHelpDivider} />
          <Text style={styles.codeCoinHelpQuestion}>CodeCoin substitui o Premium?</Text>
          <Text style={styles.codeCoinHelpAnswer}>Não. O Premium libera o plano completo; CodeCoin serve para recursos extras e compras avulsas.</Text>
          <View style={styles.codeCoinHelpDivider} />
          <Text style={styles.codeCoinHelpQuestion}>Quando recebo as moedas?</Text>
          <Text style={styles.codeCoinHelpAnswer}>Somente depois que o servidor confirmar o pagamento com segurança.</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function BillingScreen({ profile, authSession, onAuthRefresh, onSessionExpired, onBack }) {
  const [subscription, setSubscription] = useState({ planId: "free", status: "cancelled" });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [working, setWorking] = useState(false);
  const [error, setError] = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);
  const [checkoutNotice, setCheckoutNotice] = useState("");
  const [plans, setPlans] = useState([]);

  const token = authSession?.accessToken;
  const student = authSession?.student || {
    id: profile?.id,
    name: profile?.displayName,
    email: profile?.email,
  };

  async function withFreshToken(action) {
    try {
      return await action(authSession?.accessToken);
    } catch (requestError) {
      if (requestError.status !== 401 || !onAuthRefresh) throw requestError;
      const refreshedToken = await onAuthRefresh();
      if (!refreshedToken) throw requestError;
      return action(refreshedToken);
    }
  }

  async function loadBilling() {
    // Nunca mostre dados da conta anterior enquanto a consulta atualiza.
    setHistory([]);
    if (!token) {
      setLoading(false);
      setError("Entre na sua conta para consultar a assinatura.");
      return;
    }
    setLoading(true);
    setError("");
    setSessionExpired(false);
    try {
      const [statusResponse, historyResponse] = await withFreshToken((currentToken) => Promise.all([
        getSubscriptionStatus(currentToken),
        getBillingHistory(currentToken),
      ]));
      setSubscription(statusResponse.subscription || { planId: "free", status: "cancelled" });
      setHistory(historyResponse.history || []);
    } catch (requestError) {
      const sessionExpired = requestError.status === 401;
      setSessionExpired(sessionExpired);
      setError(sessionExpired
        ? "Sua sessão expirou. Entre novamente para assinar ou consultar pagamentos."
        : requestError.message || "O serviço de pagamentos ainda não está configurado.");
    } finally {
      setLoading(false);
    }
  }

  async function loadCatalog() {
    try {
      const catalogResponse = await getStudyCodeCatalog();
      setPlans(catalogResponse.plans || []);
    } catch (requestError) {
      setPlans([]);
      setError(requestError.message || "Não foi possível carregar os planos do StudyCode.");
    }
  }

  useEffect(() => {
    loadCatalog();
    loadBilling();
    const listener = Linking.addEventListener("url", ({ url }) => {
      if (url.includes("billing/success")) {
        setCheckoutNotice("Checkout concluído. Estamos aguardando a confirmação segura do servidor.");
        loadBilling();
      }
      if (url.includes("billing/cancelled")) {
        setCheckoutNotice("Checkout cancelado. Nenhuma assinatura foi ativada.");
      }
    });
    return () => listener.remove();
  }, [token]);

  async function subscribe(planSlug = "premium") {
    if (!token || working) return;
    setWorking(true);
    setError("");
    try {
      const checkout = await withFreshToken((currentToken) => createPremiumCheckout({ token: currentToken, student, planSlug }));
      if (!checkout.checkoutUrl) throw new Error("A Stripe não retornou uma página de checkout.");
      await Linking.openURL(checkout.checkoutUrl);
    } catch (requestError) {
      const expired = requestError.status === 401;
      setSessionExpired(expired);
      setError(expired ? "Sua sessão expirou. Entre novamente para continuar." : requestError.message || "Não foi possível iniciar o checkout.");
    } finally {
      setWorking(false);
    }
  }

  async function cancel() {
    if (!token || working) return;
    setWorking(true);
    setError("");
    try {
      await withFreshToken((currentToken) => cancelPremiumSubscription(currentToken));
      await loadBilling();
    } catch (requestError) {
      setError(requestError.message || "Não foi possível cancelar a assinatura.");
    } finally {
      setWorking(false);
    }
  }

  const activePlan = plans.find((plan) => plan.slug === subscription.planId);
  const freePlan = plans.find((plan) => plan.slug === "free");
  const paidPlans = plans.filter((plan) => Number(plan.monthly_price) > 0);
  const isPremium = subscription.status === "active" && subscription.planId !== "free";
  const statusLabels = {
    pending: "Pagamento pendente",
    active: "Assinatura ativa",
    paid: "Pagamento aprovado",
    past_due: "Pagamento em atraso",
    expired: "Assinatura vencida",
    cancelled: "Sem assinatura ativa",
    failed: "Pagamento recusado",
  };
  const statusLabel = subscription.cancelAtPeriodEnd
    ? "Cancelamento agendado"
    : statusLabels[subscription.status] || "Sem assinatura ativa";

  return (
    <View style={styles.screen}>
      <ScreenHeader title="Planos e assinatura" onBack={onBack} />
      <ScrollView contentContainerStyle={styles.billingContent} showsVerticalScrollIndicator={false}>
        <LinearGradient colors={gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.billingHero}>
          <Text style={styles.billingEyebrow}>STUDYCODE PREMIUM</Text>
          <Text style={styles.billingHeroTitle}>Mais prática para evoluir.</Text>
          <Text style={styles.billingHeroText}>A confirmação é feita pelo servidor após o webhook da Stripe.</Text>
        </LinearGradient>

        {loading ? (
          <View style={styles.billingLoading}><ActivityIndicator color={colors.primary} /><Text style={styles.billingMuted}>Consultando sua assinatura...</Text></View>
        ) : (
          <View style={styles.billingStatusCard}>
            <Text style={styles.billingSectionLabel}>STATUS ATUAL</Text>
            <Text style={styles.billingStatusTitle}>{activePlan?.name || (isPremium ? subscription.planId : "Free")}</Text>
            <Text style={styles.billingStatusText}>{statusLabel}</Text>
            {!!subscription.nextBillingAt && <Text style={styles.billingMuted}>{subscription.cancelAtPeriodEnd ? "Acesso Premium até" : "Próxima cobrança"}: {new Date(subscription.nextBillingAt).toLocaleDateString("pt-BR")}</Text>}
          </View>
        )}

        <View style={styles.billingPlanGrid}>
          <View style={styles.billingPlanCard}>
            <Text style={styles.billingPlanKicker}>GRATUITO</Text>
            <Text style={styles.billingPlanTitle}>{freePlan?.name || "Free"}</Text>
            <Text style={styles.billingPlanPrice}>R$ 0,00<Text style={styles.billingPlanPeriod}>/mês</Text></Text>
            <Text style={styles.billingPlanText}>HTML, CSS e JavaScript básico, desafios e revisões essenciais.</Text>
          </View>
          {false && <LinearGradient colors={gradients.primaryButton} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.billingPlanPremium}>
            <Text style={styles.billingPlanKickerLight}>RECOMENDADO</Text>
            <Text style={styles.billingPlanTitleLight}>Premium</Text>
            <Text style={styles.billingPlanPriceLightDynamic}>R$ 0,00<Text style={styles.billingPlanPeriodLight}>/mês</Text></Text>
            <Text style={styles.billingPlanPriceLight}>R$ 29,90<Text style={styles.billingPlanPeriodLight}>/mês</Text></Text>
            <Text style={styles.billingPlanTextLight}>Todas as trilhas, projetos, certificados e mais acesso ao tutor.</Text>
            {!isPremium && <Pressable onPress={subscribe} disabled={working} style={({ pressed }) => [styles.billingButton, pressed && styles.pressed]}><Text style={styles.billingButtonText}>{working ? "Abrindo checkout..." : "Assinar Premium"}</Text></Pressable>}
            {isPremium && <Pressable onPress={cancel} disabled={working} style={({ pressed }) => [styles.billingCancelButton, pressed && styles.pressed]}><Text style={styles.billingCancelButtonText}>{working ? "Cancelando..." : "Cancelar assinatura"}</Text></Pressable>}
          </LinearGradient>}
          {paidPlans.map((plan, index) => {
            const planFeatures = typeof plan.features === "object" && plan.features ? plan.features : {};
            const benefits = Array.isArray(planFeatures.benefits) ? planFeatures.benefits : [];
            const isLifetime = planFeatures.billingType === "lifetime";
            const currentPlan = subscription.planId === plan.slug && subscription.status === "active";
            return <LinearGradient key={plan.id || plan.slug} colors={index === 0 ? gradients.primaryButton : gradients.brand} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.billingPlanPremium}>
              <Text style={styles.billingPlanKickerLight}>{index === 0 ? "RECOMENDADO" : "PLANO STUDYCODE"}</Text>
              <Text style={styles.billingPlanTitleLight}>{plan.name}</Text>
              <Text style={styles.billingPlanPriceLightDynamic}>R$ {Number(plan.monthly_price).toFixed(2).replace(".", ",")}<Text style={styles.billingPlanPeriodLight}>{isLifetime ? " pagamento único" : "/mês"}</Text></Text>
              <Text style={styles.billingPlanTextLight}>{plan.description || benefits.join(" • ") || "Acesso aos recursos disponíveis neste plano."}</Text>
              {!currentPlan && <Pressable onPress={() => subscribe(plan.slug)} disabled={working} style={({ pressed }) => [styles.billingButton, pressed && styles.pressed]}><Text style={styles.billingButtonText}>{working ? "Abrindo checkout..." : `Assinar ${plan.name}`}</Text></Pressable>}
              {currentPlan && !subscription.cancelAtPeriodEnd && <Pressable onPress={cancel} disabled={working} style={({ pressed }) => [styles.billingCancelButton, pressed && styles.pressed]}><Text style={styles.billingCancelButtonText}>{working ? "Agendando..." : "Cancelar no fim do período"}</Text></Pressable>}
              {currentPlan && subscription.cancelAtPeriodEnd && <Text style={styles.billingPlanTextLight}>Renovação desativada. Seu acesso continua até o vencimento.</Text>}
            </LinearGradient>;
          })}
          {paidPlans.length === 0 && <View style={styles.billingPlanCard}><Text style={styles.billingPlanText}>Nenhum plano pago disponível no momento.</Text></View>}
        </View>

        {error ? <View style={styles.billingError}><Text style={styles.billingErrorText}>{error}</Text>{sessionExpired && <Pressable onPress={onSessionExpired} style={({ pressed }) => [styles.billingRefresh, pressed && styles.pressed]}><Text style={styles.billingRefreshText}>Entrar novamente</Text></Pressable>}</View> : null}
        {checkoutNotice ? <View style={styles.billingNotice}><Text style={styles.billingNoticeText}>{checkoutNotice}</Text></View> : null}
        <Pressable onPress={loadBilling} style={({ pressed }) => [styles.billingRefresh, pressed && styles.pressed]}><Text style={styles.billingRefreshText}>Atualizar status</Text></Pressable>

        <View style={styles.billingHistoryCard}>
          <Text style={styles.billingSectionLabel}>HISTÓRICO DE PAGAMENTOS</Text>
          {history.length === 0 ? <Text style={styles.billingMuted}>Nenhum pagamento registrado ainda.</Text> : history.map((item, index) => (
            <View key={`${item.invoiceId || item.checkoutSessionId || item.createdAt}-${index}`} style={styles.billingHistoryRow}>
              <View style={{ flex: 1 }}><Text style={styles.billingHistoryTitle}>{plans.find((plan) => plan.slug === item.planId)?.name || item.planId || "StudyCode"}</Text><Text style={styles.billingMuted}>{item.paidAt || item.createdAt ? new Date(item.paidAt || item.createdAt).toLocaleDateString("pt-BR") : "—"}</Text></View>
              <Text style={styles.billingHistoryAmount}>R$ {(Number(item.amountCents || 0) / 100).toFixed(2).replace(".", ",")}</Text>
              <Text style={styles.billingHistoryStatus}>{statusLabels[item.status] || item.status}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function DashboardScreen({
  progress,
  profile,
  onBack,
  onOpenReview,
  onOpenProjects,
  onOpenCourse,
}) {
  const completedToday = progress.lastStudyDate === dateKey();
  const learningPath = getLearningPath(profile.learningPathId);
  const pathCourses = learningPath.courseIds
    .map((courseId) => courses.find((course) => course.id === courseId))
    .filter(Boolean);
  const activePathCourses = pathCourses.filter(
    (course) => course.status === "available",
  );
  const pathLessonTotal = activePathCourses.reduce(
    (total, course) => total + getCourseLessons(course.id).length,
    0,
  );
  const pathLessonCompleted = activePathCourses.reduce(
    (total, course) =>
      total +
      progress.completedLessons.filter((id) =>
        id.startsWith(getCoursePrefix(course.id)),
      ).length,
    0,
  );
  const pathPercent = Math.round(
    (pathLessonCompleted / Math.max(pathLessonTotal, 1)) * 100,
  );
  const preferredCourse = getRecommendedCourse(profile, progress);
  const lastResult = progress.lastResult;
  const dailyMissions = getDailyMissions(progress);
  const dailyRewardClaimed =
    progress.dailyMissionDate === dateKey() &&
    progress.dailyMissionRewardClaimed;
  const achievements = getAchievements(progress);
  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.unlocked,
  );

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Sua evolução"
        onBack={onBack}
        right={<Text style={styles.lessonCounter}>DASH</Text>}
      />
      <ScrollView
        contentContainerStyle={styles.dashboardContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={gradients.brand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dashboardHero}
        >
          <View style={styles.dashboardHeroCopy}>
            <Text style={styles.dashboardHeroEyebrow}>PAINEL DO ESTUDANTE</Text>
            <Text style={styles.dashboardHeroTitle}>
              {profile.displayName ? `${profile.displayName}, ` : ""}sua
              evolução está em movimento.
            </Text>
            <Text style={styles.dashboardHeroText}>
              Pequenas sessões consistentes constroem projetos grandes.
            </Text>
          </View>
        </LinearGradient>

        <DailyMissionCard
          missions={dailyMissions}
          rewardClaimed={dailyRewardClaimed}
        />

        <View style={styles.dashboardStatGrid}>
          <View style={styles.dashboardStatCard}>
            <Text style={styles.dashboardStatIcon}>⚡</Text>
            <Text style={styles.dashboardStatValue}>{progress.xp}</Text>
            <Text style={styles.dashboardStatLabel}>XP total</Text>
          </View>
          <View style={styles.dashboardStatCard}>
            <Text style={styles.dashboardStatIcon}>🔥</Text>
            <Text style={styles.dashboardStatValue}>{progress.streak}</Text>
            <Text style={styles.dashboardStatLabel}>dias seguidos</Text>
          </View>
          <View style={styles.dashboardStatCard}>
            <Text style={styles.dashboardStatIcon}>✓</Text>
            <Text style={styles.dashboardStatValue}>
              {progress.completedLessons.length}
            </Text>
            <Text style={styles.dashboardStatLabel}>aulas feitas</Text>
          </View>
          <View style={styles.dashboardStatCard}>
            <Text style={styles.dashboardStatIcon}>↻</Text>
            <Text style={styles.dashboardStatValue}>
              {getReviewCount(progress)}
            </Text>
            <Text style={styles.dashboardStatLabel}>para revisar</Text>
          </View>
        </View>

        <View style={styles.dashboardPathCard}>
          <View style={styles.dashboardPathTopRow}>
            <View style={styles.dashboardPathIcon}>
              <Text style={styles.dashboardPathIconText}>
                {learningPath.icon}
              </Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.dashboardPathEyebrow}>
                CAMINHO GUIADO ATUAL
              </Text>
              <Text style={styles.dashboardPathTitle}>
                {learningPath.title}
              </Text>
              <Text style={styles.dashboardPathText}>
                {learningPath.subtitle}
              </Text>
            </View>
            <Text style={styles.dashboardPathPercent}>{pathPercent}%</Text>
          </View>
          <View style={styles.dashboardPathTrack}>
            <View
              style={[
                styles.dashboardPathFill,
                { width: `${Math.max(pathPercent, pathPercent ? 3 : 0)}%` },
              ]}
            />
          </View>
          <View style={styles.dashboardPathSteps}>
            {pathCourses.map((course) => (
              <View
                key={course.id}
                style={[
                  styles.dashboardPathStep,
                  course.status !== "available" &&
                    styles.dashboardPathStepLocked,
                ]}
              >
                <View
                  style={[
                    styles.dashboardPathStepIcon,
                    { backgroundColor: course.color },
                  ]}
                >
                  <CourseSymbol course={course} />
                </View>
                <Text style={styles.dashboardPathStepName}>{course.title}</Text>
              </View>
            ))}
          </View>
          {learningPath.nextMilestone && (
            <Text style={styles.dashboardPathMilestone}>
              Depois: {learningPath.nextMilestone}
            </Text>
          )}
        </View>

        <View style={styles.dashboardSectionHeader}>
          <View>
            <Text style={styles.dashboardSectionEyebrow}>MAPA DE TRILHAS</Text>
            <Text style={styles.dashboardSectionTitle}>
              Progresso por linguagem
            </Text>
          </View>
          <Text style={styles.dashboardSectionMeta}>
            {courses.filter((course) => course.status === "available").length}{" "}
            ativas
          </Text>
        </View>

        <View style={styles.dashboardCourseList}>
          {courses.map((course) => {
            const lessons = getCourseLessons(course.id);
            const prefix = getCoursePrefix(course.id);
            const completed = progress.completedLessons.filter((id) =>
              id.startsWith(prefix),
            ).length;
            const percent = lessons.length
              ? Math.round((completed / lessons.length) * 100)
              : 0;
            const available = course.status === "available";
            return (
              <Pressable
                key={course.id}
                disabled={!available}
                onPress={() => onOpenCourse(course.id)}
                style={({ pressed }) => [
                  styles.dashboardCourseCard,
                  !available && styles.dashboardCourseLocked,
                  pressed && styles.pressed,
                ]}
              >
                <View
                  style={[
                    styles.dashboardCourseBadge,
                    { backgroundColor: course.color },
                  ]}
                >
                  <CourseSymbol course={course} />
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.dashboardCourseTitleRow}>
                    <Text style={styles.dashboardCourseTitle}>
                      {course.title}
                    </Text>
                    <Text style={styles.dashboardCourseStatus}>
                      {available ? `${percent}%` : "EM BREVE"}
                    </Text>
                  </View>
                  <Text style={styles.dashboardCourseMeta}>
                    {available
                      ? `${completed} de ${lessons.length} aulas`
                      : "Trilha planejada"}
                  </Text>
                  {available && (
                    <View style={styles.dashboardCourseTrack}>
                      <View
                        style={[
                          styles.dashboardCourseFill,
                          {
                            width: `${Math.max(percent, percent ? 3 : 0)}%`,
                            backgroundColor: course.color,
                          },
                        ]}
                      />
                    </View>
                  )}
                </View>
                {available && (
                  <Text style={styles.dashboardCourseArrow}>›</Text>
                )}
              </Pressable>
            );
          })}
        </View>

        <View style={styles.dashboardSectionHeader}>
          <View>
            <Text style={styles.dashboardSectionEyebrow}>ROTINA DE HOJE</Text>
            <Text style={styles.dashboardSectionTitle}>
              Seu próximo movimento
            </Text>
          </View>
        </View>
        <View style={styles.dashboardRoutineCard}>
          <View style={styles.dashboardRoutineIcon}>
            <Text style={styles.dashboardRoutineIconText}>
              {completedToday ? "✓" : "→"}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.dashboardRoutineTitle}>
              {completedToday
                ? "Meta de hoje cumprida"
                : `Comece por ${preferredCourse?.title ?? "JavaScript"}`}
            </Text>
            <Text style={styles.dashboardRoutineText}>
              {completedToday
                ? "Você já estudou hoje. Se quiser, faça uma revisão leve."
                : "Complete uma aula para manter sua sequência e ganhar XP."}
            </Text>
          </View>
          {!completedToday && (
            <Text style={styles.dashboardRoutineMeta}>1 aula</Text>
          )}
        </View>

        <View style={styles.dashboardActionRow}>
          <Pressable
            onPress={onOpenReview}
            style={({ pressed }) => [
              styles.dashboardActionCard,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.dashboardActionIcon}>↻</Text>
            <Text style={styles.dashboardActionTitle}>Revisar agora</Text>
            <Text style={styles.dashboardActionText}>
              {getReviewCount(progress)} pendente(s)
            </Text>
          </Pressable>
          <Pressable
            onPress={() => onOpenCourse(preferredCourse?.id ?? "javascript")}
            style={({ pressed }) => [
              styles.dashboardActionCard,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.dashboardActionIcon}>▶</Text>
            <Text style={styles.dashboardActionTitle}>Continuar trilha</Text>
            <Text style={styles.dashboardActionText}>
              {preferredCourse?.title ?? "JavaScript"}
            </Text>
          </Pressable>
        </View>

        <Pressable
          onPress={onOpenProjects}
          style={({ pressed }) => [
            styles.dashboardProjectLauncher,
            pressed && styles.pressed,
          ]}
        >
          <View style={{ flex: 1 }}>
            <Text style={styles.dashboardSectionEyebrow}>
              LABORATÓRIO STUDYCODE
            </Text>
            <Text style={styles.dashboardProjectTitle}>Projetos práticos</Text>
            <Text style={styles.dashboardProjectText}>
              Use suas aulas para criar algo que realmente funciona.
            </Text>
          </View>
          <Text style={styles.dashboardProjectArrow}>›</Text>
        </Pressable>

        <View style={styles.dashboardSectionHeader}>
          <View>
            <Text style={styles.dashboardSectionEyebrow}>EMBLEMAS</Text>
            <Text style={styles.dashboardSectionTitle}>
              Conquistas desbloqueadas
            </Text>
          </View>
          <Text style={styles.dashboardSectionMeta}>
            {unlockedAchievements.length}/{achievements.length}
          </Text>
        </View>
        <AchievementGrid achievements={achievements} />

        <View style={styles.dashboardLastResult}>
          <Text style={styles.dashboardSectionEyebrow}>ÚLTIMO DESAFIO</Text>
          <Text style={styles.dashboardLastResultTitle}>
            {lastResult
              ? `${lastResult.percent}% de aproveitamento`
              : "Seu primeiro desafio ainda espera por você"}
          </Text>
          <Text style={styles.dashboardLastResultText}>
            {lastResult
              ? `${lastResult.correctCount} acerto(s) · ${lastResult.wrongCount} erro(s)`
              : "Leia a aula com calma e responda quando estiver pronto."}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function ReviewScreen({ lessons, progress, onBack, onStartLesson }) {
  const mistakes = progress.mistakeNotebook ?? [];

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Modo revisão"
        onBack={onBack}
        right={
          <Text style={styles.lessonCounter}>{getReviewCount(progress)}</Text>
        }
      />
      <ScrollView
        contentContainerStyle={styles.reviewScreenContent}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={gradients.brand}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.reviewHero}
        >
          <View style={styles.reviewHeroCopy}>
            <Text style={styles.reviewHeroEyebrow}>FIXAÇÃO DE CONTEÚDO</Text>
            <Text style={styles.reviewHeroTitle}>
              Revise hoje o que quase escapou ontem.
            </Text>
            <Text style={styles.reviewHeroText}>
              Cada desafio errado virou uma oportunidade de tentar de novo, com
              calma e contexto.
            </Text>
          </View>
        </LinearGradient>

        {mistakes.length > 0 && (
          <View style={styles.mistakeNotebookSection}>
            <View style={styles.mistakeNotebookHeader}>
              <View>
                <Text style={styles.reviewSectionLabel}>CADERNO DE ERROS</Text>
                <Text style={styles.mistakeNotebookTitle}>
                  Seus pontos de atenção
                </Text>
              </View>
              <Text style={styles.mistakeNotebookCount}>{mistakes.length}</Text>
            </View>

            {mistakes.map((mistake) => {
              const relatedLesson = getAnyLessonById(mistake.lessonId);
              return (
                <View key={mistake.id} style={styles.mistakeCard}>
                  <View style={styles.mistakeCardTopRow}>
                    <View style={styles.mistakeCoursePill}>
                      <Text style={styles.mistakeCoursePillText}>
                        {mistake.courseTitle}
                      </Text>
                    </View>
                    <Text style={styles.mistakeAttempts}>
                      {mistake.attempts} tentativa(s)
                    </Text>
                  </View>
                  <Text style={styles.mistakeLessonTitle}>
                    {mistake.lessonTitle}
                  </Text>
                  <Text style={styles.mistakePrompt}>{mistake.prompt}</Text>

                  <View style={styles.mistakeAnswerWrong}>
                    <Text style={styles.mistakeAnswerLabel}>SUA RESPOSTA</Text>
                    <Text style={styles.mistakeAnswerText}>
                      {mistake.selectedAnswer}
                    </Text>
                  </View>
                  <View style={styles.mistakeAnswerCorrect}>
                    <Text
                      style={[
                        styles.mistakeAnswerLabel,
                        styles.mistakeAnswerLabelCorrect,
                      ]}
                    >
                      RESPOSTA CORRETA
                    </Text>
                    <Text style={styles.mistakeAnswerText}>
                      {mistake.correctAnswer}
                    </Text>
                  </View>

                  <Text style={styles.mistakeExplanation}>
                    {mistake.explanation}
                  </Text>
                  <View style={styles.mistakeFooter}>
                    <Text style={styles.mistakeReviewDate}>
                      Revisar em {formatDateKeyLabel(mistake.reviewDate)}
                    </Text>
                    {relatedLesson && (
                      <Pressable
                        onPress={() => onStartLesson(relatedLesson)}
                        style={({ pressed }) => [
                          styles.mistakeReviewButton,
                          pressed && styles.pressed,
                        ]}
                      >
                        <Text style={styles.mistakeReviewButtonText}>
                          Revisar aula →
                        </Text>
                      </Pressable>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        )}

        {lessons.length === 0 && mistakes.length === 0 ? (
          <View style={styles.reviewEmptyCard}>
            <Text style={styles.reviewEmptyIcon}>✓</Text>
            <Text style={styles.reviewEmptyTitle}>Tudo em dia</Text>
            <Text style={styles.reviewEmptyText}>
              Você ainda não tem aulas pendentes de revisão. Continue estudando
              e o StudyCode vai separar os próximos desafios automaticamente.
            </Text>
            <Text style={styles.reviewEmptyMeta}>
              {progress.completedLessons.length} aula(s) concluída(s)
            </Text>
          </View>
        ) : lessons.length > 0 ? (
          <View style={styles.reviewList}>
            <Text style={styles.reviewSectionLabel}>PRÓXIMAS REVISÕES</Text>
            {lessons.map((lesson, index) => (
              <Pressable
                key={lesson.id}
                onPress={() => onStartLesson(lesson)}
                style={({ pressed }) => [
                  styles.reviewLessonCard,
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.reviewLessonNumber}>
                  <Text style={styles.reviewLessonNumberText}>{index + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reviewLessonEyebrow}>
                    {lesson.eyebrow}
                  </Text>
                  <Text style={styles.reviewLessonTitle}>{lesson.title}</Text>
                  <Text style={styles.reviewLessonMeta}>
                    {lesson.duration} · desafio pendente
                  </Text>
                </View>
                <Text style={styles.reviewLessonArrow}>›</Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

function StudyHint({ mood = "study", message }) {
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(float, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [float]);

  const toneStyle =
    mood === "success"
      ? styles.mentorSuccess
      : mood === "encourage"
        ? styles.mentorEncourage
        : styles.mentorStudy;

  return (
    <View style={[styles.mentorCard, toneStyle]}>
      <LinearGradient
        colors={
          mood === "success"
            ? gradients.achievement
            : mood === "study"
              ? [colors.logoYellow, colors.logoGold]
              : gradients.brand
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.mentorAccent}
      />
      <View style={styles.mentorBubble}>
        <Text style={styles.mentorName}>DICA DE ESTUDO</Text>
        <Text style={styles.mentorMessage}>{message}</Text>
      </View>
    </View>
  );
}

function getLessonReadingGuide(section, hasCode) {
  if (section === "sintaxe" || section === "simbolo-por-simbolo") {
    return "Observe primeiro a estrutura completa. Depois identifique o papel de cada símbolo antes de tentar memorizar a escrita.";
  }

  if (section === "linha-por-linha") {
    return "Acompanhe a execução na ordem: descubra o valor que entra em cada linha, como ele muda e o que é produzido ao final.";
  }
  if (section === "quando-usar" || section === "quando-nao-usar") {
    return "A escolha correta depende do problema. Compare os dois cenários e procure a opção que deixa a intenção do código mais clara.";
  }
  if (section === "erros-comuns") {
    return "Use o erro como pista: compare o resultado esperado com o resultado real e encontre a primeira etapa em que eles ficam diferentes.";
  }
  if (section === "mini-projeto") {
    return "Não comece pelo código. Escreva primeiro a entrada, o resultado esperado e a menor versão que consegue testar.";
  }
  if (hasCode) {
    return "Antes de executar, tente prever o resultado. Depois compare sua hipótese com o comportamento real do exemplo.";
  }
  return "Ao terminar, explique o conceito com suas palavras e conecte-o a uma situação real.";
}

function LessonScreen({
  lesson,
  profile,
  progress,
  onBack,
  onStartPractice,
  onStartQuiz,
}) {
  const [page, setPage] = useState(0);
  const [lessonAiVisible, setLessonAiVisible] = useState(false);
  const [lessonAiInput, setLessonAiInput] = useState("");
  const [lessonAiSending, setLessonAiSending] = useState(false);
  const [lessonAiChat, setLessonAiChat] = useState([]);
  const pageEntrance = useRef(new Animated.Value(0)).current;
  const current = lesson.pages[page];
  const lastPage = page === lesson.pages.length - 1;
  const guidedPractice = getGuidedPractice(lesson);
  const readingGuide = getLessonReadingGuide(current.section, !!current.code);

  async function askLessonAi() {
    const message = lessonAiInput.trim();
    if (!message || lessonAiSending) return;
    setLessonAiInput("");
    setLessonAiChat((current) => [
      ...current,
      { id: `${Date.now()}-user`, role: "user", text: message },
    ]);
    setLessonAiSending(true);
    const reply = await askMentor({
      message,
      profile,
      progress,
      context: {
        lessonTitle: lesson.title,
        sectionTitle: current.title,
        sectionBody: current.body,
        code: current.code,
        courseId: lesson.id.split("-")[0],
      },
    });
    setLessonAiChat((currentChat) => [
      ...currentChat,
      { id: `${Date.now()}-assistant`, role: "assistant", text: reply },
    ]);
    setLessonAiSending(false);
  }

  useEffect(() => {
    pageEntrance.setValue(0);
    Animated.timing(pageEntrance, {
      toValue: 1,
      duration: 420,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [page, pageEntrance]);

  if (legalDocument) {
    return (
      <LegalDocumentScreen
        document={LEGAL_DOCUMENTS[legalDocument]}
        onBack={() => setLegalDocument(null)}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title={lesson.title}
        onBack={onBack}
        right={
          <Text style={styles.lessonCounter}>
            {page + 1}/{lesson.pages.length}
          </Text>
        }
      />
      <View style={styles.lessonProgressTrack}>
        <View
          style={[
            styles.lessonProgressFill,
            { width: `${((page + 1) / lesson.pages.length) * 100}%` },
          ]}
        />
      </View>

      <Animated.ScrollView
        contentContainerStyle={styles.lessonContent}
        showsVerticalScrollIndicator={false}
        style={{
          opacity: pageEntrance,
          transform: [
            {
              translateX: pageEntrance.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        <View style={styles.lessonHero}>
          <LinearGradient
            colors={gradients.brand}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <View style={styles.lessonHeroGlow} />
          <View style={styles.lessonHeroCopy}>
            <View style={styles.lessonHeroTag}>
              <View style={styles.lessonHeroTagDot} />
              <Text style={styles.lessonHeroTagText}>
                MISSÃO {page + 1} DE {lesson.pages.length}
              </Text>
            </View>
            <Text style={styles.lessonEyebrow}>
              {current.label.toUpperCase()}
            </Text>
            <Text style={styles.lessonPageTitle}>{current.title}</Text>
          </View>
        </View>
        <View style={styles.lessonExplanationCard}>
          <View style={styles.lessonExplanationHeader}>
            <View style={styles.lessonExplanationDot} />
            <Text style={styles.lessonExplanationEyebrow}>
              ENTENDA ESTA ETAPA
            </Text>
          </View>
          <Text style={styles.lessonBody}>{current.body}</Text>
          <View style={styles.lessonReadingGuide}>
            <Text style={styles.lessonReadingGuideIcon}>→</Text>
            <Text style={styles.lessonReadingGuideText}>{readingGuide}</Text>
          </View>
        </View>
        {page === 0 && !!lesson.learningObjectives?.length && (
          <View style={styles.lessonObjectivesCard}>
            <Text style={styles.lessonObjectivesEyebrow}>AO FINAL DESTA AULA</Text>
            {lesson.learningObjectives.map((objective, index) => (
              <View key={objective} style={styles.lessonObjectiveRow}>
                <View style={styles.lessonObjectiveNumber}>
                  <Text style={styles.lessonObjectiveNumberText}>{index + 1}</Text>
                </View>
                <Text style={styles.lessonObjectiveText}>{objective}</Text>
              </View>
            ))}
          </View>
        )}
        <Pressable
          onPress={() => setLessonAiVisible(true)}
          style={({ pressed }) => [
            styles.lessonAiButton,
            pressed && styles.pressed,
          ]}
        >
          <View style={styles.lessonAiButtonIcon}>
            <Text style={styles.lessonAiButtonIconText}>?</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.lessonAiButtonEyebrow}>ESTOU COM DÚVIDA</Text>
            <Text style={styles.lessonAiButtonText}>
              Pergunte sobre esta explicação ou código
            </Text>
          </View>
          <Text style={styles.lessonAiButtonArrow}>›</Text>
        </Pressable>
        <View style={styles.studyNudge}>
          <Text style={styles.studyNudgeIcon}>✦</Text>
          <Text style={styles.studyNudgeText}>
            {page === 0
              ? "Prepare-se para a missão. Sem pressa: entenda a ideia antes de avançar."
              : "Ponto salvo na memória. Mais uma peça e seu projeto começa a ganhar forma."}
          </Text>
        </View>

        {current.analogy && (
          <View style={styles.analogyCard}>
            <Text style={styles.analogyIcon}>{current.analogy.icon}</Text>
            <View>
              <Text style={styles.analogyTitle}>{current.analogy.title}</Text>
              <Text style={styles.analogyValue}>{current.analogy.value}</Text>
            </View>
          </View>
        )}

        {current.code && (
          <View style={styles.codeCard}>
            <View style={styles.codeTopBar}>
              <View
                style={[styles.codeDot, { backgroundColor: colors.error }]}
              />
              <View
                style={[styles.codeDot, { backgroundColor: colors.warning }]}
              />
              <View
                style={[styles.codeDot, { backgroundColor: colors.success }]}
              />
              <Text style={styles.codeFilename}>exemplo.js</Text>
            </View>
            <Text style={styles.codeText}>{current.code}</Text>
          </View>
        )}

        {current.notes && (
          <View style={styles.notesBlock}>
            {current.notes.map((note) => (
              <View key={note.token} style={styles.noteRow}>
                <Text style={styles.noteToken}>{note.token}</Text>
                <Text style={styles.noteArrow}>→</Text>
                <Text style={styles.noteText}>{note.text}</Text>
              </View>
            ))}
          </View>
        )}

        {current.practicalExample && (
          <View style={styles.practicalExampleCard}>
            <View style={styles.practicalExampleHeader}>
              <View style={styles.practicalExampleIcon}>
                <Text style={styles.practicalExampleIconText}>▶</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.practicalExampleEyebrow}>
                  VEJA ACONTECER
                </Text>
                <Text style={styles.practicalExampleContext}>
                  {current.practicalExample.context}
                </Text>
              </View>
            </View>
            <View style={styles.practicalExampleCode}>
              <Text style={styles.practicalExampleCodeText}>
                {current.practicalExample.code}
              </Text>
            </View>
            <View style={styles.practicalExampleResult}>
              <Text style={styles.practicalExampleResultLabel}>RESULTADO</Text>
              <Text style={styles.practicalExampleResultText}>
                {current.practicalExample.output}
              </Text>
            </View>
            <Text style={styles.practicalExampleExplanation}>
              {current.practicalExample.explanation}
            </Text>
          </View>
        )}

        {current.tip && (
          <View style={styles.tipCard}>
            <Text style={styles.tipIcon}>💡</Text>
            <Text style={styles.tipText}>{current.tip}</Text>
          </View>
        )}
      </Animated.ScrollView>

      <Modal
        visible={lessonAiVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setLessonAiVisible(false)}
      >
        <View style={styles.lessonAiBackdrop}>
          <View style={styles.lessonAiSheet}>
            <View style={styles.lessonAiSheetHeader}>
              <View>
                <Text style={styles.lessonAiSheetEyebrow}>
                  AJUDA NA EXPLICAÇÃO
                </Text>
                <Text style={styles.lessonAiSheetTitle}>Tire sua dúvida</Text>
              </View>
              <Pressable
                onPress={() => setLessonAiVisible(false)}
                style={styles.lessonAiClose}
              >
                <Text style={styles.lessonAiCloseText}>×</Text>
              </Pressable>
            </View>
            <Text style={styles.lessonAiContext}>{current.title}</Text>
            <ScrollView
              style={styles.lessonAiChat}
              contentContainerStyle={styles.lessonAiChatContent}
              showsVerticalScrollIndicator
              keyboardShouldPersistTaps="handled"
            >
              {lessonAiChat.length === 0 && (
                <Text style={styles.lessonAiEmpty}>
                  Pergunte o que uma linha faz, por que o código funciona ou
                  onde está o ponto mais importante.
                </Text>
              )}
              {lessonAiChat.map((item) => (
                <View
                  key={item.id}
                  style={[
                    styles.lessonAiBubble,
                    item.role === "user" && styles.lessonAiBubbleUser,
                  ]}
                >
                  <Text style={styles.lessonAiRole}>
                    {item.role === "user" ? "VOCÊ" : "STUDYCODE AI"}
                  </Text>
                  <Text style={styles.lessonAiMessage}>{item.text}</Text>
                </View>
              ))}
              {lessonAiSending && (
                <Text style={styles.lessonAiTyping}>
                  Analisando esta explicação...
                </Text>
              )}
            </ScrollView>
            <View style={styles.lessonAiInputRow}>
              <TextInput
                value={lessonAiInput}
                onChangeText={setLessonAiInput}
                placeholder="Ex.: o que esta linha faz?"
                placeholderTextColor={colors.textMuted}
                style={styles.lessonAiInput}
                onSubmitEditing={askLessonAi}
                returnKeyType="send"
                editable={!lessonAiSending}
              />
              <Pressable
                onPress={askLessonAi}
                disabled={!lessonAiInput.trim() || lessonAiSending}
                style={[
                  styles.lessonAiSend,
                  (!lessonAiInput.trim() || lessonAiSending) &&
                    styles.lessonAiSendDisabled,
                ]}
              >
                <Text style={styles.lessonAiSendText}>↑</Text>
              </Pressable>
            </View>
            <Text style={styles.lessonAiDisclaimer}>
              A ajuda usa o conteúdo desta explicação. O desafio continua sem
              dicas automáticas.
            </Text>
          </View>
        </View>
      </Modal>

      <View style={styles.bottomAction}>
        <Pressable
          onPress={() =>
            lastPage
              ? guidedPractice.length
                ? onStartPractice()
                : onStartQuiz()
              : setPage(page + 1)
          }
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
          ]}
        >
          <LinearGradient
            colors={gradients.primaryButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.primaryButtonText}>
            {lastPage
              ? guidedPractice.length
                ? "Treinar antes do desafio"
                : "Começar desafio"
              : "Continuar"}
          </Text>
          <Text style={styles.primaryButtonArrow}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

function GuidedPracticeScreen({ lesson, onBack, onStartQuiz }) {
  const exercises = getGuidedPractice(lesson);
  const [exerciseIndex, setExerciseIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const entrance = useRef(new Animated.Value(0)).current;
  const exercise = exercises[exerciseIndex] ?? exercises[0];
  const answered = selected !== null;
  const correct = selected === exercise?.answer;
  const lastExercise = exerciseIndex === exercises.length - 1;

  useEffect(() => {
    entrance.setValue(0);
    Animated.timing(entrance, {
      toValue: 1,
      duration: 360,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [entrance, exerciseIndex]);

  if (!exercise) return null;

  function continuePractice() {
    if (lastExercise) {
      onStartQuiz();
      return;
    }
    setExerciseIndex((index) => index + 1);
    setSelected(null);
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title="Treino guiado"
        onBack={onBack}
        right={
          <Text style={styles.lessonCounter}>
            {exerciseIndex + 1}/{exercises.length}
          </Text>
        }
      />
      <View style={styles.lessonProgressTrack}>
        <View
          style={[
            styles.practiceProgressFill,
            { width: `${((exerciseIndex + 1) / exercises.length) * 100}%` },
          ]}
        />
      </View>
      <Animated.ScrollView
        contentContainerStyle={styles.practiceContent}
        showsVerticalScrollIndicator={false}
        style={{
          opacity: entrance,
          transform: [
            {
              translateY: entrance.interpolate({
                inputRange: [0, 1],
                outputRange: [14, 0],
              }),
            },
          ],
        }}
      >
        <View style={styles.practiceHero}>
          <View style={{ flex: 1 }}>
            <Text style={styles.practiceEyebrow}>
              AQUECIMENTO ANTES DO QUIZ
            </Text>
            <Text style={styles.practiceHeroText}>
              Erre aqui sem pressão: revise a ideia antes do desafio valer XP.
            </Text>
          </View>
        </View>

        <View style={styles.practiceLabel}>
          <Text style={styles.practiceLabelText}>
            {exercise.label.toUpperCase()}
          </Text>
        </View>
        <Text style={styles.practicePrompt}>{exercise.title}</Text>
        <View style={styles.practiceCodeCard}>
          <Text style={styles.practiceCodeText}>{exercise.code}</Text>
        </View>

        <View style={styles.practiceOptions}>
          {exercise.options.map((option, index) => {
            const isSelected = selected === index;
            const isCorrect = answered && index === exercise.answer;
            const isWrong = answered && isSelected && !correct;
            return (
              <Pressable
                key={option}
                disabled={answered}
                onPress={() => setSelected(index)}
                style={({ pressed }) => [
                  styles.practiceOption,
                  isSelected && styles.practiceOptionSelected,
                  isCorrect && styles.practiceOptionCorrect,
                  isWrong && styles.practiceOptionWrong,
                  pressed && !answered && styles.pressed,
                ]}
              >
                <Text
                  style={[
                    styles.practiceOptionLetter,
                    isWrong && styles.practiceOptionTextWrong,
                  ]}
                >
                  {String.fromCharCode(65 + index)}
                </Text>
                <Text
                  style={[
                    styles.practiceOptionText,
                    isWrong && styles.practiceOptionTextWrong,
                  ]}
                >
                  {option}
                </Text>
                {isCorrect && (
                  <Text
                    style={[
                      styles.practiceOptionResult,
                      styles.practiceOptionResultCorrect,
                    ]}
                  >
                    ✓
                  </Text>
                )}
                {isWrong && (
                  <Text
                    style={[
                      styles.practiceOptionResult,
                      styles.practiceOptionResultWrong,
                    ]}
                  >
                    ×
                  </Text>
                )}
              </Pressable>
            );
          })}
        </View>

        {answered && (
          <View
            style={[
              styles.practiceFeedback,
              correct
                ? styles.practiceFeedbackCorrect
                : styles.practiceFeedbackWrong,
            ]}
          >
            <Text
              style={[
                styles.practiceFeedbackTitle,
                !correct && styles.feedbackTextWrong,
              ]}
            >
              {correct
                ? "Boa! Você leu o código corretamente."
                : "Quase. Vamos entender juntos."}
            </Text>
            <Text
              style={[
                styles.practiceFeedbackText,
                !correct && styles.feedbackTextWrong,
              ]}
            >
              {exercise.explanation}
            </Text>
          </View>
        )}
      </Animated.ScrollView>

      <View style={styles.bottomAction}>
        <Pressable
          disabled={!answered}
          onPress={continuePractice}
          style={({ pressed }) => [
            styles.primaryButton,
            !answered && styles.primaryButtonDisabled,
            pressed && answered && styles.pressed,
          ]}
        >
          {answered && (
            <LinearGradient
              colors={gradients.primaryButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          )}
          <Text style={styles.primaryButtonText}>
            {lastExercise ? "Ir para o desafio final" : "Próximo treino"}
          </Text>
          <Text style={styles.primaryButtonArrow}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

function QuizScreen({ lesson, onBack, onComplete }) {
  const quizQuestions = getQuizQuestions(lesson);
  const maxFocusChips = Math.min(MAX_FOCUS_CHIPS, quizQuestions.length);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [typedAnswer, setTypedAnswer] = useState("");
  const [inputSubmitted, setInputSubmitted] = useState(false);
  const [orderedIndexes, setOrderedIndexes] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [focusChips, setFocusChips] = useState(maxFocusChips);
  const questionEntrance = useRef(new Animated.Value(0)).current;
  const question = quizQuestions[questionIndex];
  const isInputQuestion = question.type === "input";
  const isOrderQuestion = question.type === "order";
  const answered =
    isInputQuestion || isOrderQuestion ? inputSubmitted : selected !== null;
  const correct = isInputQuestion
    ? (question.acceptedAnswers ?? []).some(
        (answer) => normalizeCodeAnswer(answer) === normalizeCodeAnswer(typedAnswer),
      )
    : isOrderQuestion
      ? JSON.stringify(orderedIndexes) === JSON.stringify(question.correctOrder)
      : selected === question.answer;
  const lastQuestion = questionIndex === quizQuestions.length - 1;

  useEffect(() => {
    questionEntrance.setValue(0);
    Animated.timing(questionEntrance, {
      toValue: 1,
      duration: 380,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [questionIndex, questionEntrance]);

  useEffect(() => {
    setQuestionIndex(0);
    setSelected(null);
    setTypedAnswer("");
    setInputSubmitted(false);
    setOrderedIndexes([]);
    setAnswers([]);
    setFocusChips(maxFocusChips);
  }, [lesson.id, maxFocusChips]);

  function nextQuestion() {
    if (focusChips === 0) {
      setQuestionIndex(0);
      setSelected(null);
      setTypedAnswer("");
      setInputSubmitted(false);
      setOrderedIndexes([]);
      setAnswers([]);
      setFocusChips(maxFocusChips);
      return;
    }
    const nextAnswers = [
      ...answers,
      {
        questionId: question.id,
        prompt: question.prompt,
        options: question.options,
        selectedIndex: selected,
        correctIndex: question.answer,
        selectedAnswer: isInputQuestion
          ? typedAnswer.trim()
          : isOrderQuestion
            ? orderedIndexes.map((index) => question.items[index]).join("\n")
            : undefined,
        correctAnswer: isInputQuestion
          ? question.answerDisplay
          : isOrderQuestion
            ? question.correctOrder
                .map((index) => question.items[index])
                .join("\n")
            : undefined,
        explanation: question.explanation,
        xp: question.xp ?? scoringRules.correct,
        difficulty: question.difficulty ?? "standard",
        correct,
      },
    ];
    if (lastQuestion) {
      const correctCount = nextAnswers.filter((item) => item.correct).length;
      const wrongCount = nextAnswers.length - correctCount;
      const perfect = wrongCount === 0;
      const questionXp = nextAnswers.reduce(
        (total, answer) =>
          total +
          (answer.correct ? answer.xp : scoringRules.wrong),
        0,
      );
      const hardBonus = nextAnswers.reduce(
        (total, answer) =>
          total +
          (answer.correct && answer.difficulty === "hard"
            ? Math.max(0, answer.xp - scoringRules.correct)
            : 0),
        0,
      );
      const xpChange =
        scoringRules.completion +
        questionXp +
        (perfect ? scoringRules.perfect : 0);

      onComplete({
        correctCount,
        wrongCount,
        total: nextAnswers.length,
        percent: Math.round((correctCount / nextAnswers.length) * 100),
        xpChange,
        questionXp,
        hardBonus,
        perfect,
        answers: nextAnswers,
      });
      return;
    }
    setAnswers(nextAnswers);
    setQuestionIndex(questionIndex + 1);
    setSelected(null);
    setTypedAnswer("");
    setInputSubmitted(false);
    setOrderedIndexes([]);
  }

  function submitTypedAnswer() {
    if (!typedAnswer.trim() || inputSubmitted) return;
    const isCorrect = (question.acceptedAnswers ?? []).some(
      (answer) => normalizeCodeAnswer(answer) === normalizeCodeAnswer(typedAnswer),
    );
    setInputSubmitted(true);
    if (!isCorrect) {
      setFocusChips((value) => Math.max(0, value - 1));
    }
  }

  function submitOrderAnswer() {
    if (orderedIndexes.length !== question.items.length || inputSubmitted) return;
    const isCorrect =
      JSON.stringify(orderedIndexes) === JSON.stringify(question.correctOrder);
    setInputSubmitted(true);
    if (!isCorrect) {
      setFocusChips((value) => Math.max(0, value - 1));
    }
  }

  return (
    <View style={styles.screen}>
      <ScreenHeader
        title={`Desafio · ${lesson.title}`}
        onBack={onBack}
        right={
          <View style={styles.quizHeaderRight}>
            <View style={styles.focusChipGroup}>
              <Text style={styles.focusChipLabel}>FOCO</Text>
              {Array.from({ length: maxFocusChips }).map((_, index) => (
                <View
                  key={`focus-chip-${index}`}
                  style={[
                    styles.focusChip,
                    index < focusChips && styles.focusChipActive,
                    focusChips === 1 &&
                      index < focusChips &&
                      styles.focusChipWarning,
                  ]}
                />
              ))}
            </View>
            <Text style={styles.lessonCounter}>
              {questionIndex + 1}/{quizQuestions.length}
            </Text>
          </View>
        }
      />
      <View style={styles.lessonProgressTrack}>
        <View
          style={[
            styles.quizProgressFill,
            {
              width: `${((questionIndex + 1) / quizQuestions.length) * 100}%`,
            },
          ]}
        />
      </View>

      <Animated.ScrollView
        contentContainerStyle={styles.quizContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        style={{
          opacity: questionEntrance,
          transform: [
            {
              translateY: questionEntrance.interpolate({
                inputRange: [0, 1],
                outputRange: [16, 0],
              }),
            },
          ],
        }}
      >
        {questionIndex === 0 && !answered && (
          <LinearGradient
            colors={gradients.primaryButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.quizChallengeBanner}
          >
            <View style={styles.quizChallengeCopy}>
              <Text style={styles.quizChallengeEyebrow}>DESAFIO FINAL</Text>
              <Text style={styles.quizChallengeTitle}>Agora é com você.</Text>
              <Text style={styles.quizChallengeText}>
                Respire, leia com calma e confie no que aprendeu.
              </Text>
            </View>
          </LinearGradient>
        )}
        <View
          style={[
            styles.quizTag,
            question.difficulty === "hard" && styles.quizTagHard,
          ]}
        >
          <Text
            style={[
              styles.quizTagText,
              question.difficulty === "hard" && styles.quizTagTextHard,
            ]}
          >
            {question.label ?? "DESAFIO"} · +
            {question.xp ?? scoringRules.correct} XP
          </Text>
        </View>
        <Text style={styles.quizPrompt}>{question.prompt}</Text>
        {question.code && (
          <View style={styles.quizCodeCard}>
            <Text style={styles.quizCodeText}>{question.code}</Text>
          </View>
        )}

        {isOrderQuestion ? (
          <View style={styles.orderQuestionBlock}>
            <Text style={styles.typedAnswerLabel}>SUA SEQUÊNCIA</Text>
            <View
              style={[
                styles.orderAnswerZone,
                answered &&
                  (correct
                    ? styles.typedAnswerCorrect
                    : styles.typedAnswerWrong),
              ]}
            >
              {orderedIndexes.length === 0 ? (
                <Text style={styles.orderPlaceholder}>
                  Toque nos blocos abaixo para montar o código
                </Text>
              ) : (
                orderedIndexes.map((itemIndex, position) => (
                  <Pressable
                    key={`${itemIndex}-${position}`}
                    disabled={answered}
                    onPress={() =>
                      setOrderedIndexes((items) =>
                        items.filter((_, index) => index !== position),
                      )
                    }
                    style={styles.orderSelectedItem}
                  >
                    <Text style={styles.orderPosition}>{position + 1}</Text>
                    <Text style={styles.orderItemText}>
                      {question.items[itemIndex]}
                    </Text>
                  </Pressable>
                ))
              )}
            </View>
            <View style={styles.orderChoices}>
              {question.items.map((item, index) => {
                const used = orderedIndexes.includes(index);
                return (
                  <Pressable
                    key={`${item}-${index}`}
                    disabled={used || answered}
                    onPress={() =>
                      setOrderedIndexes((items) => [...items, index])
                    }
                    style={({ pressed }) => [
                      styles.orderChoice,
                      used && styles.orderChoiceUsed,
                      pressed && styles.pressed,
                    ]}
                  >
                    <Text style={styles.orderChoiceText}>{item}</Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable
              disabled={
                orderedIndexes.length !== question.items.length || answered
              }
              onPress={submitOrderAnswer}
              style={({ pressed }) => [
                styles.orderValidateButton,
                (orderedIndexes.length !== question.items.length || answered) &&
                  styles.typedAnswerSubmitDisabled,
                pressed && styles.pressed,
              ]}
            >
              <Text style={styles.typedAnswerSubmitText}>VALIDAR ORDEM</Text>
            </Pressable>
          </View>
        ) : isInputQuestion ? (
          <View style={styles.typedAnswerBlock}>
            <Text style={styles.typedAnswerLabel}>SUA RESPOSTA</Text>
            <View
              style={[
                styles.typedAnswerRow,
                answered &&
                  (correct
                    ? styles.typedAnswerCorrect
                    : styles.typedAnswerWrong),
              ]}
            >
              <TextInput
                value={typedAnswer}
                onChangeText={setTypedAnswer}
                editable={!answered}
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Digite o código que falta"
                placeholderTextColor={colors.textMuted}
                style={[
                  styles.typedAnswerInput,
                  answered && !correct && styles.typedAnswerInputWrong,
                ]}
                onSubmitEditing={submitTypedAnswer}
              />
              <Pressable
                disabled={!typedAnswer.trim() || answered}
                onPress={submitTypedAnswer}
                style={({ pressed }) => [
                  styles.typedAnswerSubmit,
                  (!typedAnswer.trim() || answered) &&
                    styles.typedAnswerSubmitDisabled,
                  pressed && styles.pressed,
                ]}
              >
                <Text style={styles.typedAnswerSubmitText}>VALIDAR</Text>
              </Pressable>
            </View>
            {answered && !correct && (
              <Text style={styles.typedAnswerSolution}>
                Resposta esperada: {question.answerDisplay}
              </Text>
            )}
          </View>
        ) : (
          <View style={styles.optionsBlock}>
            {(question.options ?? []).map((option, index) => {
              const isSelected = selected === index;
              const isCorrectOption = answered && index === question.answer;
              const isWrongSelected = answered && isSelected && !correct;
              return (
                <Pressable
                  key={option}
                  disabled={answered}
                  onPress={() => {
                    setSelected(index);
                    if (index !== question.answer) {
                      setFocusChips((value) => Math.max(0, value - 1));
                    }
                  }}
                  style={({ pressed }) => [
                    styles.optionButton,
                    isSelected && styles.optionSelected,
                    isCorrectOption && styles.optionCorrect,
                    isWrongSelected && styles.optionWrong,
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.optionLetter}>
                    <Text
                      style={[
                        styles.optionLetterText,
                        isWrongSelected && styles.optionTextWrong,
                      ]}
                    >
                      {String.fromCharCode(65 + index)}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.optionText,
                      isWrongSelected && styles.optionTextWrong,
                    ]}
                  >
                    {option}
                  </Text>
                  {isCorrectOption && (
                    <Text
                      style={[styles.optionResult, styles.optionResultCorrect]}
                    >
                      ✓
                    </Text>
                  )}
                  {isWrongSelected && (
                    <Text
                      style={[styles.optionResult, styles.optionResultWrong]}
                    >
                      ×
                    </Text>
                  )}
                </Pressable>
              );
            })}
          </View>
        )}

        {answered && (
          <>
            <View
              style={[
                styles.feedbackCard,
                correct ? styles.feedbackCorrect : styles.feedbackWrong,
              ]}
            >
              {focusChips === 0 && (
                <Text style={styles.focusResetMessage}>
                  Seu foco acabou. Revise o conceito e tente novamente.
                </Text>
              )}
              <Text
                style={[
                  styles.feedbackTitle,
                  !correct && styles.feedbackTextWrong,
                ]}
              >
                {correct
                  ? `Muito bem!  +${question.xp ?? scoringRules.correct} XP`
                  : `Quase lá · ${scoringRules.wrong} XP`}
              </Text>
              <Text
                style={[
                  styles.feedbackText,
                  !correct && styles.feedbackTextWrong,
                ]}
              >
                {question.explanation}
              </Text>
            </View>
            <StudyHint
              mood={correct ? "success" : "encourage"}
              message={
                correct
                  ? "Acerto limpo! Pode comemorar em binário: 1 0 1 0. Agora seguimos."
                  : "Errar é dado de treino, não veredito. Leia a explicação e tente a próxima com calma."
              }
            />
          </>
        )}
      </Animated.ScrollView>

      <View style={styles.bottomAction}>
        <Pressable
          disabled={!answered}
          onPress={nextQuestion}
          style={({ pressed }) => [
            styles.primaryButton,
            !answered && styles.primaryButtonDisabled,
            pressed && answered && styles.pressed,
          ]}
        >
          {answered && (
            <LinearGradient
              colors={gradients.primaryButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={StyleSheet.absoluteFill}
            />
          )}
          <Text style={styles.primaryButtonText}>
            {focusChips === 0
              ? "Recomeçar desafio"
              : lastQuestion
                ? "Ver resultado"
                : "Próxima pergunta"}
          </Text>
          <Text style={styles.primaryButtonArrow}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

function PodiumMedal({ pulse, tone }) {
  const medalColor =
    tone === "Gold"
      ? colors.logoGold
      : tone === "Silver"
        ? colors.primaryLight
        : "#C8783D";

  return (
    <Animated.View
      style={[
        styles.podiumMedal,
        {
          transform: [
            {
              scale: pulse.interpolate({
                inputRange: [0, 1],
                outputRange: [0.96, 1.05],
              }),
            },
          ],
        },
      ]}
    >
      <View style={styles.podiumMedalRibbon}>
        <View style={styles.podiumMedalRibbonLeft} />
        <View style={styles.podiumMedalRibbonRight} />
      </View>
      <View
        style={[
          styles.podiumMedalCoin,
          { backgroundColor: medalColor, borderColor: colors.white },
        ]}
      >
        <Text style={styles.podiumMedalCode}>&lt;/&gt;</Text>
      </View>
    </Animated.View>
  );
}

function ResultScreen({ lesson, progress, onContinue }) {
  const result = progress.lastResult ?? {
    percent: 0,
    xpChange: 0,
    perfect: false,
    rewarded: false,
  };
  const earnedXp = result.rewarded ? result.xpChange : 0;
  const trophyPulse = useRef(new Animated.Value(0)).current;
  const wrongCount = result.wrongCount ?? 0;
  const podium =
    wrongCount === 0
      ? { place: 1, label: "1º lugar", tone: "Gold" }
      : wrongCount <= 2
        ? { place: 2, label: "2º lugar", tone: "Silver" }
        : { place: 3, label: "3º lugar", tone: "Bronze" };
  const isCourseFinal = lesson.id.includes("projeto-final");
  const confettiParticles = useRef(
    RESULT_CONFETTI.map(() => new Animated.Value(0)),
  ).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(trophyPulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(trophyPulse, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [trophyPulse]);

  useEffect(() => {
    const createFall = (value, delay, duration) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(value, {
            toValue: 1,
            duration,
            useNativeDriver: true,
          }),
          Animated.timing(value, {
            toValue: 0,
            duration: 1,
            useNativeDriver: true,
          }),
        ]),
      );

    const animations = confettiParticles.map((value, index) => {
      const particle = RESULT_CONFETTI[index];
      return createFall(value, particle.delay, particle.duration);
    });
    animations.forEach((animation) => animation.start());
    return () => animations.forEach((animation) => animation.stop());
  }, [confettiParticles]);

  return (
    <View style={styles.resultScreen}>
      {confettiParticles.map((progress, index) => {
        const particle = RESULT_CONFETTI[index];
        return (
          <Animated.View
            key={`result-confetti-${index}`}
            style={[
              styles.confettiParticle,
              {
                left: particle.left,
                top: particle.top,
                width: particle.width,
                height: particle.height,
                backgroundColor: particle.color,
                opacity: progress.interpolate({
                  inputRange: [0, 0.78, 1],
                  outputRange: [0, 1, 0],
                }),
                transform: [
                  {
                    translateY: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-32, particle.distance],
                    }),
                  },
                  {
                    rotate: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [
                        `${particle.rotate}deg`,
                        `${particle.rotate + 220}deg`,
                      ],
                    }),
                  },
                ],
              },
            ]}
          />
        );
      })}
      <Animated.View
        style={[
          styles.podiumStage,
          {
            transform: [
              {
                translateY: trophyPulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [3, -3],
                }),
              },
            ],
          },
        ]}
      >
        {isCourseFinal ? (
          <LottieView
            source={COURSE_CERTIFICATE}
            autoPlay
            loop={false}
            resizeMode="contain"
            style={styles.courseCertificateAnimation}
          />
        ) : podium.place === 1 ? (
          <LottieView
            source={MEDAL_GOLD}
            autoPlay
            loop={false}
            resizeMode="contain"
            style={styles.podiumLottieMedal}
          />
        ) : podium.place === 2 ? (
          <LottieView
            source={MEDAL_SILVER}
            autoPlay
            loop={false}
            resizeMode="contain"
            style={styles.podiumLottieMedal}
          />
        ) : (
          <PodiumMedal pulse={trophyPulse} tone={podium.tone} />
        )}
        {!isCourseFinal && (
          <View style={styles.podiumRow}>
            <View
              style={[
                styles.podiumStep,
                styles.podiumSecond,
                podium.place === 2 && styles.podiumActive,
              ]}
            >
              <Text style={styles.podiumPlace}>2º</Text>
            </View>
            <View
              style={[
                styles.podiumStep,
                styles.podiumFirst,
                podium.place === 1 && styles.podiumActive,
              ]}
            >
              <Text style={[styles.podiumPlace, styles.podiumPlaceFirst]}>
                1º
              </Text>
            </View>
            <View
              style={[
                styles.podiumStep,
                styles.podiumThird,
                podium.place === 3 && styles.podiumActive,
              ]}
            >
              <Text style={styles.podiumPlace}>3º</Text>
            </View>
          </View>
        )}
        <Text
          style={[styles.podiumRankLabel, styles[`podiumRank${podium.tone}`]]}
        >
          {isCourseFinal ? "Curso concluído" : podium.label}
        </Text>
      </Animated.View>
      <Animated.Text
        style={[
          styles.resultEmoji,
          {
            transform: [
              {
                scale: trophyPulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.08],
                }),
              },
              {
                rotate: trophyPulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["-2deg", "2deg"],
                }),
              },
            ],
          },
        ]}
      >
        🏆
      </Animated.Text>
      <Text style={styles.resultEyebrow}>
        {result.perfect ? "DESEMPENHO PERFEITO" : "AULA CONCLUÍDA"}
      </Text>
      <Text style={styles.resultTitle}>
        {result.perfect
          ? "Você dominou esta aula!"
          : "Mais um passo na sua jornada!"}
      </Text>
      <Text style={styles.resultSubtitle}>
        {result.rewarded
          ? `${lesson.title} foi concluída e a próxima aula está liberada.`
          : "Esta foi uma revisão. Seu progresso foi mantido sem alterar o XP."}
      </Text>

      <View style={styles.resultStats}>
        <View style={styles.resultStat}>
          <Text style={styles.resultStatIcon}>⚡</Text>
          <Text style={styles.resultStatValue}>
            {earnedXp > 0 ? `+${earnedXp}` : "0"}
          </Text>
          <Text style={styles.resultStatLabel}>
            {result.rewarded ? "XP líquido" : "revisão"}
          </Text>
        </View>
        <View style={styles.resultStatDivider} />
        <View style={styles.resultStat}>
          <Text style={styles.resultStatIcon}>🎯</Text>
          <Text style={styles.resultStatValue}>{result.percent}%</Text>
          <Text style={styles.resultStatLabel}>acertos</Text>
        </View>
        <View style={styles.resultStatDivider} />
        <View style={styles.resultStat}>
          <Text style={styles.resultStatIcon}>🔥</Text>
          <Text style={styles.resultStatValue}>{progress.streak}</Text>
          <Text style={styles.resultStatLabel}>sequência</Text>
        </View>
      </View>

      {result.rewarded && (
        <View style={styles.resultBreakdown}>
          <Text style={styles.resultBreakdownText}>
            Acertos +{result.correctCount * scoringRules.correct}
          </Text>
          <Text style={[styles.resultBreakdownText, { color: colors.errorText }]}>
            Erros {result.wrongCount * scoringRules.wrong}
          </Text>
          <Text style={styles.resultBreakdownText}>
            Conclusão +{scoringRules.completion}
          </Text>
          {result.hardBonus > 0 && (
            <Text
              style={[styles.resultBreakdownText, { color: colors.warningText }]}
            >
              Hard +{result.hardBonus}
            </Text>
          )}
          {result.perfect && (
            <Text
              style={[styles.resultBreakdownText, { color: colors.warningText }]}
            >
              Perfeito +{scoringRules.perfect}
            </Text>
          )}
          {result.dailyMissionBonus > 0 && (
            <Text style={[styles.resultBreakdownText, { color: colors.warningText }]}>
              Missões do dia +{result.dailyMissionBonus}
            </Text>
          )}
        </View>
      )}

      <View style={styles.resultBottom}>
        <Pressable
          onPress={onContinue}
          style={({ pressed }) => [
            styles.primaryButton,
            pressed && styles.pressed,
          ]}
        >
          <LinearGradient
            colors={gradients.primaryButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Text style={styles.primaryButtonText}>Continuar a trilha</Text>
          <Text style={styles.primaryButtonArrow}>→</Text>
        </Pressable>
      </View>
    </View>
  );
}

function increaseReadableFontSize(fontSize) {
  return Math.min(fontSize + 3, Math.max(11, Math.round(fontSize * 1.16)));
}

function createReadableStyles(styleDefinitions) {
  return Object.fromEntries(
    Object.entries(styleDefinitions).map(([styleName, style]) => {
      const scaledFontSize =
        typeof style.fontSize === "number"
          ? increaseReadableFontSize(style.fontSize)
          : null;
      const scaledLineHeight =
        typeof style.lineHeight === "number"
          ? Math.max(
              Math.round(style.lineHeight * 1.14),
              scaledFontSize ? Math.ceil(scaledFontSize * 1.22) : 0,
            )
          : null;

      return [
        styleName,
        {
          ...style,
          ...(scaledFontSize ? { fontSize: scaledFontSize } : {}),
          ...(scaledLineHeight ? { lineHeight: scaledLineHeight } : {}),
        },
      ];
    }),
  );
}

const styles = StyleSheet.create(
  createReadableStyles({
    app: { flex: 1, backgroundColor: palette.background },
    appLight: { backgroundColor: colors.backgroundLight },
    screen: {
      flex: 1,
      backgroundColor: "transparent",
      paddingTop: Platform.OS === "android" ? 44 : 58,
    },
    loadingScreen: {
      flex: 1,
      backgroundColor: colors.loadingBackgroundStart,
      alignItems: "center",
      overflow: "hidden",
      paddingHorizontal: 24,
    },
    onboardingScreen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    legalScreen: { flex: 1, backgroundColor: colors.background },
    legalHeader: {
      minHeight: 190,
      paddingTop: Platform.OS === "android" ? 50 : 64,
      paddingHorizontal: 22,
      paddingBottom: 24,
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 14,
    },
    legalBackButton: {
      width: 44,
      height: 44,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.white16,
      borderWidth: 1,
      borderColor: colors.white20,
    },
    legalBackButtonText: {
      color: colors.white,
      fontSize: 31,
      lineHeight: 33,
      marginTop: -3,
    },
    legalHeaderText: { flex: 1, paddingTop: 2 },
    legalEyebrow: {
      color: colors.logoYellow,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    legalTitle: {
      color: colors.white,
      fontSize: 29,
      lineHeight: 34,
      fontWeight: "900",
      marginTop: 10,
    },
    legalUpdated: { color: colors.onBrandSecondary, fontSize: 11, marginTop: 7 },
    legalContent: { padding: 20, paddingBottom: 46, gap: 13 },
    legalNotice: {
      padding: 14,
      borderRadius: 16,
      backgroundColor: colors.studyHintBackground,
      borderWidth: 1,
      borderColor: colors.logoGold,
    },
    legalNoticeText: {
      color: colors.warningText,
      fontSize: 12,
      lineHeight: 18,
      fontWeight: "800",
    },
    legalSection: {
      padding: 17,
      borderRadius: 19,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.card,
    },
    legalSectionTitle: {
      color: colors.text,
      fontSize: 15,
      lineHeight: 20,
      fontWeight: "900",
    },
    legalSectionText: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 21,
      marginTop: 8,
    },
    legalDoneButton: {
      minHeight: 56,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
      marginTop: 5,
      ...shadows.primary,
    },
    legalDoneButtonText: { color: colors.white, fontSize: 13, fontWeight: "900" },
    onboardingContent: {
      flexGrow: 1,
      paddingHorizontal: 22,
      paddingTop: Platform.OS === "android" ? 46 : 62,
      paddingBottom: 42,
    },
    onboardingContentStatic: { paddingBottom: 10 },
    onboardingGlowBlue: {
      position: "absolute",
      width: 320,
      height: 320,
      borderRadius: 160,
      top: -150,
      right: -140,
      backgroundColor: colors.logoBlueGlow,
      opacity: 0.18,
    },
    onboardingGlowPurple: {
      position: "absolute",
      width: 260,
      height: 260,
      borderRadius: 130,
      bottom: -125,
      left: -130,
      backgroundColor: colors.secondary18,
      opacity: 0.36,
    },
    loginScreenContent: {
      flex: 1,
      justifyContent: "flex-start",
      paddingTop: 0,
      paddingBottom: 28,
    },
    loginHero: {
      minHeight: 445,
      marginHorizontal: -22,
      // Give the login artwork and form more breathing room below the
      // status bar while keeping the hero full width.
      marginTop: Platform.OS === "android" ? -20 : -28,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      borderBottomLeftRadius: 19,
      borderBottomRightRadius: 19,
      overflow: "hidden",
      justifyContent: "center",
      position: "relative",
      ...shadows.primary,
    },
    loginHeroLayerOne: {
      position: "absolute",
      width: 310,
      height: 310,
      borderRadius: 58,
      top: -202,
      right: -118,
      backgroundColor: colors.primaryLight,
      opacity: 0.16,
      transform: [{ rotate: "34deg" }],
    },
    loginHeroLayerTwo: {
      position: "absolute",
      width: 260,
      height: 260,
      borderRadius: 46,
      bottom: -176,
      left: -112,
      backgroundColor: colors.logoBlue,
      opacity: 0.12,
      transform: [{ rotate: "-26deg" }],
    },
    loginBrandArea: {
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2,
    },
    loginBrandAreaRegister: {
      flexDirection: "row",
      alignSelf: "center",
      alignItems: "center",
      justifyContent: "flex-start",
    },
    loginOrbitOuter: {
      position: "absolute",
      width: 286,
      height: 286,
      borderRadius: 143,
      borderWidth: 1,
      borderColor: colors.white,
      opacity: 0.13,
      transform: [{ rotate: "-14deg" }, { scaleY: 0.72 }],
    },
    loginOrbitInner: {
      position: "absolute",
      width: 236,
      height: 236,
      borderRadius: 118,
      borderWidth: 1,
      borderColor: colors.primaryLight,
      opacity: 0.16,
      transform: [{ rotate: "18deg" }, { scaleY: 0.78 }],
    },
    loginBulbGlow: {
      position: "absolute",
      width: 168,
      height: 198,
      top: 22,
      left: "50%",
      marginLeft: -84,
      borderRadius: 92,
      backgroundColor: colors.logoYellow,
      shadowColor: colors.logoYellow,
      shadowOpacity: 0.82,
      shadowRadius: 34,
      shadowOffset: { width: 0, height: 0 },
    },
    loginBulb: {
      width: 320,
      height: 320,
    },
    loginBulbRegister: {
      width: 54,
      height: 54,
    },
    loginBrandNameRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: -48,
    },
    loginBrandNameRowRegister: {
      marginTop: 0,
      marginLeft: 6,
    },
    loginBrandTextRegister: {
      fontSize: 27,
      lineHeight: 32,
      letterSpacing: -1,
    },
    loginTagline: {
      width: "100%",
      color: colors.white,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "800",
      letterSpacing: 0.3,
      textAlign: "center",
      marginTop: 7,
      paddingHorizontal: 24,
      transform: [{ translateY: -10 }],
      textShadowColor: colors.ink,
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 4,
    },
    loginBrandStudy: {
      color: colors.white,
      fontSize: 27,
      lineHeight: 54,
      fontWeight: "900",
      letterSpacing: -2,
      textShadowColor: colors.ink,
      textShadowOffset: { width: 0, height: 3 },
      textShadowRadius: 10,
      
    },
    loginBrandCode: {
      color: colors.logoYellow,
      fontSize: 27,
      lineHeight: 54,
      fontWeight: "900",
      letterSpacing: -2,
      textShadowColor: colors.logoGold,
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 8,
    },
    loginCircuitLine: {
      position: "absolute",
      height: 2,
      borderRadius: 2,
      backgroundColor: colors.white,
      opacity: 0.13,
    },
    loginCircuitLineOne: {
      width: 190,
      left: -42,
      top: 94,
      transform: [{ rotate: "34deg" }],
    },
    loginCircuitLineTwo: {
      width: 230,
      right: -58,
      bottom: 112,
      transform: [{ rotate: "-38deg" }],
    },
    loginCircuitLineThree: {
      width: 128,
      right: 8,
      top: 70,
      transform: [{ rotate: "90deg" }],
    },
    loginCircuitLineFour: {
      width: 116,
      left: 18,
      bottom: 76,
      transform: [{ rotate: "-18deg" }],
    },
    loginCircuitNode: {
      position: "absolute",
      width: 10,
      height: 10,
      borderRadius: 5,
      backgroundColor: colors.primaryLight,
      borderWidth: 2,
      borderColor: colors.white,
      opacity: 0.55,
    },
    loginCircuitNodeOne: { left: 43, top: 124 },
    loginCircuitNodeTwo: { right: 45, bottom: 102 },
    loginCircuitNodeThree: {
      left: 54,
      bottom: 92,
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.logoYellow,
    },
    loginForm: {
      gap: 13,
      padding: 20,
      paddingTop: 25,
      borderRadius: 28,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.white,
      marginHorizontal: 14,
      marginTop: -56,
      zIndex: 4,
      ...shadows.card,
    },
    loginFormCompact: {
      gap: 9,
      padding: 14,
      paddingTop: 18,
      // Keep the form comfortably below the StudyCode wordmark on the
      // fixed login layout instead of letting it visually overlap the hero.
      marginTop: -26,
      borderRadius: 24,
    },
    loginFormRegister: {
      marginTop: -210,
      borderRadius: 24,
    },
    loginFormAccent: {
      alignSelf: "center",
      width: 54,
      height: 5,
      borderRadius: 4,
      backgroundColor: colors.logoYellow,
      marginTop: -13,
      marginBottom: 8,
      shadowColor: colors.logoGold,
      shadowOpacity: 0.42,
      shadowRadius: 7,
      shadowOffset: { width: 0, height: 2 },
      elevation: 3,
    },
    loginInputShell: {
      height: 62,
      paddingHorizontal: 17,
      borderRadius: 17,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    loginInputShellCompact: {
      height: 52,
      borderRadius: 15,
    },
    loginInputShellFocused: {
      borderColor: colors.primaryLight,
      borderWidth: 2,
      backgroundColor: colors.white,
      shadowColor: colors.primary,
      shadowOpacity: 0.16,
      shadowRadius: 9,
      shadowOffset: { width: 0, height: 4 },
      elevation: 3,
    },
    loginInputIcon: {
      width: 25,
      color: colors.primaryText,
      fontSize: 18,
      lineHeight: 22,
      textAlign: "center",
      fontWeight: "900",
    },
    loginInput: {
      flex: 1,
      height: "100%",
      color: colors.text,
      fontSize: 17,
      paddingVertical: 0,
    },
    loginPasswordToggle: {
      color: colors.primaryText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.6,
    },
    loginTermsRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      paddingHorizontal: 2,
      paddingTop: 2,
    },
    loginTermsCheck: {
      width: 25,
      height: 25,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 2,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    loginTermsCheckActive: {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    loginTermsCheckText: {
      color: colors.white,
      fontSize: 15,
      lineHeight: 17,
      fontWeight: "900",
    },
    loginTermsText: {
      flex: 1,
      color: colors.textSecondary,
      fontSize: 11,
      lineHeight: 18,
    },
    loginTermsLink: {
      color: colors.primaryText,
      fontWeight: "900",
      textDecorationLine: "underline",
    },
    loginMessage: {
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 13,
      backgroundColor: colors.error18,
      borderWidth: 1,
      borderColor: colors.error,
    },
    loginMessageText: {
      color: colors.errorText,
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "800",
      textAlign: "center",
    },
    loginButton: {
      minHeight: 60,
      marginTop: 8,
      borderRadius: 18,
      borderBottomWidth: 4,
      borderBottomColor: colors.logoGold,
    },
    loginButtonCompact: {
      minHeight: 52,
      marginTop: 3,
      borderRadius: 16,
    },
    loginButtonArrow: {
      position: "absolute",
      right: 20,
      color: colors.logoYellow,
      fontSize: 22,
      lineHeight: 24,
      fontWeight: "900",
    },
    loginPopularSection: {
      alignItems: "center",
      marginTop: 26,
    },
    loginPopularSectionCompact: { marginTop: 12 },
    loginPopularLabel: {
      color: colors.secondary,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.25,
    },
    loginPopularChips: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 8,
      marginTop: 10,
    },
    loginPopularChip: {
      minHeight: 38,
      paddingHorizontal: 8,
      paddingVertical: 5,
      borderRadius: 19,
      backgroundColor: colors.white20,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    loginPopularIcon: {
      width: 27,
      height: 27,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: colors.ink,
      shadowOpacity: 0.16,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    loginPopularIconText: {
      fontSize: 10,
      lineHeight: 12,
      fontWeight: "900",
    },
    loginPopularChipText: {
      color: colors.textSecondary,
      fontSize: 10,
      fontWeight: "800",
    },
    loginFooter: {
      color: colors.textMuted,
      fontSize: 9,
      letterSpacing: 0.8,
      textAlign: "center",
      marginTop: 24,
      marginBottom: 2,
    },
    loginFooterCompact: { marginTop: 10, marginBottom: 0 },
    onboardingTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    onboardingBrand: { flexDirection: "row", alignItems: "center" },
    onboardingBrandIcon: { width: 46, height: 46, borderRadius: 13 },
    onboardingBrandName: {
      color: colors.text,
      fontSize: 20,
      fontWeight: "900",
      marginLeft: 8,
    },
    onboardingBrandCode: {
      color: colors.logoTextYellow,
      fontSize: 20,
      fontWeight: "900",
    },
    onboardingStep: {
      color: colors.white,
      fontSize: 12,
      fontWeight: "900",
      letterSpacing: 1,
      paddingHorizontal: 12,
      paddingVertical: 7,
      borderRadius: 14,
      overflow: "hidden",
      backgroundColor: colors.primary,
    },
    onboardingHero: {
      minHeight: 176,
      borderRadius: 27,
      marginTop: 24,
      padding: 20,
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      ...shadows.primary,
    },
    onboardingHeroText: {
      flex: 1,
      paddingRight: 4,
    },
    onboardingHeroKicker: {
      color: colors.logoYellow,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    onboardingHeroTitle: {
      color: colors.white,
      fontSize: 26,
      lineHeight: 31,
      fontWeight: "900",
      marginTop: 10,
    },
    onboardingHeroSubtitle: {
      color: colors.onBrandSecondary,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 9,
    },
    onboardingHeroIcon: {
      width: 112,
      height: 112,
      marginRight: -14,
      marginLeft: 4,
    },
    onboardingProgressTrack: {
      height: 5,
      borderRadius: 4,
      backgroundColor: colors.white16,
      overflow: "hidden",
      marginTop: 20,
    },
    onboardingProgressFill: {
      height: "100%",
      borderRadius: 4,
      backgroundColor: colors.primaryLight,
    },
    onboardingPanel: {
      marginTop: 24,
      padding: 20,
      borderRadius: 27,
      backgroundColor: colors.white20,
      borderWidth: 1,
      borderColor: colors.white,
      ...shadows.card,
    },
    onboardingLoginBadge: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 14,
      backgroundColor: colors.studyHintBackground,
      borderWidth: 1,
      borderColor: colors.logoGold,
    },
    onboardingLoginBadgeDot: {
      color: colors.logoYellow,
      fontSize: 11,
      lineHeight: 12,
    },
    onboardingLoginBadgeText: {
      color: colors.logoTextYellow,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
    },
    onboardingEyebrow: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.45,
    },
    onboardingTitle: {
      color: colors.text,
      fontSize: 30,
      lineHeight: 36,
      fontWeight: "900",
      marginTop: 10,
    },
    onboardingDescription: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 20,
      marginTop: 12,
    },
    onboardingFieldLabel: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "800",
      marginTop: 25,
      marginBottom: 9,
    },
    onboardingInput: {
      height: 58,
      paddingHorizontal: 15,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      color: colors.text,
      fontSize: 15,
    },
    onboardingInputSecondary: { marginTop: 10 },
    onboardingBenefitRow: {
      flexDirection: "row",
      gap: 9,
      marginTop: 14,
    },
    onboardingBenefit: {
      flex: 1,
      minHeight: 62,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    onboardingBenefitIcon: {
      fontSize: 20,
      lineHeight: 23,
    },
    onboardingBenefitText: {
      color: colors.text,
      fontSize: 10,
      fontWeight: "900",
      marginTop: 3,
    },
    onboardingPrimaryButton: {
      minHeight: 56,
      borderRadius: 17,
      marginTop: 24,
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      flexDirection: "row",
      position: "relative",
      ...shadows.primary,
    },
    onboardingPrimaryButtonText: {
      color: colors.white,
      fontSize: 13,
      fontWeight: "900",
    },
    onboardingPrimaryButtonArrow: {
      position: "absolute",
      right: 18,
      color: colors.white,
      fontSize: 24,
    },
    onboardingPrivacyNote: {
      color: colors.textMuted,
      textAlign: "center",
      fontSize: 9,
      lineHeight: 14,
      marginTop: 17,
    },
    onboardingOptionGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 9,
    },
    onboardingOption: {
      width: "48%",
      minHeight: 74,
      padding: 11,
      borderRadius: 15,
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
    },
    onboardingOptionSelected: {
      backgroundColor: colors.primary18,
      borderColor: colors.primaryLight,
    },
    onboardingOptionTitle: {
      color: colors.text,
      fontSize: 11,
      fontWeight: "900",
    },
    onboardingOptionHelper: {
      color: colors.textSecondary,
      fontSize: 9,
      lineHeight: 13,
      marginTop: 6,
    },
    onboardingGoalGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 9,
    },
    onboardingGoal: {
      width: "48%",
      minHeight: 56,
      paddingHorizontal: 11,
      borderRadius: 15,
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
    },
    onboardingGoalSelected: {
      backgroundColor: colors.secondary18,
      borderColor: colors.secondaryLight,
    },
    onboardingGoalIcon: { color: colors.primaryText, fontSize: 18 },
    onboardingGoalLabel: {
      flex: 1,
      color: colors.text,
      fontSize: 10,
      fontWeight: "800",
    },
    onboardingPathRow: { gap: 10, paddingRight: 8 },
    onboardingPathCard: {
      width: 142,
      minHeight: 112,
      padding: 12,
      borderRadius: 16,
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
    },
    onboardingPathCardSelected: {
      backgroundColor: colors.primary18,
      borderColor: colors.primaryLight,
    },
    onboardingPathIcon: {
      color: colors.primaryText,
      fontSize: 18,
      fontWeight: "900",
    },
    onboardingPathTitle: {
      color: colors.text,
      fontSize: 11,
      fontWeight: "900",
      marginTop: 9,
    },
    onboardingPathText: {
      color: colors.textSecondary,
      fontSize: 8,
      lineHeight: 12,
      marginTop: 4,
    },
    onboardingCourseRow: { gap: 10, paddingRight: 8 },
    onboardingCourse: {
      width: 94,
      minHeight: 92,
      padding: 11,
      borderRadius: 15,
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
    },
    onboardingCourseSelected: {
      backgroundColor: colors.primary18,
      borderColor: colors.primaryLight,
    },
    onboardingCourseIcon: {
      width: 32,
      height: 32,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 8,
    },
    onboardingCourseTitle: {
      color: colors.text,
      fontSize: 10,
      fontWeight: "900",
    },
    onboardingCourseStatus: {
      color: colors.successText,
      fontSize: 8,
      marginTop: 4,
    },
    onboardingButtonRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      marginTop: 2,
    },
    onboardingBackButton: {
      width: 82,
      height: 56,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.white10,
      borderWidth: 1,
      borderColor: colors.border,
    },
    onboardingBackButtonText: {
      color: colors.textSecondary,
      fontSize: 11,
      fontWeight: "800",
    },
    onboardingFinishButton: { flex: 1, marginTop: 24 },
    loadingGoldGlow: {
      position: "absolute",
      width: 280,
      height: 280,
      borderRadius: 140,
      top: -118,
      right: -86,
      backgroundColor: colors.logoGlow,
      opacity: 0.45,
    },
    loadingBlueGlow: {
      position: "absolute",
      width: 360,
      height: 360,
      borderRadius: 180,
      bottom: 54,
      left: -190,
      backgroundColor: colors.logoBlueGlow,
      opacity: 0.45,
    },
    loadingTopStatus: {
      position: "absolute",
      top: Platform.OS === "android" ? 58 : 72,
      left: 24,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 11,
      paddingVertical: 7,
      borderRadius: 14,
      backgroundColor: colors.navy84,
      borderWidth: 1,
      borderColor: colors.logoBlueGlow,
    },
    loadingLiveDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      marginRight: 7,
      backgroundColor: colors.success,
      shadowColor: colors.success,
      shadowOpacity: 0.9,
      shadowRadius: 8,
      elevation: 5,
    },
    loadingTopStatusText: {
      color: colors.logoYellow,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    loadingMain: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 24,
      right: 24,
      alignItems: "center",
      justifyContent: "center",
    },
    loadingBrandRow: {
      width: "100%",
      minHeight: 154,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    loadingBulbArt: { width: 200, height: 200 },
    loadingBrandTextWrap: {
      minWidth: 250,
      marginLeft: -50,
      flexDirection: "row",
      alignItems: "center",
    },
    loadingBrandText: {
      color: colors.loadingText,
      fontSize: 40,
      lineHeight: 34,
      fontWeight: "900",
      letterSpacing: -1.3,
    },
    loadingBrandCodeText: { color: colors.logoGold },
    loadingBrandCursor: {
      color: colors.logoGold,
      fontSize: 29,
      lineHeight: 34,
      fontWeight: "900",
      marginLeft: 2,
    },
    loadingTitle: {
      maxWidth: 310,
      color: colors.loadingText,
      fontSize: 25,
      lineHeight: 31,
      textAlign: "center",
      fontWeight: "900",
      marginTop: 14,
      letterSpacing: -0.8,
    },

    loadingDock: {
      position: "absolute",
      left: 24,
      right: 24,
      bottom: Platform.OS === "android" ? 48 : 62,
      padding: 17,
      borderRadius: 21,
      backgroundColor: colors.loadingPanel,
      borderWidth: 1,
      borderColor: colors.loadingPanelBorder,
      ...shadows.card,
    },
    loadingDockHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 11,
    },
    loadingDockLabel: {
      color: colors.loadingText,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    loadingDockPercent: {
      color: colors.logoYellow,
      fontSize: 9,
      fontWeight: "900",
    },
    loadingProgressTrack: {
      height: 5,
      borderRadius: 4,
      overflow: "hidden",
      backgroundColor: colors.white12,
    },
    loadingProgressFill: {
      height: "100%",
      borderRadius: 4,
      backgroundColor: colors.logoYellow,
      shadowColor: colors.logoYellow,
      shadowOpacity: 0.9,
      shadowRadius: 8,
    },
    loadingDockHint: {
      color: colors.loadingTextMuted,
      fontSize: 10,
      marginTop: 10,
    },
    loadingMascot: {
      position: "absolute",
      width: 112,
      height: 145,
      right: -12,
      bottom: 104,
    },
    auroraGlowCyan: {
      position: "absolute",
      top: -150,
      right: -170,
      backgroundColor: colors.auroraCyanGlow,
    },
    auroraGlowPurple: {
      position: "absolute",
      left: -190,
      backgroundColor: colors.auroraPurpleGlow,
    },
    auroraDot: {
      position: "absolute",
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: colors.auroraHighlight,
    },
    auroraDotSmall: {
      width: 3,
      height: 3,
      borderRadius: 2,
    },
    scrollContent: {
      paddingTop: 0,
      paddingHorizontal: 20,
      paddingBottom: 42,
    },
    topBar: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    homeTopPanel: {
      marginHorizontal: -20,
      overflow: "visible",
    },
    homeStudyHeader: {
      paddingHorizontal: 20,
      paddingTop: Platform.OS === "android" ? 60 : 70,
      paddingBottom: 87,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      borderBottomWidth: 0,
      shadowColor: colors.ink,
      shadowOpacity: 0.28,
      shadowRadius: 14,
      shadowOffset: { width: 0, height: 7 },
      elevation: 4,
      zIndex: 0,
    },
    homeHeaderDropShadow: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: -28,
      height: 28,
    },
    homeStudyHeaderRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    homeMenuButton: {
      width: 49,
      height: 49,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.transparent,
      borderWidth: 0,
    },
    homeMenuButtonText: {
      color: colors.white,
      fontSize: 45,
      lineHeight: 36,
      marginTop: -7,
    },
    homeGreetingBlock: { flex: 1 },
    homeGreeting: {
      color: colors.white,
      fontSize: 23,
      lineHeight: 29,
      fontWeight: "900",
      letterSpacing: -0.35,
    },
    homeGreetingAccent: { fontSize: 19 },
    homeGreetingSubtitle: {
      color: colors.onBrandSecondary,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 2,
    },
    homeStreakButton: {
      minWidth: 70,
      height: 39,
      paddingHorizontal: 15,
      borderRadius: 15,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,
      backgroundColor: colors.transparent,
      borderWidth: 0,
    },
    homeStreakIcon: { fontSize: 28 },
    homeStreakValue: {
      color: colors.white,
      fontSize: 19,
      fontWeight: "900",
    },
    brandHeader: {
      marginHorizontal: -20,
      paddingHorizontal: 20,
      paddingVertical: 9,
      borderBottomWidth: 1,
      borderBottomColor: colors.primaryLight,
    },
    brandRow: {
      height: 54,
      width: 190,
      flexDirection: "row",
      alignItems: "center",
    },
    brandIcon: { width: 50, height: 50 },
    brandName: {
      color: colors.white,
      fontSize: 19,
      fontWeight: "900",
      letterSpacing: -0.7,
      marginLeft: 3,
    },
    brandNameAccent: { color: colors.logoYellow },
    avatar: {
      width: 46,
      height: 46,
      borderRadius: 23,
      backgroundColor: colors.white12,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    avatarText: { color: colors.primaryText, fontWeight: "800" },
    avatarImage: {
      width: "100%",
      height: "100%",
      borderRadius: 23,
    },
    avatarModalBackdrop: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: colors.imageOverlayBottom,
    },
    avatarMenu: {
      width: "100%",
      maxWidth: 520,
      maxHeight: "94%",
      alignSelf: "center",
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: colors.background,
      overflow: "hidden",
    },
    profileScrollContent: { paddingBottom: 30 },
    avatarMenuHero: {
      paddingTop: Platform.OS === "android" ? 24 : 32,
      paddingHorizontal: 20,
      paddingBottom: 43,
    },
    avatarMenuHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
    },
    avatarMenuAvatarRing: {
      width: 72,
      height: 72,
      borderRadius: 36,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.logoYellow,
      borderWidth: 3,
      borderColor: colors.white,
    },
    avatarMenuAvatar: {
      width: 62,
      height: 62,
      borderRadius: 31,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      overflow: "hidden",
    },
    avatarMenuAvatarText: {
      color: colors.primaryText,
      fontSize: 22,
      fontWeight: "900",
    },
    avatarMenuAvatarImage: {
      width: "100%",
      height: "100%",
      borderRadius: 31,
    },
    avatarMenuEyebrow: {
      color: colors.logoYellow,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    avatarMenuTitle: {
      color: colors.white,
      fontSize: 20,
      fontWeight: "900",
      marginTop: 3,
    },
    avatarMenuSubtitle: {
      color: colors.onBrandSecondary,
      fontSize: 11,
      fontWeight: "700",
      marginTop: 3,
    },
    avatarMenuClose: {
      width: 36,
      height: 36,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.white14,
      borderWidth: 1,
      borderColor: colors.white12,
    },
    avatarMenuCloseText: {
      color: colors.white,
      fontSize: 25,
      lineHeight: 26,
      marginTop: -2,
    },
    avatarMenuStats: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: -25,
      marginHorizontal: 16,
      paddingVertical: 16,
      borderRadius: 21,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.card,
    },
    avatarMenuStat: { flex: 1, alignItems: "center" },
    avatarMenuStatKicker: {
      color: colors.primaryText,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 1,
      marginBottom: 3,
    },
    avatarMenuStatValue: {
      color: colors.text,
      fontSize: 19,
      fontWeight: "900",
    },
    avatarMenuStatLabel: {
      color: colors.textMuted,
      fontSize: 9,
      marginTop: 4,
    },
    avatarMenuStatDivider: {
      width: 1,
      height: 38,
      backgroundColor: colors.border,
    },
    profileActionRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 16,
      marginHorizontal: 16,
    },
    avatarMenuOption: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      padding: 12,
      minHeight: 72,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.card,
    },
    profilePreferenceRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 10,
      marginHorizontal: 16,
    },
    avatarMenuOptionIcon: {
      width: 36,
      height: 36,
      borderRadius: 12,
      backgroundColor: colors.logoYellow,
      color: colors.ink,
      textAlign: "center",
      fontSize: 8,
      lineHeight: 36,
      fontWeight: "900",
    },
    avatarMenuOptionTitle: {
      color: colors.text,
      fontSize: 11,
      fontWeight: "900",
    },
    avatarMenuOptionText: {
      color: colors.textSecondary,
      fontSize: 8,
      marginTop: 3,
    },
    avatarMenuOptionArrow: {
      color: colors.primaryText,
      fontSize: 23,
    },
    themeSwitch: {
      width: 38,
      height: 22,
      padding: 3,
      borderRadius: 12,
      justifyContent: "center",
      backgroundColor: colors.border,
    },
    themeSwitchActive: { backgroundColor: colors.primary },
    themeSwitchThumb: {
      width: 16,
      height: 16,
      borderRadius: 8,
      backgroundColor: colors.textMuted,
    },
    themeSwitchThumbActive: {
      alignSelf: "flex-end",
      backgroundColor: colors.white,
    },
    avatarMenuAction: {
      flex: 1.18,
      minHeight: 108,
      justifyContent: "flex-end",
      padding: 15,
      borderRadius: 20,
      overflow: "hidden",
      ...shadows.card,
    },
    avatarMenuActionIcon: {
      position: "absolute",
      right: 14,
      top: 13,
      width: 34,
      height: 34,
      borderRadius: 17,
      color: colors.white,
      backgroundColor: colors.white14,
      textAlign: "center",
      fontSize: 23,
      lineHeight: 33,
    },
    avatarMenuActionTitle: {
      color: colors.white,
      fontSize: 16,
      fontWeight: "900",
    },
    avatarMenuActionText: {
      color: colors.onBrandSecondary,
      fontSize: 9,
      marginTop: 3,
    },
    avatarMenuDashboardAction: {
      flex: 0.82,
      minHeight: 108,
      justifyContent: "flex-end",
      padding: 15,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.card,
    },
    avatarMenuDashboardIcon: {
      position: "absolute",
      right: 14,
      top: 13,
      color: colors.primaryText,
      fontSize: 24,
      fontWeight: "900",
    },
    avatarMenuDashboardTitle: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "900",
    },
    avatarMenuDashboardText: {
      color: colors.textSecondary,
      fontSize: 9,
      marginTop: 3,
    },
    profileSectionHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 24,
      marginBottom: 10,
      marginHorizontal: 16,
    },
    profileSectionTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "900",
    },
    profileSectionMeta: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
    profileCurrentCourse: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginHorizontal: 16,
      padding: 14,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
      ...shadows.card,
    },
    profileCourseIcon: {
      width: 42,
      height: 42,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    profileCurrentCourseTitle: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "900",
    },
    profileCurrentCourseText: {
      color: colors.textSecondary,
      fontSize: 9,
      marginTop: 4,
    },
    profileCourseProgressTrack: {
      height: 5,
      marginTop: 9,
      borderRadius: 3,
      backgroundColor: colors.white14,
      overflow: "hidden",
    },
    profileCourseProgressFill: {
      height: "100%",
      borderRadius: 3,
    },
    profileChevron: { color: colors.primaryText, fontSize: 26 },
    profilePathRow: { gap: 9, paddingHorizontal: 16 },
    profilePathCard: {
      width: 132,
      minHeight: 102,
      padding: 11,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.card,
    },
    profilePathCardSelected: {
      backgroundColor: colors.primary18,
      borderColor: colors.primaryLight,
    },
    profilePathIcon: {
      color: colors.primaryText,
      fontSize: 17,
      fontWeight: "900",
    },
    profilePathTitle: {
      color: colors.text,
      fontSize: 10,
      fontWeight: "900",
      marginTop: 8,
    },
    profilePathText: {
      color: colors.textMuted,
      fontSize: 8,
      lineHeight: 11,
      marginTop: 4,
    },
    profileLanguageRow: { gap: 9, paddingHorizontal: 16 },
    profileLanguageCard: {
      width: 94,
      minHeight: 102,
      padding: 11,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.card,
    },
    profileLanguageLocked: { opacity: 0.52 },
    profileLanguageIcon: {
      width: 34,
      height: 34,
      borderRadius: 11,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 9,
    },
    profileLanguageName: {
      color: colors.text,
      fontSize: 10,
      fontWeight: "800",
    },
    profileLanguageStatus: {
      color: colors.textMuted,
      fontSize: 8,
      marginTop: 4,
    },
    profileAchievementGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginHorizontal: 16,
    },
    profileAchievement: {
      width: "47%",
      minHeight: 104,
      padding: 11,
      borderRadius: 16,
      backgroundColor: colors.secondary18,
      borderWidth: 1,
      borderColor: colors.secondaryLight,
      position: "relative",
    },
    profileAchievementLocked: {
      backgroundColor: colors.navy86,
      borderColor: colors.border,
      opacity: 0.56,
    },
    profileAchievementIcon: {
      color: colors.warningText,
      fontSize: 22,
      fontWeight: "900",
    },
    profileAchievementTitle: {
      color: colors.text,
      fontSize: 10,
      fontWeight: "900",
      marginTop: 7,
    },
    profileAchievementDetail: {
      color: colors.textSecondary,
      fontSize: 8,
      marginTop: 3,
    },
    profileAchievementDot: {
      position: "absolute",
      right: 10,
      top: 12,
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.textDisabled,
    },
    profileAchievementDotUnlocked: {
      backgroundColor: colors.success,
      shadowColor: colors.success,
      shadowOpacity: 0.8,
      shadowRadius: 6,
    },
    profileSettingsCard: {
      marginHorizontal: 16,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
      ...shadows.card,
    },
    profileSettingsRow: {
      minHeight: 72,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      paddingHorizontal: 14,
      paddingVertical: 11,
      borderBottomWidth: 1,
      borderBottomColor: colorWithAlpha(colors.border, 0.55),
    },
    profileSettingsRowLast: { borderBottomWidth: 0 },
    profileSettingsIconWrap: {
      width: 38,
      height: 38,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.logoYellow,
    },
    profileSettingsIcon: {
      color: colors.ink,
      fontSize: 8,
      fontWeight: "900",
    },
    profileSettingsTitle: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "900",
    },
    profileSettingsDetail: {
      color: colors.textSecondary,
      fontSize: 9,
      marginTop: 3,
    },
    profileSettingsArrow: {
      color: colors.primaryText,
      fontSize: 26,
      fontWeight: "700",
    },
    profileDetailBackdrop: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: colors.imageOverlayBottom,
    },
    profileDetailSheet: {
      width: "100%",
      maxWidth: 520,
      maxHeight: "88%",
      alignSelf: "center",
      paddingHorizontal: 20,
      paddingTop: 10,
      paddingBottom: Platform.OS === "ios" ? 34 : 24,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      backgroundColor: colors.surface,
      ...shadows.card,
    },
    profileDetailHandle: {
      width: 46,
      height: 5,
      borderRadius: 3,
      alignSelf: "center",
      backgroundColor: colors.border,
      marginBottom: 17,
    },
    profileDetailHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      marginBottom: 20,
    },
    profileDetailEyebrow: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    profileDetailTitle: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "900",
      marginTop: 3,
    },
    profileDetailClose: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
    },
    profileDetailCloseText: {
      color: colors.text,
      fontSize: 25,
      lineHeight: 26,
      marginTop: -2,
    },
    profileEditForm: { gap: 8 },
    profileFieldLabel: {
      color: colors.textSecondary,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
      marginTop: 4,
    },
    profileFieldInput: {
      minHeight: 54,
      paddingHorizontal: 15,
      borderRadius: 16,
      color: colors.text,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      fontSize: 13,
    },
    profileSaveButton: {
      minHeight: 54,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 17,
      overflow: "hidden",
      marginTop: 12,
      ...shadows.primary,
    },
    profileSaveButtonText: {
      color: colors.white,
      fontSize: 13,
      fontWeight: "900",
    },
    profileMissionList: { gap: 10 },
    profileMissionItem: {
      minHeight: 74,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 13,
      borderRadius: 18,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
    },
    profileMissionStatus: {
      width: 40,
      height: 40,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surfaceElevated,
    },
    profileMissionStatusDone: { backgroundColor: colors.success },
    profileMissionStatusText: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "900",
    },
    profileMissionTitle: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "900",
    },
    profileMissionTrack: {
      height: 5,
      borderRadius: 3,
      overflow: "hidden",
      backgroundColor: colors.surfaceElevated,
      marginTop: 8,
    },
    profileMissionFill: {
      height: "100%",
      borderRadius: 3,
      backgroundColor: colors.primary,
    },
    profileMissionValue: {
      minWidth: 34,
      color: colors.primaryText,
      fontSize: 11,
      fontWeight: "900",
      textAlign: "right",
    },
    profileDetailFootnote: {
      color: colors.textSecondary,
      fontSize: 10,
      lineHeight: 15,
      textAlign: "center",
      marginTop: 4,
    },
    profileCertificateScroll: { maxHeight: 470 },
    profileCertificateItem: {
      minHeight: 72,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 12,
      borderRadius: 18,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      marginBottom: 10,
    },
    profileCertificateItemDone: {
      borderColor: colors.success,
      backgroundColor: colors.success18,
    },
    profileCertificateIcon: {
      width: 43,
      height: 43,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
    },
    profileCertificateTitle: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "900",
    },
    profileCertificateText: {
      color: colors.textSecondary,
      fontSize: 9,
      marginTop: 3,
    },
    profileCertificatePercent: {
      color: colors.textMuted,
      fontSize: 11,
      fontWeight: "900",
    },
    profileCertificatePercentDone: {
      color: colors.successText,
      fontSize: 18,
    },
    profileVersion: {
      color: colors.textMuted,
      textAlign: "center",
      fontSize: 9,
      marginTop: 22,
      paddingHorizontal: 16,
    },
    greetingBlock: { marginTop: 40, marginBottom: 24 },
    kicker: {
      color: colors.primaryText,
      fontSize: 12,
      fontWeight: "800",
      letterSpacing: 1.6,
      marginBottom: 10,
    },
    heroTitle: {
      color: palette.text,
      fontSize: 34,
      lineHeight: 40,
      fontWeight: "800",
      letterSpacing: -1.4,
    },
    statsRow: { flexDirection: "row", gap: 10 },
    statsBand: {
      position: "relative",
      zIndex: 2,
      elevation: 12,
      paddingHorizontal: 20,
      marginTop: -65,
      paddingTop: 0,
      paddingBottom: 20,
    },
    statCard: {
      flex: 1,
      minHeight: 106,
      borderRadius: 20,
      padding: 13,
      backgroundColor: colors.white,
      borderWidth: 0,
      borderColor: colors.transparent,
      overflow: "hidden",
      ...shadows.card,
    },
    sunCornerGlowTopRight: {
      position: "absolute",
      width: 190,
      height: 160,
      borderRadius: 95,
      top: -78,
      right: -70,
    },
    sunCornerGlowCompact: {
      position: "absolute",
      width: 112,
      height: 96,
      borderRadius: 56,
      top: -48,
      right: -42,
    },
    statIcon: { fontSize: 17, marginBottom: 8 },
    statValue: { fontSize: 20, fontWeight: "900" },
    statLabel: { color: palette.muted, fontSize: 12, marginTop: 3 },
    sectionHeading: {
      marginTop: 34,
      marginBottom: 14,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
    },
    sectionHeadingCompact: { marginTop: 32, marginBottom: 14 },
    sectionEyebrow: {
      color: palette.muted,
      fontSize: 9,
      fontWeight: "800",
      letterSpacing: 1.4,
      marginBottom: 6,
    },
    sectionTitle: {
      color: palette.text,
      fontSize: 21,
      fontWeight: "800",
      letterSpacing: -0.6,
    },
    smallLink: { color: colors.primaryText, fontSize: 13, fontWeight: "700" },
    featureCard: {
      minHeight: 216,
      borderRadius: 26,
      backgroundColor: colors.primary,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 20,
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "flex-start",
      ...shadows.primary,
    },
    reactSymbolOrbit: {
      position: "absolute",
      borderWidth: 2,
    },
    reactSymbolCore: { position: "absolute" },
    nextSymbol: {
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
    },
    nextSymbolText: {
      fontSize: 25,
      fontWeight: "900",
      letterSpacing: -2,
    },
    nextSymbolSlash: {
      position: "absolute",
      width: 2,
      height: "90%",
      transform: [{ rotate: "-28deg" }],
    },
    nodeSymbol: {
      fontWeight: "900",
      lineHeight: 30,
    },
    courseBadgeLarge: {
      width: 68,
      height: 68,
      borderRadius: 20,
      backgroundColor: colors.logoBlue,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 15,
    },
    courseBadgeLargeText: {
      color: colors.white,
      fontSize: 18,
      fontWeight: "900",
    },
    featureContent: { flex: 1 },
    pill: {
      alignSelf: "flex-start",
      backgroundColor: colors.cyan16,
      borderRadius: 20,
      paddingHorizontal: 9,
      paddingVertical: 5,
      marginBottom: 12,
    },
    pillText: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
    },
    featureTitle: {
      color: palette.text,
      fontSize: 23,
      fontWeight: "900",
      letterSpacing: -0.7,
    },
    featureSubtitle: {
      color: colors.textSecondary,
      fontSize: 14,
      marginTop: 4,
      marginBottom: 22,
    },
    progressTrack: {
      height: 7,
      borderRadius: 5,
      backgroundColor: colors.white12,
      overflow: "hidden",
    },
    progressFill: {
      height: "100%",
      borderRadius: 5,
      backgroundColor: palette.purpleLight,
    },
    progressLabels: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 8,
    },
    progressText: { color: colors.textSecondary, fontSize: 11 },
    progressTextStrong: {
      color: palette.text,
      fontSize: 11,
      fontWeight: "800",
    },
    roundArrow: {
      position: "absolute",
      right: 17,
      bottom: 17,
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: palette.purple,
      alignItems: "center",
      justifyContent: "center",
    },
    roundArrowText: {
      color: colors.white,
      fontSize: 27,
      lineHeight: 29,
      marginTop: -2,
    },
    courseCarousel: { gap: 11, paddingRight: 18 },
    courseMiniCard: {
      width: 126,
      height: 140,
      padding: 15,
      borderRadius: 21,
      backgroundColor: colors.navy84,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
    },
    courseBadge: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 15,
    },
    courseBadgeText: { fontSize: 14, fontWeight: "900" },
    courseMiniTitle: { color: palette.text, fontSize: 16, fontWeight: "800" },
    comingText: {
      color: palette.muted,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1,
      marginTop: 6,
    },
    dailyCard: {
      marginTop: 28,
      padding: 18,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      gap: 14,
      alignItems: "center",
      overflow: "hidden",
    },
    dailyIcon: { fontSize: 28 },
    dailyTitle: { color: palette.text, fontWeight: "800", fontSize: 16 },
    dailyText: {
      color: palette.muted,
      fontSize: 13,
      lineHeight: 18,
      marginTop: 3,
    },
    pressed: { opacity: 0.76, transform: [{ scale: 0.99 }] },
    screenHeader: {
      height: 58,
      paddingHorizontal: 18,
      flexDirection: "row",
      alignItems: "center",
    },
    backButton: {
      width: 40,
      height: 40,
      borderRadius: 14,
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
      alignItems: "center",
      justifyContent: "center",
    },
    backButtonText: {
      color: palette.text,
      fontSize: 31,
      lineHeight: 32,
      marginTop: -3,
    },
    screenHeaderTitle: {
      flex: 1,
      color: palette.text,
      fontSize: 16,
      fontWeight: "800",
      marginHorizontal: 12,
    },
    headerRight: { minWidth: 44, alignItems: "flex-end" },
    xpChip: {
      backgroundColor: colors.primary18,
      paddingHorizontal: 10,
      paddingVertical: 7,
      borderRadius: 13,
    },
    xpChipText: { color: colors.warningText, fontSize: 12, fontWeight: "900" },
    courseScreenContent: {
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 50,
    },
    courseHero: {
      flexDirection: "row",
      gap: 16,
      alignItems: "center",
      marginBottom: 22,
    },
    courseHeroBadge: {
      width: 66,
      height: 66,
      borderRadius: 21,
      backgroundColor: palette.yellow,
      alignItems: "center",
      justifyContent: "center",
    },
    courseHeroBadgeText: { color: colors.ink, fontSize: 21, fontWeight: "900" },
    courseHeroTitle: {
      color: palette.text,
      fontSize: 26,
      fontWeight: "900",
      letterSpacing: -0.7,
    },
    courseHeroSubtitle: {
      color: palette.muted,
      fontSize: 13,
      lineHeight: 18,
      marginTop: 3,
    },
    pathSummary: {
      backgroundColor: colors.surface,
      padding: 17,
      borderRadius: 19,
      borderWidth: 1,
      borderColor: colors.logoGold,
      marginBottom: 30,
    },
    pathSummaryText: {
      color: palette.muted,
      fontSize: 10,
      fontWeight: "800",
      letterSpacing: 1.2,
    },
    pathSummaryValue: {
      color: palette.text,
      fontSize: 14,
      fontWeight: "700",
      marginTop: 5,
      marginBottom: 12,
    },
    pathTrack: { height: 6, borderRadius: 4, backgroundColor: palette.line },
    pathFill: {
      height: "100%",
      borderRadius: 4,
      backgroundColor: colors.logoGold,
    },
    rewardInfoCard: {
      marginTop: -14,
      marginBottom: 30,
      padding: 16,
      borderRadius: 19,
      backgroundColor: colors.studyHintBackground,
      borderWidth: 2,
      borderColor: colors.logoGold,
      ...shadows.card,
    },
    loginFormTitle: {
      color: colors.text,
      fontSize: 21,
      lineHeight: 26,
      fontWeight: "900",
      textAlign: "center",
    },
    loginFormSubtitle: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
      marginTop: -7,
      marginBottom: 2,
    },
    loginModeSwitch: {
      minHeight: 48,
      padding: 4,
      borderRadius: 16,
      backgroundColor: colors.surface,
      flexDirection: "row",
      gap: 4,
    },
    loginModeOption: {
      flex: 1,
      minHeight: 40,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    loginModeOptionActive: { backgroundColor: colors.primary, ...shadows.card },
    loginModeOptionText: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: "900",
    },
    loginAlternativeButton: {
      minHeight: 34,
      alignItems: "center",
      justifyContent: "center",
      marginTop: -4,
    },
    loginAlternativeText: {
      color: colors.primaryText,
      fontSize: 11,
      fontWeight: "900",
      textAlign: "center",
    },
    loginModeOptionTextActive: { color: colors.white },
    rewardInfoHeader: { flexDirection: "row", alignItems: "center", gap: 12 },
    rewardInfoIcon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      backgroundColor: colors.logoYellow,
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 23,
    },
    rewardInfoTitle: { color: colors.warningText, fontSize: 15, fontWeight: "900" },
    rewardInfoText: {
      color: colors.text,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 3,
    },
    rewardRulesRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 14,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: colors.logoGold,
    },
    rewardPositive: { color: colors.successText, fontSize: 11, fontWeight: "800" },
    rewardNegative: { color: colors.errorText, fontSize: 11, fontWeight: "800" },
    rewardBonus: { color: colors.warningText, fontSize: 11, fontWeight: "800" },
    moduleBlock: { position: "relative" },
    moduleHeadingRow: {
      position: "relative",
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      marginBottom: 13,
      borderRadius: 21,
      padding: 15,
      backgroundColor: colors.navy86,
      borderWidth: 1,
      borderColor: colors.border,
    },
    moduleHeadingAccent: {
      position: "absolute",
      width: 4,
      top: 0,
      bottom: 0,
      left: 0,
    },
    moduleNumber: {
      width: 44,
      height: 44,
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
    },
    moduleNumberText: { color: colors.white, fontWeight: "900", fontSize: 14 },
    moduleStatusLabel: {
      color: colors.primaryText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.1,
      marginBottom: 4,
    },
    moduleTitle: { color: palette.text, fontSize: 17, fontWeight: "800" },
    moduleDescription: { color: palette.muted, fontSize: 12, marginTop: 2 },
    moduleLockHint: {
      color: colors.primaryText,
      fontSize: 11,
      fontWeight: "700",
      marginTop: 5,
    },
    lessonRowWrap: { position: "relative" },
    lessonConnector: {
      position: "absolute",
      left: 20,
      top: 58,
      bottom: -10,
      width: 2,
      backgroundColor: palette.line,
    },
    lessonRow: {
      position: "relative",
      overflow: "hidden",
      minHeight: 82,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.navy86,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 20,
      padding: 13,
      marginBottom: 11,
      ...shadows.card,
    },
    lessonRowActiveRail: {
      position: "absolute",
      left: 0,
      top: 17,
      bottom: 17,
      width: 3,
      borderRadius: 3,
      backgroundColor: colors.primaryLight,
    },
    lessonRowCompleted: {
      backgroundColor: colors.navy88,
    },
    lessonRowLocked: { opacity: 0.47 },
    lessonStatus: {
      width: 38,
      height: 38,
      borderRadius: 13,
      backgroundColor: palette.line,
      alignItems: "center",
      justifyContent: "center",
    },
    lessonStatusActive: { backgroundColor: colors.primaryLight },
    lessonStatusComplete: { backgroundColor: palette.green },
    lessonStatusText: { color: colors.white, fontWeight: "900", fontSize: 13 },
    lessonSequence: {
      color: colors.textMuted,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1,
      marginBottom: 4,
    },
    lessonTitle: { color: palette.text, fontSize: 15, fontWeight: "800" },
    lessonMetaRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 5,
    },
    lessonMeta: { color: palette.muted, fontSize: 11 },
    lessonReward: { color: colors.warningText, fontSize: 11, fontWeight: "800" },
    lessonArrow: { color: colors.primaryText, fontSize: 28 },
    textMuted: { color: colors.textDisabled },
    moduleDivider: {
      height: 1,
      backgroundColor: palette.line,
      marginVertical: 24,
    },
    lessonCounter: { color: palette.muted, fontSize: 13, fontWeight: "800" },
    quizHeaderRight: { alignItems: "flex-end", gap: 4 },
    focusChipGroup: { flexDirection: "row", alignItems: "center", gap: 4 },
    focusChipLabel: {
      color: colors.primaryText,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 0.7,
      marginRight: 2,
    },
    focusChip: {
      width: 10,
      height: 6,
      borderRadius: 4,
      backgroundColor: colors.border,
    },
    focusChipActive: { backgroundColor: colors.logoYellow },
    focusChipWarning: { backgroundColor: colors.error },
    focusResetMessage: {
      color: colors.errorText,
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "800",
      marginBottom: 6,
    },
    lessonProgressTrack: { height: 4, backgroundColor: palette.line },
    lessonProgressFill: {
      height: "100%",
      backgroundColor: colors.primaryLight,
    },
    quizProgressFill: { height: "100%", backgroundColor: palette.green },
    lessonContent: {
      flexGrow: 1,
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 34,
    },
    lessonHero: {
      minHeight: 196,
      borderRadius: 28,
      overflow: "hidden",
      padding: 22,
      position: "relative",
      justifyContent: "center",
      ...shadows.primary,
    },
    lessonHeroGlow: {
      position: "absolute",
      width: 220,
      height: 220,
      borderRadius: 110,
      right: -104,
      top: -70,
      backgroundColor: colors.primaryLight,
      opacity: 0.24,
    },
    lessonHeroCopy: {
      width: "100%",
      zIndex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    lessonHeroTag: {
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      borderRadius: 14,
      backgroundColor: colors.white20,
      paddingHorizontal: 12,
      paddingVertical: 7,
      marginBottom: 15,
    },
    lessonHeroTagDot: {
      width: 5,
      height: 5,
      borderRadius: 3,
      backgroundColor: colors.gold,
      marginRight: 6,
    },
    lessonHeroTagText: {
      color: colors.text,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.9,
    },
    lessonEyebrow: {
      color: colors.white,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.6,
      marginBottom: 9,
      textAlign: "center",
      opacity: 0.92,
    },
    lessonPageTitle: {
      width: "100%",
      color: colors.white,
      fontSize: 28,
      lineHeight: 34,
      fontWeight: "900",
      letterSpacing: -0.9,
      textAlign: "center",
      textShadowColor: "rgba(0,0,0,0.18)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    lessonHeroByte: {
      position: "absolute",
      width: 150,
      height: 182,
      right: -20,
      bottom: -17,
    },
    lessonExplanationCard: {
      marginTop: 12,
      padding: 12,
      borderRadius: 17,
      backgroundColor: colors.white20,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.card,
    },
    lessonExplanationHeader: {
      alignSelf: "center",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 6,
      marginBottom: 8,
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 10,
      backgroundColor: colors.white16,
    },
    lessonExplanationDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.logoGold,
    },
    lessonExplanationEyebrow: {
      color: colors.primaryText,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 1,
      textAlign: "center",
    },
    lessonBody: {
      color: colors.text,
      fontSize: 14,
      lineHeight: 21,
      fontWeight: "500",
    },
    lessonReadingGuide: {
      marginTop: 9,
      paddingHorizontal: 9,
      paddingVertical: 8,
      borderRadius: 11,
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 7,
      backgroundColor: colors.studyHintBackground,
      borderLeftWidth: 3,
      borderLeftColor: colors.logoYellow,
    },
    lessonReadingGuideIcon: {
      flexShrink: 0,
      color: colors.warningText,
      fontSize: 13,
      lineHeight: 16,
      fontWeight: "900",
    },
    lessonReadingGuideText: {
      flex: 1,
      minWidth: 0,
      color: colors.textSecondary,
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "600",
    },
    lessonObjectivesCard: {
      marginTop: 18,
      padding: 16,
      gap: 11,
      borderRadius: 20,
      backgroundColor: colors.navy84,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.card,
    },
    lessonObjectivesEyebrow: {
      color: colors.primaryText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.1,
      marginBottom: 2,
    },
    lessonObjectiveRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
    },
    lessonObjectiveNumber: {
      width: 25,
      height: 25,
      borderRadius: 9,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.logoYellow,
    },
    lessonObjectiveNumberText: {
      color: colors.ink,
      fontSize: 11,
      fontWeight: "900",
    },
    lessonObjectiveText: {
      flex: 1,
      color: colors.text,
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "700",
    },
    lessonAiButton: {
      minHeight: 72,
      marginTop: 18,
      padding: 12,
      borderRadius: 18,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderWidth: 2,
      borderColor: colors.logoYellow,
      ...shadows.card,
    },
    lessonAiButtonIcon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 11,
      backgroundColor: colors.studyHintBackground,
    },
    lessonAiButtonIconText: {
      color: colors.warningText,
      fontSize: 23,
      fontWeight: "900",
    },
    lessonAiButtonEyebrow: {
      color: colors.warningText,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 0.8,
    },
    lessonAiButtonText: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "800",
      marginTop: 4,
    },
    lessonAiButtonArrow: {
      color: colors.warningText,
      fontSize: 28,
      marginLeft: 8,
    },
    lessonAiBackdrop: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(8,42,67,0.5)",
    },
    lessonAiSheet: {
      height: "70%",
      padding: 22,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primaryLight,
    },
    lessonAiSheetHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    lessonAiSheetEyebrow: {
      color: colors.primaryText,
      fontSize: 11,
      fontWeight: "900",
      letterSpacing: 0.9,
    },
    lessonAiSheetTitle: {
      color: colors.text,
      fontSize: 27,
      fontWeight: "900",
      marginTop: 4,
    },
    lessonAiClose: {
      width: 38,
      height: 38,
      borderRadius: 19,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    lessonAiCloseText: { color: colors.text, fontSize: 24, lineHeight: 26 },
    lessonAiContext: {
      color: colors.textSecondary,
      fontSize: 14,
      fontWeight: "700",
      marginTop: 12,
    },
    lessonAiChat: {
      height: 280,
      maxHeight: 280,
      minHeight: 180,
      marginTop: 12,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    lessonAiChatContent: { padding: 12, gap: 9 },
    lessonAiEmpty: {
      color: colors.textMuted,
      fontSize: 14,
      lineHeight: 21,
      textAlign: "center",
      paddingVertical: 16,
    },
    lessonAiBubble: {
      alignSelf: "center",
      width: "94%",
      padding: 11,
      borderRadius: 14,
      backgroundColor: colors.primary18,
      borderWidth: 1,
      borderColor: colors.cyan24,
    },
    lessonAiBubbleUser: {
      backgroundColor: colors.surfaceElevated,
      borderColor: colors.border,
    },
    lessonAiRole: {
      color: colors.primaryText,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 0.8,
      textAlign: "center",
      marginBottom: 3,
    },
    lessonAiMessage: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 21,
      textAlign: "center",
    },
    lessonAiTyping: {
      color: colors.textMuted,
      fontSize: 10,
      fontStyle: "italic",
      textAlign: "center",
    },
    lessonAiInputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 10,
    },
    lessonAiInput: {
      flex: 1,
      minHeight: 58,
      paddingHorizontal: 13,
      borderRadius: 15,
      color: colors.text,
      fontSize: 15,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    lessonAiSend: {
      width: 58,
      height: 58,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    lessonAiSendDisabled: { backgroundColor: colors.border },
    lessonAiSendText: { color: colors.white, fontSize: 22, fontWeight: "900" },
    lessonAiDisclaimer: {
      color: colors.textMuted,
      fontSize: 10,
      lineHeight: 15,
      textAlign: "center",
      marginTop: 10,
    },
    studyNudge: {
      marginTop: 18,
      paddingVertical: 12,
      paddingHorizontal: 13,
      borderLeftWidth: 2,
      borderLeftColor: colors.primary,
      backgroundColor: colors.surface,
      borderTopRightRadius: 14,
      borderBottomRightRadius: 14,
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
    },
    studyNudgeIcon: { color: colors.warningText, fontSize: 15 },
    studyNudgeText: {
      flex: 1,
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 18,
      fontWeight: "600",
    },
    mentorCard: {
      position: "relative",
      width: "100%",
      minWidth: 0,
      minHeight: 142,
      marginTop: 26,
      borderRadius: 24,
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.transparent,
      borderWidth: 1,
      ...shadows.card,
    },
    mentorStudy: {
      borderColor: colors.logoGold,
      backgroundColor: colors.studyHintBackground,
    },
    mentorSuccess: {
      borderColor: colors.gold,
      backgroundColor: colors.surfaceElevated,
    },
    mentorEncourage: {
      borderColor: colors.secondaryLight,
      backgroundColor: colors.surfaceElevated,
    },
    mentorAccent: {
      position: "absolute",
      width: 5,
      top: 0,
      bottom: 0,
      left: 0,
    },
    mentorImage: {
      width: 125,
      height: 154,
      marginLeft: -4,
      marginTop: -4,
      marginBottom: -8,
    },
    mentorBubble: {
      flex: 1,
      minWidth: 0,

      paddingTop: 18,
      paddingLeft: 18,
      paddingRight: 18,
      paddingBottom: 18,
    },
    mentorName: {
      color: colors.primaryText,
      backgroundColor: colors.transparent,
      fontSize: 14,
      fontWeight: "900",
      letterSpacing: 1.0,
      textAlign: "center",
      marginBottom: 12,
    },
    mentorMessage: {
      color: colors.text,
      backgroundColor: colors.transparent,
      fontSize: 16,
      lineHeight: 24,
      fontWeight: "700",
      textAlign: "center",
      flexShrink: 1,
    },
    mentorLauncher: {
      minHeight: 104,
      marginTop: 18,
      paddingHorizontal: 16,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
      backgroundColor: colors.yeloow,
      get backgroundColor() {
        return this._backgroundColor;
      },
      set backgroundColor(value) {
        this._backgroundColor = value;
      },
      borderWidth: 1,
      borderColor: colors.logoGold,
      shadowColor: colors.logoGold,
      shadowOpacity: 0.28,
      shadowRadius: 13,
      shadowOffset: { width: 0, height: 7 },
      elevation: 6,
    },
    mentorLauncherIcon: {
      width: 52,
      height: 52,
      borderRadius: 17,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 13,
      backgroundColor: colors.primary18,
      borderWidth: 1,
      borderColor: colors.primaryLight,
    },
    mentorLauncherIconText: {
      color: colors.primaryText,
      fontSize: 28,
      fontWeight: "900",
    },
    mentorLauncherImage: {
      width: 66,
      height: 78,
      marginTop: -7,
      marginBottom: -7,
    },
    mentorLauncherEyebrow: {
      color: colors.logoTextYellow,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.9,
    },
    mentorLauncherText: {
      color: colors.text,
      fontSize: 13,
      lineHeight: 18,
      marginTop: 4,
    },
    mentorLauncherArrow: {
      color: colors.logoTextYellow,
      fontSize: 32,
      marginHorizontal: 8,
    },
    mentorModalBackdrop: {
      flex: 1,
      justifyContent: "flex-end",
      backgroundColor: "rgba(8,42,67,0.48)",
    },
    mentorModalSheet: {
      height: "94%",
      paddingHorizontal: 16,
      paddingTop: 8,
      paddingBottom: Platform.OS === "ios" ? 30 : 20,
      borderTopLeftRadius: 32,
      borderTopRightRadius: 32,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.card,
    },
    mentorModalHandle: {
      alignSelf: "center",
      width: 46,
      height: 5,
      borderRadius: 3,
      marginBottom: 8,
      backgroundColor: colors.border,
    },
    mentorModalHero: {
      marginHorizontal: -16,
      paddingHorizontal: 20,
      paddingTop: 18,
      paddingBottom: 22,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      overflow: "hidden",
    },
    mentorModalHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    mentorModalEyebrow: {
      color: colors.logoYellow,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1,
    },
    mentorModalTitle: {
      color: colors.white,
      fontSize: 26,
      fontWeight: "900",
      marginTop: 5,
    },
    mentorModalSubtitle: {
      color: colors.onBrandSecondary,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 10,
      maxWidth: "84%",
    },
    mentorModalClose: {
      backgroundColor: "rgba(255,255,255,0.20)",
      borderColor: "rgba(255,255,255,0.42)",
    },
    mentorAiStatus: {
      alignSelf: "flex-start",
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      paddingHorizontal: 9,
      paddingVertical: 5,
      marginBottom: 10,
      borderRadius: 999,
      backgroundColor: "rgba(255,255,255,0.16)",
    },
    mentorAiStatusDot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      backgroundColor: colors.logoYellow,
    },
    mentorAiStatusText: {
      color: colors.white,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
    },
    mentorTopicLabel: {
      color: colors.logoTextYellow,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1,
      marginTop: 20,
      marginBottom: 10,
    },
    mentorTopicRow: {
      flexDirection: "row",
      gap: 8,
    },
    mentorTopicButton: {
      flex: 1,
      minHeight: 58,
      paddingHorizontal: 8,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    mentorTopicButtonIcon: {
      color: colors.primaryText,
      fontSize: 19,
      lineHeight: 21,
      fontWeight: "900",
      marginBottom: 4,
    },
    mentorTopicButtonActive: {
      backgroundColor: colors.surface,
      borderColor: colors.logoGold,
      shadowColor: colors.transparent,
      shadowOpacity: 0,
      elevation: 0,
    },
    mentorTopicButtonText: {
      color: colors.textSecondary,
      fontSize: 11,
      fontWeight: "800",
      textAlign: "center",
    },
    mentorTopicButtonTextActive: { color: colors.logoTextYellow },
    mentorChatLog: {
      height: 250,
      flexGrow: 0,
      marginTop: 16,
      borderRadius: 0,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    mentorChatLogContent: {
      minHeight: 360,
      padding: 14,
      gap: 10,
    },
    mentorChatEmpty: {
      color: colors.textMuted,
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
      paddingVertical: 9,
    },
    mentorChatBubble: {
      alignSelf: "center",
      width: "92%",
      maxWidth: "92%",
      padding: 12,
      borderRadius: 16,
      backgroundColor: colors.primary18,
      borderWidth: 1,
      borderColor: colors.cyan24,
    },
    mentorChatBubbleUser: {
      alignSelf: "center",
      backgroundColor: colors.secondary18,
      borderColor: colors.secondaryLight,
    },
    mentorChatRole: {
      color: colors.primaryText,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 0.8,
      marginBottom: 3,
      textAlign: "center",
    },
    mentorChatText: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 18,
      textAlign: "center",
    },
    mentorChatTyping: {
      color: colors.textMuted,
      fontSize: 9,
      fontStyle: "italic",
      paddingHorizontal: 4,
    },
    mentorInputRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 10,
    },
    mentorInput: {
      flex: 1,
      minHeight: 50,
      paddingHorizontal: 12,
      borderRadius: 16,
      color: colors.text,
      fontSize: 13,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    mentorSendButton: {
      width: 50,
      height: 50,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    mentorSendButtonDisabled: { backgroundColor: colors.border },
    mentorSendButtonText: {
      color: colors.white,
      fontSize: 21,
      fontWeight: "900",
      marginTop: -2,
    },
    mentorDisclaimer: {
      color: colors.textMuted,
      fontSize: 9,
      lineHeight: 14,
      textAlign: "center",
      marginTop: 14,
    },
    reviewLauncher: {
      minHeight: 78,
      marginTop: 12,
      padding: 12,
      borderRadius: 20,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.secondaryLight,
    },
    reviewLauncherIcon: {
      width: 42,
      height: 42,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      marginRight: 11,
      backgroundColor: colors.secondary18,
      borderWidth: 1,
      borderColor: colors.secondaryLight,
    },
    reviewLauncherIconText: {
      color: colors.primaryText,
      fontSize: 25,
      fontWeight: "900",
    },
    reviewLauncherEyebrow: {
      color: colors.primaryText,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 0.9,
    },
    reviewLauncherTitle: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "900",
      marginTop: 4,
    },
    reviewLauncherText: {
      color: colors.textSecondary,
      fontSize: 9,
      marginTop: 3,
    },
    reviewLauncherArrow: {
      color: colors.primaryText,
      fontSize: 28,
      marginLeft: 7,
    },
    reviewScreenContent: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 38,
    },
    reviewHero: {
      minHeight: 194,
      padding: 20,
      borderRadius: 24,
      overflow: "hidden",
      justifyContent: "center",
      ...shadows.card,
    },
    reviewHeroCopy: { width: "66%", zIndex: 1 },
    reviewHeroMascot: {
      position: "absolute",
      width: 150,
      height: 190,
      right: -24,
      bottom: -18,
    },
    reviewHeroEyebrow: {
      color: colors.white,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
      opacity: 0.8,
    },
    reviewHeroTitle: {
      color: colors.white,
      fontSize: 23,
      lineHeight: 28,
      fontWeight: "900",
      marginTop: 9,
    },
    reviewHeroText: {
      color: colors.white,
      fontSize: 11,
      lineHeight: 17,
      marginTop: 10,
      opacity: 0.82,
    },
    mistakeNotebookSection: { marginTop: 22 },
    mistakeNotebookHeader: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 10,
    },
    mistakeNotebookTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "900",
      marginTop: -3,
    },
    mistakeNotebookCount: {
      minWidth: 34,
      height: 34,
      borderRadius: 12,
      color: colors.white,
      backgroundColor: colors.error,
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 13,
      fontWeight: "900",
      overflow: "hidden",
    },
    mistakeCard: {
      marginBottom: 12,
      padding: 15,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.error,
      ...shadows.card,
    },
    mistakeCardTopRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    mistakeCoursePill: {
      paddingHorizontal: 9,
      paddingVertical: 5,
      borderRadius: 10,
      backgroundColor: colors.primary18,
      borderWidth: 1,
      borderColor: colors.cyan24,
    },
    mistakeCoursePillText: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "900",
    },
    mistakeAttempts: {
      color: colors.textMuted,
      fontSize: 9,
      fontWeight: "700",
    },
    mistakeLessonTitle: {
      color: colors.textMuted,
      fontSize: 10,
      fontWeight: "800",
      marginTop: 12,
    },
    mistakePrompt: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 23,
      fontWeight: "900",
      marginTop: 5,
    },
    mistakeAnswerWrong: {
      marginTop: 14,
      padding: 11,
      borderRadius: 13,
      backgroundColor: colors.error18,
      borderWidth: 1,
      borderColor: colors.error,
    },
    mistakeAnswerCorrect: {
      marginTop: 8,
      padding: 11,
      borderRadius: 13,
      backgroundColor: colors.success18,
      borderWidth: 1,
      borderColor: colors.success,
    },
    mistakeAnswerLabel: {
      color: colors.errorText,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 0.9,
    },
    mistakeAnswerLabelCorrect: { color: colors.successText },
    mistakeAnswerText: {
      color: colors.text,
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "800",
      marginTop: 4,
    },
    mistakeExplanation: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 12,
    },
    mistakeFooter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 14,
    },
    mistakeReviewDate: {
      color: colors.warningText,
      fontSize: 9,
      fontWeight: "800",
    },
    mistakeReviewButton: {
      paddingHorizontal: 11,
      paddingVertical: 8,
      borderRadius: 11,
      backgroundColor: colors.primary,
    },
    mistakeReviewButtonText: {
      color: colors.white,
      fontSize: 10,
      fontWeight: "900",
    },
    reviewEmptyCard: {
      alignItems: "center",
      padding: 26,
      marginTop: 18,
      borderRadius: 22,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.success,
    },
    reviewEmptyIcon: {
      color: colors.successText,
      fontSize: 34,
      fontWeight: "900",
    },
    reviewEmptyTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "900",
      marginTop: 8,
    },
    reviewEmptyText: {
      color: colors.textSecondary,
      fontSize: 11,
      lineHeight: 17,
      textAlign: "center",
      marginTop: 8,
    },
    reviewEmptyMeta: {
      color: colors.successText,
      fontSize: 10,
      fontWeight: "800",
      marginTop: 14,
    },
    reviewList: { marginTop: 22 },
    reviewSectionLabel: {
      color: colors.textMuted,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
      marginBottom: 10,
    },
    reviewLessonCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      padding: 13,
      marginBottom: 10,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    reviewLessonNumber: {
      width: 35,
      height: 35,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.secondary18,
      borderWidth: 1,
      borderColor: colors.secondaryLight,
    },
    reviewLessonNumberText: {
      color: colors.primaryText,
      fontSize: 14,
      fontWeight: "900",
    },
    reviewLessonEyebrow: {
      color: colors.textMuted,
      fontSize: 8,
      fontWeight: "800",
      letterSpacing: 0.5,
    },
    reviewLessonTitle: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "900",
      marginTop: 4,
    },
    reviewLessonMeta: {
      color: colors.textSecondary,
      fontSize: 9,
      marginTop: 4,
    },
    reviewLessonArrow: {
      color: colors.primaryText,
      fontSize: 26,
    },
    dashboardContent: {
      paddingHorizontal: 20,
      paddingTop: 12,
      paddingBottom: 42,
    },
    dashboardHero: {
      minHeight: 178,
      padding: 18,
      borderRadius: 25,
      overflow: "hidden",
      flexDirection: "row",
      ...shadows.card,
    },
    dashboardHeroCopy: { flex: 1, zIndex: 1 },
    dashboardHeroEyebrow: {
      color: colors.white,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
      opacity: 0.8,
    },
    dashboardHeroTitle: {
      color: colors.white,
      fontSize: 23,
      lineHeight: 28,
      fontWeight: "900",
      marginTop: 9,
    },
    dashboardHeroText: {
      color: colors.white,
      fontSize: 11,
      lineHeight: 16,
      marginTop: 10,
      opacity: 0.8,
    },
    dashboardHeroMascot: {
      position: "absolute",
      right: -7,
      bottom: -19,
      width: 136,
      height: 160,
      opacity: 0.94,
    },
    dashboardStatGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 10,
      marginTop: 14,
    },
    dashboardStatCard: {
      width: "48%",
      minHeight: 82,
      padding: 12,
      borderRadius: 17,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dashboardStatIcon: {
      color: colors.primaryText,
      fontSize: 17,
      fontWeight: "900",
    },
    dashboardStatValue: {
      color: colors.text,
      fontSize: 21,
      fontWeight: "900",
      marginTop: 3,
    },
    dashboardStatLabel: {
      color: colors.textMuted,
      fontSize: 9,
      marginTop: 1,
    },
    dashboardPathCard: {
      padding: 14,
      marginTop: 14,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.cyan24,
    },
    dashboardPathTopRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
    },
    dashboardPathIcon: {
      width: 38,
      height: 38,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary18,
      borderWidth: 1,
      borderColor: colors.primaryLight,
    },
    dashboardPathIconText: {
      color: colors.primaryText,
      fontSize: 18,
      fontWeight: "900",
    },
    dashboardPathEyebrow: {
      color: colors.primaryText,
      fontSize: 8,
      fontWeight: "900",
      letterSpacing: 0.8,
    },
    dashboardPathTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "900",
      marginTop: 3,
    },
    dashboardPathText: {
      color: colors.textSecondary,
      fontSize: 9,
      marginTop: 3,
    },
    dashboardPathPercent: {
      color: colors.primaryText,
      fontSize: 15,
      fontWeight: "900",
    },
    dashboardPathTrack: {
      height: 5,
      marginTop: 13,
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: colors.white10,
    },
    dashboardPathFill: {
      height: "100%",
      borderRadius: 4,
      backgroundColor: colors.primaryLight,
    },
    dashboardPathSteps: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 13,
    },
    dashboardPathStep: {
      alignItems: "center",
      width: 48,
    },
    dashboardPathStepLocked: { opacity: 0.48 },
    dashboardPathStepIcon: {
      width: 31,
      height: 31,
      borderRadius: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    dashboardPathStepName: {
      color: colors.textMuted,
      fontSize: 7,
      fontWeight: "800",
      textAlign: "center",
      marginTop: 4,
    },
    dashboardPathMilestone: {
      color: colors.warningText,
      fontSize: 9,
      fontWeight: "800",
      marginTop: 12,
    },
    dashboardSectionHeader: {
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "space-between",
      marginTop: 25,
      marginBottom: 11,
    },
    dashboardSectionEyebrow: {
      color: colors.textMuted,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
    },
    dashboardSectionTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "900",
      marginTop: 5,
    },
    dashboardSectionMeta: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "800",
    },
    dashboardCourseList: { gap: 9 },
    dashboardCourseCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      minHeight: 72,
      padding: 11,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dashboardCourseLocked: { opacity: 0.48 },
    dashboardCourseBadge: {
      width: 40,
      height: 40,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
    },
    dashboardCourseTitleRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 8,
    },
    dashboardCourseTitle: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "900",
    },
    dashboardCourseStatus: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "900",
    },
    dashboardCourseMeta: {
      color: colors.textMuted,
      fontSize: 9,
      marginTop: 4,
    },
    dashboardCourseTrack: {
      height: 4,
      borderRadius: 3,
      marginTop: 8,
      overflow: "hidden",
      backgroundColor: colors.white10,
    },
    dashboardCourseFill: { height: "100%", borderRadius: 3 },
    dashboardCourseArrow: {
      color: colors.primaryText,
      fontSize: 25,
    },
    dashboardRoutineCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      padding: 14,
      borderRadius: 19,
      backgroundColor: colors.primary18,
      borderWidth: 1,
      borderColor: colors.cyan24,
    },
    dashboardRoutineIcon: {
      width: 38,
      height: 38,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    dashboardRoutineIconText: {
      color: colors.white,
      fontSize: 20,
      fontWeight: "900",
    },
    dashboardRoutineTitle: {
      color: colors.text,
      fontSize: 12,
      fontWeight: "900",
    },
    dashboardRoutineText: {
      color: colors.textSecondary,
      fontSize: 9,
      lineHeight: 14,
      marginTop: 4,
    },
    dashboardRoutineMeta: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "900",
    },
    dashboardActionRow: {
      flexDirection: "row",
      gap: 10,
      marginTop: 11,
    },
    dashboardActionCard: {
      flex: 1,
      minHeight: 96,
      padding: 12,
      borderRadius: 18,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dashboardActionIcon: {
      color: colors.primaryText,
      fontSize: 18,
      fontWeight: "900",
    },
    dashboardActionTitle: {
      color: colors.text,
      fontSize: 11,
      fontWeight: "900",
      marginTop: 9,
    },
    dashboardActionText: {
      color: colors.textMuted,
      fontSize: 9,
      marginTop: 4,
    },
    dashboardLastResult: {
      padding: 15,
      marginTop: 12,
      borderRadius: 18,
      backgroundColor: colors.navy86,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dashboardLastResultTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "900",
      marginTop: 8,
    },
    dashboardLastResultText: {
      color: colors.textSecondary,
      fontSize: 10,
      marginTop: 4,
    },
    analogyCard: {
      marginTop: 30,
      padding: 18,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      gap: 14,
      alignItems: "center",
      ...shadows.card,
    },
    analogyIcon: { fontSize: 38 },
    analogyTitle: { color: colors.text, fontWeight: "900", fontSize: 16 },
    analogyValue: {
      color: colors.textSecondary,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
      marginTop: 4,
    },
    codeCard: {
      marginTop: 28,
      borderRadius: 22,
      backgroundColor: colors.codeBackground,
      borderWidth: 1,
      borderColor: colors.border,
      overflow: "hidden",
      ...shadows.card,
    },
    codeTopBar: {
      height: 42,
      paddingHorizontal: 15,
      backgroundColor: colors.surfaceElevated,
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    codeDot: { width: 7, height: 7, borderRadius: 4 },
    codeFilename: { color: colors.textMuted, fontSize: 9, marginLeft: 7 },
    codeText: {
      color: colors.codeText,
      fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
      fontSize: 15,
      lineHeight: 25,
      padding: 20,
    },
    notesBlock: {
      marginTop: 20,
      gap: 9,
      padding: 14,
      borderRadius: 18,
      backgroundColor: colors.navy86,
      borderWidth: 1,
      borderColor: colors.border,
    },
    noteRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
      minHeight: 24,
      width: "100%",
    },
    noteToken: {
      minWidth: 58,
      maxWidth: 92,
      flexShrink: 0,
      color: colors.warningText,
      fontFamily: Platform.OS === "ios" ? "Menlo" : "monospace",
      fontWeight: "700",
    },
    noteArrow: {
      flexShrink: 0,
      color: colors.textDisabled,
    },
    noteText: {
      flex: 1,
      minWidth: 0,
      color: palette.muted,
      fontSize: 13,
      lineHeight: 19,
    },
    practicalExampleCard: {
      marginTop: 20,
      padding: 15,
      borderRadius: 20,
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.cyan24,
    },
    practicalExampleHeader: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
    },
    practicalExampleIcon: {
      width: 31,
      height: 31,
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 10,
      backgroundColor: colors.primary,
    },
    practicalExampleIconText: {
      color: colors.white,
      fontSize: 11,
      fontWeight: "900",
    },
    practicalExampleEyebrow: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    practicalExampleContext: {
      color: colors.text,
      fontSize: 13,
      fontWeight: "800",
      marginTop: 2,
    },
    practicalExampleCode: {
      marginTop: 13,
      padding: 12,
      borderRadius: 13,
      backgroundColor: colors.codeBackground,
    },
    practicalExampleCodeText: {
      color: colors.info,
      fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
      fontSize: 12,
      lineHeight: 19,
    },
    practicalExampleResult: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginTop: 11,
    },
    practicalExampleResultLabel: {
      color: colors.successText,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1,
    },
    practicalExampleResultText: {
      flex: 1,
      color: colors.text,
      fontSize: 12,
      fontWeight: "800",
    },
    practicalExampleExplanation: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 9,
    },
    tipCard: {
      marginTop: 24,
      padding: 18,
      borderRadius: 19,
      backgroundColor: colors.tipBackground,
      borderWidth: 1,
      borderColor: colors.tipBorder,
      flexDirection: "row",
      gap: 12,
      alignItems: "center",
      ...shadows.card,
    },
    tipIcon: { fontSize: 21 },
    tipText: {
      flex: 1,
      color: colors.text,
      fontSize: 13,
      lineHeight: 19,
    },
    bottomAction: {
      paddingHorizontal: 20,
      paddingTop: 13,
      paddingBottom: Platform.OS === "android" ? 22 : 32,
      borderTopWidth: 1,
      borderTopColor: colors.white12,
      backgroundColor: colors.navy92,
    },
    primaryButton: {
      height: 58,
      borderRadius: 18,
      backgroundColor: palette.purple,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      overflow: "hidden",
      shadowColor: colors.ink,
      shadowOpacity: 0.45,
      shadowRadius: 13,
      shadowOffset: { width: 0, height: 7 },
      elevation: 6,
    },
    primaryButtonDisabled: { backgroundColor: colors.locked, shadowOpacity: 0 },
    primaryButtonText: { color: "#FFF", fontSize: 15, fontWeight: "900" },
    primaryButtonArrow: {
      position: "absolute",
      right: 20,
      color: "#FFF",
      fontSize: 20,
    },
    practiceProgressFill: { height: "100%", backgroundColor: colors.gold },
    practiceContent: {
      paddingHorizontal: 20,
      paddingTop: 22,
      paddingBottom: 32,
    },
    practiceHero: {
      minHeight: 96,
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingRight: 16,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.secondary,
    },
    practiceHeroMascot: { width: 79, height: 90, marginRight: 5 },
    practiceEyebrow: {
      color: colors.warningText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.05,
    },
    practiceHeroText: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 5,
    },
    practiceLabel: {
      alignSelf: "flex-start",
      marginTop: 23,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
      backgroundColor: colors.primary18,
      borderWidth: 1,
      borderColor: colors.cyan24,
    },
    practiceLabelText: {
      color: colors.primaryText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.9,
    },
    practicePrompt: {
      color: colors.text,
      fontSize: 25,
      lineHeight: 33,
      fontWeight: "900",
      marginTop: 15,
      letterSpacing: -0.6,
    },
    practiceCodeCard: {
      marginTop: 18,
      padding: 15,
      borderRadius: 18,
      backgroundColor: colors.codeBackground,
      borderWidth: 1,
      borderColor: colors.border,
    },
    practiceCodeText: {
      color: colors.info,
      fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
      fontSize: 14,
      lineHeight: 22,
    },
    practiceOptions: { marginTop: 20, gap: 10 },
    practiceOption: {
      minHeight: 59,
      paddingHorizontal: 14,
      borderRadius: 17,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
    },
    practiceOptionSelected: {
      borderColor: colors.primaryLight,
      backgroundColor: colors.primary18,
    },
    practiceOptionCorrect: {
      borderColor: colors.logoYellow,
      backgroundColor: colors.studyHintBackground,
    },
    practiceOptionWrong: {
      borderColor: colors.error,
      backgroundColor: colors.errorSurface,
    },
    practiceOptionLetter: {
      width: 24,
      height: 24,
      borderRadius: 0,
      color: colors.textMuted,
      backgroundColor: colors.transparent,
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 11,
      fontWeight: "900",
    },
    practiceOptionText: {
      flex: 1,
      color: colors.text,
      fontSize: 14,
      fontWeight: "700",
    },
    practiceOptionResult: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "900",
    },
    practiceOptionResultCorrect: { color: colors.warningText },
    practiceOptionResultWrong: { color: colors.white },
    practiceOptionTextWrong: { color: colors.white },
    practiceFeedback: {
      marginTop: 17,
      padding: 16,
      borderRadius: 18,
      borderWidth: 1,
    },
    practiceFeedbackCorrect: {
      backgroundColor: colors.studyHintBackground,
      borderColor: colors.logoYellow,
    },
    practiceFeedbackWrong: {
      backgroundColor: colors.errorSurfaceStrong,
      borderColor: colors.error,
    },
    practiceFeedbackTitle: {
      color: colors.text,
      fontSize: 14,
      fontWeight: "900",
    },
    practiceFeedbackText: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 5,
    },
    quizContent: { paddingHorizontal: 20, paddingTop: 22, paddingBottom: 32 },
    quizChallengeBanner: {
      minHeight: 126,
      marginBottom: 18,
      paddingVertical: 14,
      paddingHorizontal: 15,
      borderRadius: 21,
      borderWidth: 1,
      borderColor: colors.primaryLight,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
      ...shadows.card,
    },
    quizChallengeMascot: {
      width: 92,
      height: 116,
      marginLeft: -8,
      marginRight: 6,
    },
    quizChallengeCopy: { flex: 1 },
    quizChallengeEyebrow: {
      color: colors.white,
      fontSize: 9,
      fontWeight: "600",
      letterSpacing: 1,
    },
    quizChallengeTitle: {
      color: colors.white,
      fontSize: 18,
      lineHeight: 22,
      fontWeight: "600",
      marginTop: 4,
    },
    quizChallengeText: {
      color: colors.white,
      fontSize: 11,
      lineHeight: 16,
      fontWeight: "600",
      marginTop: 4,
    },
    quizTag: {
      alignSelf: "flex-start",
      backgroundColor: colors.primary18,
      borderWidth: 1,
      borderColor: colors.cyan24,
      paddingHorizontal: 11,
      paddingVertical: 7,
      borderRadius: 13,
      marginBottom: 19,
    },
    quizTagText: { color: colors.warningText, fontSize: 10, fontWeight: "900" },
    quizTagHard: {
      backgroundColor: colors.logoGold,
      borderColor: colors.logoYellow,
      ...shadows.card,
    },
    quizTagTextHard: { color: colors.text },
    quizPrompt: {
      color: palette.text,
      fontSize: 25,
      lineHeight: 35,
      fontWeight: "800",
      letterSpacing: -0.6,
    },
    quizCodeCard: {
      marginTop: 18,
      padding: 17,
      borderRadius: 18,
      backgroundColor: colors.codeBackground,
      borderWidth: 1,
      borderColor: colors.primary,
      ...shadows.card,
    },
    quizCodeText: {
      color: colors.codeText,
      fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
      fontSize: 15,
      lineHeight: 24,
      fontWeight: "600",
    },
    typedAnswerBlock: { marginTop: 22 },
    typedAnswerLabel: {
      color: colors.primaryText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.1,
      marginBottom: 8,
    },
    typedAnswerRow: {
      minHeight: 66,
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      padding: 7,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: colors.white20,
      ...shadows.card,
    },
    typedAnswerCorrect: {
      borderColor: colors.logoGold,
      backgroundColor: colors.studyHintBackground,
    },
    typedAnswerWrong: {
      borderColor: colors.error,
      backgroundColor: colors.errorSurface,
    },
    typedAnswerInput: {
      flex: 1,
      minHeight: 48,
      paddingHorizontal: 12,
      color: colors.text,
      fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
      fontSize: 15,
      fontWeight: "700",
    },
    typedAnswerInputWrong: { color: colors.white },
    typedAnswerSubmit: {
      minHeight: 46,
      paddingHorizontal: 13,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    typedAnswerSubmitDisabled: { opacity: 0.42 },
    typedAnswerSubmitText: {
      color: colors.white,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.5,
    },
    typedAnswerSolution: {
      marginTop: 9,
      color: colors.errorText,
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "800",
    },
    orderQuestionBlock: { marginTop: 22 },
    orderAnswerZone: {
      minHeight: 92,
      gap: 7,
      padding: 10,
      borderRadius: 18,
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: colors.white20,
      ...shadows.card,
    },
    orderPlaceholder: {
      minHeight: 68,
      color: colors.textMuted,
      fontSize: 12,
      textAlign: "center",
      textAlignVertical: "center",
    },
    orderSelectedItem: {
      minHeight: 43,
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      paddingHorizontal: 10,
      borderRadius: 12,
      backgroundColor: colors.surfaceElevated,
    },
    orderPosition: {
      width: 24,
      height: 24,
      borderRadius: 8,
      color: colors.white,
      backgroundColor: colors.primary,
      textAlign: "center",
      textAlignVertical: "center",
      fontSize: 11,
      fontWeight: "900",
    },
    orderItemText: {
      flex: 1,
      color: colors.text,
      fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
      fontSize: 13,
      fontWeight: "700",
    },
    orderChoices: { marginTop: 10, gap: 8 },
    orderChoice: {
      minHeight: 46,
      justifyContent: "center",
      paddingHorizontal: 13,
      borderRadius: 13,
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    orderChoiceUsed: { opacity: 0.35 },
    orderChoiceText: {
      color: colors.text,
      fontFamily: Platform.select({ ios: "Menlo", android: "monospace" }),
      fontSize: 13,
      fontWeight: "700",
    },
    orderValidateButton: {
      minHeight: 48,
      marginTop: 11,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    optionsBlock: { marginTop: 30, gap: 12 },
    optionButton: {
      minHeight: 68,
      paddingHorizontal: 15,
      paddingVertical: 12,
      borderRadius: 19,
      backgroundColor: colors.navy86,
      borderWidth: 1,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 13,
      ...shadows.card,
    },
    optionSelected: {
      borderColor: colors.primaryLight,
      backgroundColor: colors.primary18,
    },
    optionCorrect: {
      borderColor: colors.logoYellow,
      backgroundColor: colors.studyHintBackground,
    },
    optionWrong: {
      borderColor: palette.danger,
      backgroundColor: colors.errorSurface,
    },
    optionLetter: {
      width: 24,
      height: 24,
      borderRadius: 0,
      backgroundColor: colors.transparent,
      alignItems: "center",
      justifyContent: "center",
    },
    optionLetterText: { color: palette.muted, fontSize: 12, fontWeight: "900" },
    optionText: {
      flex: 1,
      color: palette.text,
      fontSize: 14,
      lineHeight: 20,
      fontWeight: "600",
    },
    optionResult: { color: palette.text, fontSize: 20, fontWeight: "900" },
    optionResultCorrect: { color: colors.warningText },
    optionResultWrong: { color: colors.white },
    optionTextWrong: { color: colors.white },
    feedbackCard: {
      marginTop: 22,
      padding: 18,
      borderRadius: 19,
      borderWidth: 1,
    },
    feedbackCorrect: {
      backgroundColor: colors.studyHintBackground,
      borderColor: colors.logoYellow,
    },
    feedbackWrong: {
      backgroundColor: colors.errorSurfaceStrong,
      borderColor: palette.danger,
    },
    feedbackTitle: { color: palette.text, fontSize: 15, fontWeight: "900" },
    feedbackText: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 5,
    },
    feedbackTextWrong: { color: colors.white },
    resultScreen: {
      flex: 1,
      backgroundColor: "transparent",
      paddingTop: Platform.OS === "android" ? 74 : 92,
      paddingHorizontal: 22,
      alignItems: "center",
      overflow: "hidden",
    },
    resultMascotStage: {
      display: "none",
      width: "100%",
      height: 225,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 2,
    },
    resultMascotGlow: {
      position: "absolute",
      width: 212,
      height: 104,
      bottom: 10,
      borderRadius: 106,
      backgroundColor: colors.logoBlueGlow,
      opacity: 0.34,
    },
    resultMascot: { width: 215, height: 225, zIndex: 2 },
    resultMascotEffects: {
      position: "absolute",
      width: 292,
      height: 260,
      zIndex: 3,
    },
    resultEmoji: { display: "none" },
    podiumStage: {
      width: "100%",
      height: 166,
      alignItems: "center",
      justifyContent: "flex-end",
      marginBottom: 8,
    },
    podiumMedal: {
      width: 74,
      height: 76,
      alignItems: "center",
      justifyContent: "flex-end",
      marginBottom: -2,
      zIndex: 2,
    },
    podiumLottieMedal: {
      width: 92,
      height: 92,
      marginBottom: -12,
      zIndex: 2,
    },
    courseCertificateAnimation: {
      width: 142,
      height: 142,
      marginBottom: -18,
      zIndex: 2,
    },
    podiumMedalRibbon: {
      position: "absolute",
      top: 0,
      width: 38,
      height: 34,
      flexDirection: "row",
      justifyContent: "center",
      gap: 2,
    },
    podiumMedalRibbonLeft: {
      width: 17,
      height: 34,
      backgroundColor: colors.primary,
      transform: [{ rotate: "-8deg" }],
    },
    podiumMedalRibbonRight: {
      width: 17,
      height: 34,
      backgroundColor: colors.primaryLight,
      transform: [{ rotate: "8deg" }],
    },
    podiumMedalCoin: {
      width: 52,
      height: 52,
      borderRadius: 26,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 3,
      shadowColor: colors.logoGold,
      shadowOpacity: 0.35,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 5 },
      elevation: 6,
    },
    podiumMedalCode: {
      color: colors.ink,
      fontSize: 14,
      fontWeight: "900",
    },
    podiumRow: {
      width: 238,
      height: 103,
      flexDirection: "row",
      alignItems: "flex-end",
      justifyContent: "center",
      gap: 5,
    },
    podiumStep: {
      width: 72,
      alignItems: "center",
      justifyContent: "center",
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
      borderWidth: 2,
      borderBottomWidth: 0,
      opacity: 0.58,
    },
    podiumFirst: {
      height: 92,
      backgroundColor: colors.logoYellow,
      borderColor: colors.logoGold,
    },
    podiumSecond: {
      height: 66,
      backgroundColor: colors.white,
      borderColor: colors.primaryLight,
    },
    podiumThird: {
      height: 48,
      backgroundColor: "#D68B4C",
      borderColor: "#A65A25",
    },
    podiumActive: {
      opacity: 1,
      shadowColor: colors.ink,
      shadowOpacity: 0.22,
      shadowRadius: 12,
      shadowOffset: { width: 0, height: 6 },
      elevation: 6,
    },
    podiumPlace: {
      color: colors.ink,
      fontSize: 23,
      fontWeight: "900",
    },
    podiumPlaceFirst: { fontSize: 29 },
    podiumRankLabel: {
      marginTop: 8,
      fontSize: 13,
      fontWeight: "900",
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },
    podiumRankGold: { color: colors.logoGold },
    podiumRankSilver: { color: colors.primaryText },
    podiumRankBronze: { color: "#A65A25" },
    resultEyebrow: {
      color: colors.warningText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.9,
      backgroundColor: colors.logoYellow,
      paddingHorizontal: 11,
      paddingVertical: 5,
      borderRadius: 999,
      marginBottom: 12,
    },
    resultTitle: {
      color: palette.text,
      fontSize: 30,
      lineHeight: 38,
      textAlign: "center",
      fontWeight: "900",
      letterSpacing: -1,
    },
    resultSubtitle: {
      color: palette.muted,
      fontSize: 14,
      lineHeight: 21,
      textAlign: "center",
      maxWidth: 310,
      marginTop: 14,
    },
    resultStats: {
      width: "100%",
      marginTop: 38,
      paddingVertical: 22,
      borderRadius: 23,
      backgroundColor: colors.white20,
      borderWidth: 2,
      borderColor: colors.primary,
      flexDirection: "row",
      alignItems: "center",
    },
    resultStat: { flex: 1, alignItems: "center" },
    resultStatIcon: { fontSize: 20, marginBottom: 7 },
    resultStatValue: { color: colors.text, fontSize: 20, fontWeight: "900" },
    resultStatLabel: {
      color: colors.textSecondary,
      fontSize: 10,
      marginTop: 3,
    },
    resultStatDivider: {
      width: 1,
      height: 52,
      backgroundColor: colors.border,
    },
    resultBreakdown: {
      width: "100%",
      marginTop: 12,
      paddingHorizontal: 14,
      paddingVertical: 12,
      borderRadius: 16,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.logoGold,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      gap: 12,
    },
    resultBreakdownText: {
      color: colors.successText,
      fontSize: 10,
      fontWeight: "800",
    },
    resultBottom: {
      position: "absolute",
      left: 20,
      right: 20,
      bottom: Platform.OS === "android" ? 24 : 35,
    },
    projectsLauncher: {
      minHeight: 108,
      marginTop: 14,
      borderRadius: 22,
      overflow: "hidden",
      padding: 16,
      justifyContent: "center",
      ...shadows.primary,
    },
    projectsLauncherMascot: {
      position: "absolute",
      width: 122,
      height: 118,
      right: -12,
      bottom: -5,
    },
    projectsLauncherCopy: { paddingRight: 42 },
    projectsLauncherEyebrow: {
      color: colors.white,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: "900",
    },
    projectsLauncherTitle: {
      color: colors.white,
      fontSize: 20,
      fontWeight: "900",
      marginTop: 4,
    },
    projectsLauncherText: {
      color: colors.white,
      fontSize: 11,
      lineHeight: 16,
      marginTop: 3,
      opacity: 0.85,
    },
    projectsLauncherArrow: {
      position: "absolute",
      right: 15,
      top: 42,
      color: colors.white,
      fontSize: 27,
      fontWeight: "300",
    },
    dashboardProjectLauncher: {
      minHeight: 102,
      marginTop: 12,
      padding: 15,
      paddingRight: 46,
      borderWidth: 1,
      borderColor: colors.primaryLight,
      borderRadius: 19,
      backgroundColor: colors.surfaceElevated,
      flexDirection: "row",
      alignItems: "center",
      overflow: "hidden",
    },
    dashboardProjectMascot: { width: 76, height: 84, marginRight: 8 },
    dashboardProjectTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "900",
      marginTop: 2,
    },
    dashboardProjectText: {
      color: colors.textSecondary,
      fontSize: 11,
      lineHeight: 16,
      marginTop: 3,
    },
    dashboardProjectArrow: {
      position: "absolute",
      right: 15,
      color: colors.primaryText,
      fontSize: 28,
      fontWeight: "300",
    },
    projectsScreenContent: { padding: 20, paddingBottom: 42, gap: 13 },
    projectsHero: {
      minHeight: 194,
      borderRadius: 25,
      overflow: "hidden",
      padding: 20,
      justifyContent: "center",
    },
    projectsHeroCopy: { width: "65%", zIndex: 1 },
    projectsHeroEyebrow: {
      color: colors.white,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: "900",
    },
    projectsHeroTitle: {
      color: colors.white,
      fontSize: 25,
      lineHeight: 30,
      fontWeight: "900",
      marginTop: 7,
    },
    projectsHeroText: {
      color: colors.white,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 8,
      opacity: 0.87,
    },
    projectsHeroMascot: {
      position: "absolute",
      width: 160,
      height: 184,
      right: -18,
      bottom: -8,
    },
    projectsIntroCard: {
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      padding: 14,
      borderRadius: 17,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    projectsIntroIcon: { color: colors.warningText, fontSize: 21, fontWeight: "900" },
    projectsIntroText: {
      flex: 1,
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 17,
    },
    projectsList: { gap: 11 },
    projectCard: {
      minHeight: 132,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      padding: 14,
      borderRadius: 20,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    projectCardLocked: { opacity: 0.58 },
    projectCourseBadge: {
      width: 46,
      height: 46,
      borderRadius: 14,
      alignItems: "center",
      justifyContent: "center",
      alignSelf: "flex-start",
    },
    projectCardTopRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    projectCourseName: {
      color: colors.primaryText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 0.8,
    },
    projectStatus: { color: colors.textMuted, fontSize: 9, fontWeight: "900" },
    projectStatusComplete: { color: colors.successText },
    projectCardTitle: {
      color: colors.text,
      fontSize: 17,
      fontWeight: "900",
      marginTop: 4,
    },
    projectCardText: {
      color: colors.textSecondary,
      fontSize: 11,
      lineHeight: 16,
      marginTop: 3,
    },
    projectCardMeta: {
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      marginTop: 9,
    },
    projectCardMetaText: {
      color: colors.textMuted,
      fontSize: 10,
      fontWeight: "700",
    },
    projectCardReward: { color: colors.warningText, fontSize: 10, fontWeight: "900" },
    projectLockHint: {
      color: colors.textMuted,
      fontSize: 10,
      lineHeight: 14,
      marginTop: 7,
    },
    projectCardArrow: {
      color: colors.primaryText,
      fontSize: 25,
      fontWeight: "300",
    },
    projectDetailContent: { padding: 20, paddingBottom: 42 },
    projectDetailHero: {
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      marginBottom: 18,
    },
    projectDetailCourseBadge: {
      width: 66,
      height: 66,
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    projectDetailCourse: {
      color: colors.primaryText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    projectDetailTitle: {
      color: colors.text,
      fontSize: 25,
      lineHeight: 30,
      fontWeight: "900",
      marginTop: 3,
    },
    projectDetailSubtitle: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 4,
    },
    projectBriefingCard: {
      borderRadius: 20,
      padding: 17,
      backgroundColor: colors.surfaceElevated,
      borderWidth: 1,
      borderColor: colors.border,
    },
    projectBriefingEyebrow: {
      color: colors.warningText,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: "900",
    },
    projectBriefingText: {
      color: colors.text,
      fontSize: 15,
      lineHeight: 22,
      fontWeight: "700",
      marginTop: 8,
    },
    projectBriefingFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 14,
    },
    projectBriefingMeta: {
      color: colors.textMuted,
      fontSize: 11,
      fontWeight: "700",
    },
    projectBriefingReward: {
      color: colors.warningText,
      fontSize: 10,
      fontWeight: "900",
    },
    projectSectionTitle: {
      color: colors.text,
      fontSize: 18,
      fontWeight: "900",
      marginTop: 22,
    },
    projectStepsCard: {
      marginTop: 11,
      gap: 12,
      borderRadius: 20,
      padding: 15,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    projectStepItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      gap: 10,
    },
    projectStepNumber: {
      width: 24,
      height: 24,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.primary,
    },
    projectStepNumberText: {
      color: colors.white,
      fontSize: 11,
      fontWeight: "900",
    },
    projectStepText: {
      flex: 1,
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      paddingTop: 2,
    },
    projectTipCard: {
      minHeight: 106,
      flexDirection: "row",
      alignItems: "center",
      marginTop: 16,
      padding: 13,
      paddingRight: 16,
      borderRadius: 20,
      backgroundColor: colors.backgroundSecondary,
      borderWidth: 1,
      borderColor: colors.secondary,
    },
    projectTipMascot: { width: 78, height: 84, marginRight: 5 },
    projectTipEyebrow: {
      color: colors.primaryText,
      fontSize: 10,
      letterSpacing: 1.1,
      fontWeight: "900",
    },
    projectTipText: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 17,
      marginTop: 5,
    },
    projectChecklistHeading: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
    },
    projectChecklistSubtext: {
      color: colors.textMuted,
      fontSize: 11,
      marginTop: 4,
    },
    projectChecklistProgress: {
      color: colors.primaryText,
      fontSize: 18,
      fontWeight: "900",
    },
    projectChecklistCard: {
      marginTop: 11,
      borderRadius: 20,
      overflow: "hidden",
      borderWidth: 1,
      borderColor: colors.border,
      backgroundColor: colors.surface,
    },
    projectChecklistItem: {
      minHeight: 62,
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      paddingHorizontal: 14,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    projectChecklistItemChecked: { backgroundColor: colors.success18 },
    projectCheckbox: {
      width: 23,
      height: 23,
      borderRadius: 7,
      borderWidth: 1.5,
      borderColor: colors.textMuted,
      alignItems: "center",
      justifyContent: "center",
    },
    projectCheckboxChecked: {
      borderColor: colors.success,
      backgroundColor: colors.success,
    },
    projectCheckboxText: { color: colors.ink, fontSize: 14, fontWeight: "900" },
    projectChecklistText: {
      flex: 1,
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 17,
    },
    projectChecklistTextChecked: { color: colors.text, fontWeight: "700" },
    projectCompleteButton: {
      minHeight: 58,
      marginTop: 18,
      borderRadius: 18,
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 9,
      ...shadows.primary,
    },
    projectCompleteButtonDisabled: { opacity: 0.48 },
    projectCompleteButtonText: {
      color: colors.white,
      fontSize: 14,
      fontWeight: "900",
    },
    projectCompleteButtonIcon: {
      color: colors.white,
      fontSize: 20,
      fontWeight: "900",
    },
    dailyMissionCard: {
      minHeight: 188,
      marginTop: 16,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 22,
      backgroundColor: colors.surface,
      overflow: "hidden",
      padding: 16,
      ...shadows.card,
    },
    dailyMissionCardCompact: { marginBottom: 2 },
    dailyMissionAccent: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      width: 5,
    },
    dailyMissionMascot: {
      position: "absolute",
      width: 112,
      height: 142,
      right: -10,
      top: 4,
      opacity: 0.96,
    },
    dailyMissionCopy: { paddingRight: 0 },
    dailyMissionHeading: {
      flexDirection: "row",
      alignItems: "flex-start",
      justifyContent: "space-between",
      marginBottom: 13,
    },
    dailyMissionEyebrow: {
      color: colors.primaryText,
      fontSize: 10,
      letterSpacing: 1.2,
      fontWeight: "900",
    },
    dailyMissionTitle: {
      color: colors.text,
      fontSize: 17,
      marginTop: 3,
      fontWeight: "900",
    },
    dailyMissionCount: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: "800",
      paddingTop: 3,
    },
    dailyMissionList: { gap: 9 },
    dailyMissionItem: { flexDirection: "row", alignItems: "center", gap: 8 },
    dailyMissionIcon: {
      width: 19,
      color: colors.primaryText,
      fontSize: 13,
      fontWeight: "900",
      textAlign: "center",
    },
    dailyMissionLabelRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 4,
    },
    dailyMissionLabel: {
      color: colors.textSecondary,
      fontSize: 11,
      fontWeight: "700",
    },
    dailyMissionValue: {
      color: colors.textMuted,
      fontSize: 10,
      fontWeight: "800",
    },
    dailyMissionTrack: {
      height: 5,
      borderRadius: 4,
      overflow: "hidden",
      backgroundColor: colors.surfaceElevated,
    },
    dailyMissionFill: {
      height: "100%",
      borderRadius: 4,
      backgroundColor: colors.primaryLight,
    },
    dailyMissionFillComplete: { backgroundColor: colors.success },
    achievementGrid: { gap: 9, marginBottom: 4 },
    achievementCard: {
      minHeight: 74,
      flexDirection: "row",
      alignItems: "center",
      gap: 11,
      padding: 12,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 17,
      backgroundColor: colors.surface,
    },
    achievementCardUnlocked: {
      borderColor: colors.primaryLight,
      backgroundColor: colors.surfaceElevated,
    },
    achievementBadge: {
      width: 42,
      height: 42,
      borderRadius: 13,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.backgroundSecondary,
    },
    achievementBadgeUnlocked: { backgroundColor: colors.secondary },
    achievementBadgeIcon: {
      color: colors.warningText,
      fontSize: 18,
      fontWeight: "900",
    },
    achievementTitle: { color: colors.text, fontSize: 14, fontWeight: "900" },
    achievementDetail: { color: colors.textMuted, fontSize: 11, marginTop: 3 },
    achievementCheck: {
      color: colors.successText,
      fontSize: 18,
      fontWeight: "900",
    },
    dictionaryLauncher: {
      minHeight: 118,
      borderRadius: 24,
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      gap: 14,
      padding: 18,
      marginBottom: 16,
      ...shadows.primary,
    },
    loginHeroCompact: {
      borderBottomLeftRadius: 17,
      borderBottomRightRadius: 17,
    },
    loginHeroRegister: {
      marginTop: Platform.OS === "android" ? -47 : -36,
      minHeight: 300,
      justifyContent: "flex-start",
      paddingTop: 18,
      paddingHorizontal: 24,
    },
    dictionaryLauncherIcon: {
      width: 56,
      height: 56,
      borderRadius: 18,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.logoYellow,
    },
    dictionaryLauncherIconText: {
      color: colors.ink,
      fontSize: 16,
      fontWeight: "900",
    },
    dictionaryLauncherEyebrow: {
      color: colors.logoYellow,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.2,
    },
    dictionaryLauncherTitle: {
      color: colors.white,
      fontSize: 18,
      lineHeight: 22,
      fontWeight: "900",
      marginTop: 4,
    },
    dictionaryLauncherText: {
      color: colors.onBrandSecondary,
      fontSize: 11,
      lineHeight: 16,
      marginTop: 4,
    },
    dictionaryLauncherArrow: {
      color: colors.logoYellow,
      fontSize: 26,
      fontWeight: "800",
    },
    dictionaryContent: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 42,
    },
    dictionaryHero: {
      minHeight: 190,
      borderRadius: 27,
      padding: 22,
      justifyContent: "flex-end",
      overflow: "hidden",
      ...shadows.primary,
    },
    dictionaryHeroEyebrow: {
      color: colors.logoYellow,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.4,
    },
    dictionaryHeroTitle: {
      color: colors.white,
      fontSize: 26,
      lineHeight: 31,
      fontWeight: "900",
      marginTop: 7,
    },
    dictionaryHeroText: {
      color: colors.onBrandSecondary,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 8,
    },
    dictionarySearchShell: {
      height: 58,
      borderRadius: 18,
      marginTop: 18,
      paddingHorizontal: 16,
      flexDirection: "row",
      alignItems: "center",
      gap: 10,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.card,
    },
    dictionarySearchIcon: {
      color: colors.primaryText,
      fontSize: 22,
      fontWeight: "900",
    },
    dictionarySearchInput: {
      flex: 1,
      height: "100%",
      color: colors.text,
      fontSize: 14,
    },
    dictionaryResultRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 24,
      marginBottom: 10,
    },
    dictionaryResultTitle: {
      color: colors.textSecondary,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    dictionaryResultCount: {
      color: colors.primaryText,
      fontSize: 12,
      fontWeight: "900",
    },
    dictionaryList: { gap: 10 },
    dictionaryCard: {
      minHeight: 84,
      borderRadius: 20,
      padding: 13,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
      backgroundColor: colors.white20,
      borderWidth: 1,
      borderColor: colors.border,
      ...shadows.card,
    },
    dictionaryTermBadge: {
      minWidth: 58,
      height: 52,
      paddingHorizontal: 8,
      borderRadius: 16,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.codeBackground,
    },
    dictionaryTermBadgeText: {
      color: colors.logoYellow,
      fontSize: 15,
      fontWeight: "900",
    },
    dictionaryCardCategory: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },
    dictionaryCardDefinition: {
      color: colors.text,
      fontSize: 12,
      lineHeight: 17,
      fontWeight: "700",
      marginTop: 5,
    },
    dictionaryCardArrow: {
      color: colors.primaryText,
      fontSize: 24,
      fontWeight: "800",
    },
    dictionaryEmpty: {
      padding: 28,
      borderRadius: 22,
      alignItems: "center",
      backgroundColor: colors.white20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dictionaryEmptyTitle: {
      color: colors.text,
      fontSize: 16,
      fontWeight: "900",
    },
    dictionaryEmptyText: {
      color: colors.textSecondary,
      fontSize: 12,
      textAlign: "center",
      marginTop: 7,
    },
    dictionaryDetailContent: {
      paddingHorizontal: 20,
      paddingTop: 20,
      paddingBottom: 44,
      gap: 12,
    },
    dictionaryDetailHero: {
      minHeight: 180,
      borderRadius: 28,
      padding: 22,
      justifyContent: "flex-end",
      overflow: "hidden",
      ...shadows.primary,
    },
    dictionaryDetailHeroTerm: {
      color: colors.logoYellow,
      fontSize: 42,
      lineHeight: 48,
      fontWeight: "900",
    },
    dictionaryDetailHeroDefinition: {
      color: colors.white,
      fontSize: 14,
      lineHeight: 21,
      fontWeight: "700",
      marginTop: 10,
    },
    dictionaryDetailSection: {
      padding: 17,
      borderRadius: 20,
      backgroundColor: colors.white20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dictionaryDetailAccent: {
      backgroundColor: colors.studyHintBackground,
      borderColor: colors.logoGold,
    },
    dictionaryDetailLabel: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.15,
    },
    dictionaryDetailText: {
      color: colors.text,
      fontSize: 14,
      lineHeight: 21,
      marginTop: 8,
    },
    dictionaryCodeSection: {
      padding: 17,
      borderRadius: 20,
      backgroundColor: colors.codeBackground,
      borderWidth: 1,
      borderColor: colors.primary,
    },
    dictionaryCodeLabel: {
      color: colors.primaryText,
      fontSize: 9,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    dictionaryCodeText: {
      color: colors.codeText,
      fontSize: 13,
      lineHeight: 20,
      marginTop: 10,
    },
    dictionaryRelatedSection: {
      padding: 17,
      borderRadius: 20,
      backgroundColor: colors.white20,
      borderWidth: 1,
      borderColor: colors.border,
    },
    dictionaryRelatedRow: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 8,
      marginTop: 11,
    },
    dictionaryRelatedChip: {
      paddingHorizontal: 11,
      paddingVertical: 7,
      borderRadius: 13,
      backgroundColor: colors.surfaceElevated,
      borderWidth: 2,
      borderColor: colors.logoYellow,
    },
    dictionaryRelatedChipText: {
      color: colors.text,
      fontSize: 11,
      fontWeight: "800",
    },
    codeCoinContent: {
      padding: 20,
      paddingBottom: 48,
      gap: 16,
    },
    codeCoinHero: {
      minHeight: 260,
      borderRadius: 28,
      padding: 22,
      overflow: "hidden",
      flexDirection: "row",
      alignItems: "center",
      ...shadows.primary,
    },
    codeCoinHeroCopy: {
      flex: 1,
      paddingRight: 8,
    },
    codeCoinEyebrow: {
      color: colors.logoYellow,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.25,
    },
    codeCoinHeroTitle: {
      color: colors.white,
      fontSize: 25,
      lineHeight: 30,
      fontWeight: "900",
      marginTop: 8,
    },
    codeCoinHeroText: {
      color: colors.white,
      opacity: 0.9,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 9,
    },
    codeCoinArtOuter: {
      width: 168,
      height: 168,
      alignItems: "center",
      justifyContent: "center",
    },
    codeCoinArtImage: {
      width: 168,
      height: 168,
    },
    codeCoinBalanceCard: {
      padding: 20,
      borderRadius: 22,
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.logoGold,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      ...shadows.card,
    },
    codeCoinSectionLabel: {
      color: colors.primaryText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.25,
    },
    codeCoinBalanceValue: {
      color: colors.text,
      fontSize: 38,
      fontWeight: "900",
      marginTop: 3,
    },
    codeCoinBalanceCaption: {
      color: colors.textSecondary,
      fontSize: 13,
      fontWeight: "700",
    },
    codeCoinRefresh: {
      paddingHorizontal: 14,
      paddingVertical: 10,
      borderRadius: 14,
      backgroundColor: colors.surfaceElevated,
    },
    codeCoinRefreshText: {
      color: colors.primaryText,
      fontSize: 12,
      fontWeight: "900",
    },
    codeCoinInfoCard: {
      padding: 20,
      borderRadius: 22,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
      gap: 13,
      ...shadows.card,
    },
    codeCoinInfoTitle: {
      color: colors.text,
      fontSize: 20,
      lineHeight: 25,
      fontWeight: "900",
    },
    codeCoinBenefitRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    codeCoinBenefitIcon: {
      width: 34,
      height: 34,
      borderRadius: 17,
      textAlign: "center",
      textAlignVertical: "center",
      backgroundColor: colors.studyHintBackground,
      color: colors.warningText,
      fontSize: 17,
      fontWeight: "900",
    },
    codeCoinBenefitText: {
      flex: 1,
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      fontWeight: "700",
    },
    codeCoinSectionTitle: {
      color: colors.text,
      fontSize: 23,
      fontWeight: "900",
      marginTop: 5,
    },
    codeCoinPackGrid: {
      gap: 11,
    },
    codeCoinPackCard: {
      minHeight: 88,
      padding: 14,
      borderRadius: 20,
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.border,
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    codeCoinPackCardSelected: {
      borderColor: colors.logoGold,
      backgroundColor: colors.studyHintBackground,
      ...shadows.card,
    },
    codeCoinMiniCoin: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.logoYellow,
      borderWidth: 3,
      borderColor: colors.logoGold,
    },
    codeCoinMiniCoinText: {
      color: colors.warningText,
      fontSize: 13,
      fontWeight: "900",
    },
    codeCoinPackCopy: {
      flex: 1,
    },
    codeCoinPackName: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "900",
    },
    codeCoinPackAmount: {
      color: colors.textSecondary,
      fontSize: 12,
      fontWeight: "700",
      marginTop: 3,
    },
    codeCoinPackPrice: {
      color: colors.primaryText,
      fontSize: 15,
      fontWeight: "900",
    },
    codeCoinBuyButton: {
      minHeight: 58,
      borderRadius: 18,
      paddingHorizontal: 20,
      backgroundColor: colors.logoYellow,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      ...shadows.primary,
    },
    codeCoinBuyButtonDisabled: {
      opacity: 0.55,
    },
    codeCoinBuyButtonText: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "900",
    },
    codeCoinBuyButtonArrow: {
      color: colors.primaryText,
      fontSize: 22,
      fontWeight: "900",
    },
    codeCoinEmpty: {
      padding: 18,
      borderRadius: 18,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
    },
    codeCoinHelpCard: {
      padding: 20,
      borderRadius: 22,
      backgroundColor: colors.surface,
      borderWidth: 1,
      borderColor: colors.border,
    },
    codeCoinHelpQuestion: {
      color: colors.text,
      fontSize: 15,
      fontWeight: "900",
      marginTop: 16,
    },
    codeCoinHelpAnswer: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 4,
    },
    codeCoinHelpDivider: {
      height: 1,
      backgroundColor: colors.border,
      marginTop: 15,
    },
    billingContent: {
      padding: 20,
      paddingBottom: 40,
      gap: 14,
    },
    billingHero: {
      borderRadius: 24,
      padding: 22,
      ...shadows.card,
    },
    billingEyebrow: {
      color: colors.logoYellow,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.4,
    },
    billingHeroTitle: {
      color: colors.white,
      fontSize: 26,
      lineHeight: 31,
      fontWeight: "900",
      marginTop: 8,
    },
    billingHeroText: {
      color: colors.white,
      opacity: 0.84,
      fontSize: 14,
      lineHeight: 20,
      marginTop: 8,
    },
    billingLoading: {
      alignItems: "center",
      gap: 8,
      padding: 20,
    },
    billingStatusCard: {
      padding: 18,
      borderRadius: 20,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.primary,
      ...shadows.card,
    },
    billingSectionLabel: {
      color: colors.primaryText,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.15,
    },
    billingStatusTitle: {
      color: colors.text,
      fontSize: 23,
      fontWeight: "900",
      marginTop: 6,
    },
    billingStatusText: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: "800",
      marginTop: 3,
    },
    billingMuted: {
      color: colors.textSecondary,
      fontSize: 12,
      lineHeight: 18,
      marginTop: 5,
    },
    billingPlanGrid: {
      gap: 12,
    },
    billingPlanCard: {
      padding: 18,
      borderRadius: 20,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
    },
    billingPlanPremium: {
      padding: 18,
      borderRadius: 20,
      ...shadows.card,
    },
    billingPlanKicker: {
      color: colors.primary,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    billingPlanKickerLight: {
      color: colors.logoYellow,
      fontSize: 10,
      fontWeight: "900",
      letterSpacing: 1.1,
    },
    billingPlanTitle: {
      color: colors.text,
      fontSize: 22,
      fontWeight: "900",
      marginTop: 5,
    },
    billingPlanTitleLight: {
      color: colors.white,
      fontSize: 22,
      fontWeight: "900",
      marginTop: 5,
    },
    billingPlanPrice: {
      color: colors.primary,
      fontSize: 20,
      fontWeight: "900",
      marginTop: 9,
    },
    billingPlanPriceLight: {
      color: colors.white,
      fontSize: 20,
      fontWeight: "900",
      marginTop: 9,
      display: "none",
    },
    billingPlanPriceLightDynamic: {
      color: colors.white,
      fontSize: 20,
      fontWeight: "900",
      marginTop: 9,
    },
    billingPlanPeriod: { fontSize: 12, fontWeight: "700" },
    billingPlanPeriodLight: { color: colors.white, fontSize: 12, fontWeight: "700" },
    billingPlanText: {
      color: colors.textSecondary,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 9,
    },
    billingPlanTextLight: {
      color: colors.white,
      opacity: 0.9,
      fontSize: 13,
      lineHeight: 19,
      marginTop: 9,
    },
    billingButton: {
      marginTop: 16,
      paddingVertical: 13,
      borderRadius: 14,
      alignItems: "center",
      backgroundColor: colors.logoYellow,
    },
    billingButtonText: { color: colors.text, fontSize: 13, fontWeight: "900" },
    billingCancelButton: {
      marginTop: 16,
      paddingVertical: 13,
      borderRadius: 14,
      alignItems: "center",
      backgroundColor: colors.white,
    },
    billingCancelButtonText: { color: colors.error, fontSize: 13, fontWeight: "900" },
    billingError: {
      padding: 13,
      borderRadius: 14,
      backgroundColor: colors.error18,
      borderWidth: 1,
      borderColor: colors.error,
    },
    billingErrorText: { color: colors.error, fontSize: 12, lineHeight: 18, fontWeight: "700" },
    billingNotice: {
      padding: 13,
      borderRadius: 14,
      backgroundColor: colors.studyHintBackground,
      borderWidth: 1,
      borderColor: colors.logoGold,
    },
    billingNoticeText: { color: colors.warningText, fontSize: 12, lineHeight: 18, fontWeight: "700" },
    billingRefresh: { alignItems: "center", paddingVertical: 8 },
    billingRefreshText: { color: colors.primary, fontSize: 13, fontWeight: "800" },
    billingHistoryCard: {
      padding: 18,
      borderRadius: 20,
      backgroundColor: colors.white,
      borderWidth: 1,
      borderColor: colors.border,
    },
    billingHistoryRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 9,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    billingHistoryTitle: { color: colors.text, fontSize: 14, fontWeight: "800" },
    billingHistoryAmount: { color: colors.primary, fontSize: 13, fontWeight: "900" },
    billingHistoryStatus: { color: colors.textSecondary, fontSize: 10, fontWeight: "800", maxWidth: 92, textAlign: "right" },
    confettiParticle: {
      position: "absolute",
      borderRadius: 5,
    },
  }),
);
