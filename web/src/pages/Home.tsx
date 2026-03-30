import { AchievementsPanel } from "../components/home/AchievementsPanel";
import { CoursesPanel } from "../components/home/CoursesPanel";
import {
  DashboardSidebar,
  type SidebarItem,
} from "../components/home/DashboardSidebar";
import { FeedbackPanel } from "../components/home/FeedbackPanel";
import { HomeStatCard } from "../components/home/HomeStatCard";
import { RankingPanel } from "../components/home/RankingPanel";
import { UpcomingLessonsPanel } from "../components/home/UpcomingLessonsPanel";
import {
  BookIcon,
  BugIcon,
  CheckIcon,
  FlameIcon,
  GridIcon,
  MessageIcon,
  PlayIcon,
  SettingsIcon,
  ShieldIcon,
  SparkIcon,
  TargetIcon,
  TrophyIcon,
  UserIcon,
} from "../components/home/icons";
import { getTokenPayload, getUserRole } from "../auth/auth";

const sidebarItems: SidebarItem[] = [
  {
    active: true,
    href: "#dashboard",
    icon: <GridIcon className="h-4.5 w-4.5" />,
    id: "dashboard",
    label: "Dashboard",
  },
  {
    href: "#courses",
    icon: <BookIcon className="h-4.5 w-4.5" />,
    id: "courses",
    label: "Cursos",
  },
  {
    href: "#achievements",
    icon: <TrophyIcon className="h-4.5 w-4.5" />,
    id: "achievements",
    label: "Conquistas",
  },
  {
    href: "#feedback",
    icon: <MessageIcon className="h-4.5 w-4.5" />,
    id: "feedback",
    label: "Feedback",
  },
  {
    icon: <BugIcon className="h-4.5 w-4.5" />,
    id: "bugs",
    label: "Reportar Bug",
  },
  {
    icon: <UserIcon className="h-4.5 w-4.5" />,
    id: "profile",
    label: "Perfil",
  },
  {
    icon: <SettingsIcon className="h-4.5 w-4.5" />,
    id: "settings",
    label: "Configuracoes",
  },
  {
    href: "/administracao",
    icon: <SettingsIcon className="h-4.5 w-4.5" />,
    id: "administracao",
    label: "Administracao",
    requiredPermission: 3,
  },
];

function getGreetingName() {
  const rawName = getTokenPayload()?.email?.split("@")[0];

  if (!rawName) {
    return "Dev";
  }

  return rawName
    .split(/[._-]+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase() + part.slice(1))
    .join(" ");
}

const stats = [
  {
    caption: "Recorde: 12 dias",
    icon: <FlameIcon className="h-5 w-5" />,
    iconClassName: "bg-[rgba(0,255,163,0.1)] text-[var(--home-accent)]",
    id: "streak",
    label: "Streak",
    value: "7 dias",
  },
  {
    caption: "Esta semana: 5",
    icon: <BookIcon className="h-5 w-5" />,
    iconClassName: "bg-[rgba(20,231,255,0.12)] text-[#24d5ff]",
    id: "watched",
    label: "Aulas Assistidas",
    value: "48",
  },
  {
    caption: "Proxima: Mentor",
    icon: <TrophyIcon className="h-5 w-5" />,
    iconClassName: "bg-[rgba(255,205,83,0.12)] text-[#ffd45b]",
    id: "achievements",
    label: "Conquistas",
    value: "4/6",
  },
  {
    caption: "3 pendentes",
    icon: <TargetIcon className="h-5 w-5" />,
    iconClassName: "bg-[rgba(0,255,163,0.1)] text-[var(--home-accent)]",
    id: "challenges",
    label: "Desafios",
    value: "12",
  },
];



const courses = [
  {
    icon: <PlayIcon className="h-5 w-5" />,
    iconClassName:
      "bg-[linear-gradient(135deg,#ffcf5a_0%,#ff8f1f_100%)] text-[#fff8e8]",
    id: "js",
    lessonsLabel: "24 aulas",
    progress: 82,
    progressClassName: "bg-[linear-gradient(90deg,#ffd44a_0%,#ff9800_100%)]",
    title: "JavaScript Fundamentos",
  },
  {
    icon: <PlayIcon className="h-5 w-5" />,
    iconClassName:
      "bg-[linear-gradient(135deg,#42d3ff_0%,#3b82f6_100%)] text-white",
    id: "react",
    lessonsLabel: "18 aulas",
    progress: 45,
    progressClassName: "bg-[linear-gradient(90deg,#4dd9ff_0%,#5a7cff_100%)]",
    title: "React Avancado",
  },
  {
    icon: <CheckIcon className="h-5 w-5" />,
    iconClassName:
      "bg-[linear-gradient(135deg,#4fe17d_0%,#22c58b_100%)] text-white",
    id: "python",
    lessonsLabel: "30 aulas",
    progress: 100,
    progressClassName: "bg-[linear-gradient(90deg,#5ae38b_0%,#22c58b_100%)]",
    title: "Python para Iniciantes",
  },
  {
    icon: <PlayIcon className="h-5 w-5" />,
    iconClassName:
      "bg-[linear-gradient(135deg,#b86cff_0%,#ff69b4_100%)] text-white",
    id: "node",
    lessonsLabel: "20 aulas",
    progress: 15,
    progressClassName: "bg-[linear-gradient(90deg,#c66dff_0%,#ff66b3_100%)]",
    title: "Node.js & APIs",
  },
];

const lessons = [
  {
    id: "react-live",
    schedule: "Hoje, 19:00",
    statusLabel: "Ao vivo",
    statusTone: "accent" as const,
    teacher: "Prof. Lucas",
    title: "React Hooks na Pratica",
  },
  {
    id: "algorithms",
    schedule: "Amanha, 14:00",
    statusLabel: "Gravada",
    statusTone: "neutral" as const,
    teacher: "Prof. Ana",
    title: "Algoritmos & Logica",
  },
  {
    id: "final-project",
    schedule: "Qua, 20:00",
    statusLabel: "Ao vivo",
    statusTone: "accent" as const,
    teacher: "Prof. Carlos",
    title: "Projeto Final - Sprint Review",
  },
];

const achievements = [
  {
    description: "Voce manteve consistencia por 7 dias seguidos estudando.",
    icon: <FlameIcon className="h-5 w-5" />,
    iconClassName: "bg-[rgba(0,255,163,0.1)] text-[var(--home-accent)]",
    id: "focus",
    statusLabel: "Desbloqueada",
    statusTone: "success" as const,
    title: "Foco em Chama",
  },
  {
    description: "Seu progresso em React ja colocou voce entre os mais ativos.",
    icon: <SparkIcon className="h-5 w-5" />,
    iconClassName: "bg-[rgba(20,231,255,0.12)] text-[#24d5ff]",
    id: "consistency",
    statusLabel: "Rumo ao proximo marco",
    statusTone: "accent" as const,
    title: "Ritmo Constante",
  },
  {
    description: "Todas as aulas da trilha de Python foram concluídas.",
    icon: <ShieldIcon className="h-5 w-5" />,
    iconClassName: "bg-[rgba(255,205,83,0.12)] text-[#ffd45b]",
    id: "python",
    statusLabel: "Colecionavel",
    statusTone: "warning" as const,
    title: "Escudo Python",
  },
];

const ranking = [
  {
    id: "lucas",
    initials: "LM",
    name: "Lucas M.",
    rank: 1,
    xpLabel: "4.200 XP",
  },
  {
    id: "ana",
    initials: "AS",
    name: "Ana S.",
    rank: 2,
    xpLabel: "3.800 XP",
  },
  {
    id: "pedro",
    initials: "PL",
    name: "Pedro L.",
    rank: 3,
    xpLabel: "3.500 XP",
  },
  {
    id: "you",
    initials: "VO",
    isCurrentUser: true,
    name: "Voce",
    rank: 7,
    xpLabel: "2.450 XP",
  },
];

export default function Home() {
  const greetingName = getGreetingName();
  const userRole = getUserRole();
  const visibleSidebarItems = sidebarItems.filter(
    (item) =>
      item.requiredPermission == null || item.requiredPermission === userRole,
  );

  return (
    <main className="min-h-screen bg-[var(--home-bg)] text-[var(--home-text)]">
      <div className="mx-auto flex min-h-screen max-w-[1920px] flex-col xl:flex-row">
        <DashboardSidebar
          brandName="TechSchool"
          items={visibleSidebarItems}
          levelLabel="Nivel 7"
          xpLabel="2.450 XP"
          xpValue={62}
        />

        <div className="flex-1 px-4 py-4 sm:px-6 lg:px-8 xl:px-10 xl:py-8">
          <div className="mx-auto max-w-[1400px]">
            <header
              id="dashboard"
              className="rounded-[2rem] border border-[rgba(0,255,163,0.08)] bg-[linear-gradient(135deg,rgba(10,14,22,0.96),rgba(10,13,20,0.82))] px-6 py-7 shadow-[0_24px_80px_rgba(0,0,0,0.22)] sm:px-8"
            >
              <p className="text-sm uppercase tracking-[0.24em] text-[var(--home-text-muted)] [font-family:var(--font-mono)]">
                Dashboard pessoal
              </p>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.06em] text-[var(--home-text)] sm:text-5xl">
                Ola,{" "}
                <span className="text-[var(--home-accent)]">
                  {greetingName}
                </span>{" "}
                <span className="inline-block origin-bottom-left rotate-6">
                  👋
                </span>
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--home-text-muted)] [font-family:var(--font-mono)]">
                Continue de onde parou. Seu ritmo esta forte e as proximas
                conquistas estao perto.
              </p>
            </header>

            <section className="mt-6 grid gap-4 md:grid-cols-2 2xl:grid-cols-4">
              {stats.map((stat) => (
                <HomeStatCard
                  key={stat.id}
                  caption={stat.caption}
                  icon={stat.icon}
                  iconClassName={stat.iconClassName}
                  label={stat.label}
                  value={stat.value}
                />
              ))}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
              <div className="space-y-6">
                <div id="courses">
                  <CoursesPanel courses={courses} />
                </div>

                <div id="achievements">
                  <AchievementsPanel achievements={achievements} />
                </div>

                <div id="feedback">
                  <FeedbackPanel />
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <UpcomingLessonsPanel lessons={lessons} />
                </div>

                <div>
                  <RankingPanel entries={ranking} />
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
