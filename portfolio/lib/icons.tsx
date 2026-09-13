import type { IconType } from "react-icons";
import {
  SiPython,
  SiDjango,
  SiFastapi,
  SiReact,
  SiNextdotjs,
  SiPostgresql,
  SiRedis,
  SiDocker,
  SiTypescript,
  SiFlutter,
  SiJavascript,
  SiLangchain,
  SiNeo4J,
  SiQdrant,
  SiCelery,
  SiGithub,
  SiLinux,
  SiGit,
  SiPytorch,
  SiTensorflow,
  SiScikitlearn,
  SiMysql,
  SiDart,
} from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { FiMail } from "react-icons/fi";

// Maps a tech-stack label (as written in lib/data.ts) to its brand icon.
// Anything not listed here simply renders as a plain text badge —
// deliberately no fallback emoji, per the "no random emoji" rule.
export const techIconMap: Record<string, IconType> = {
  Python: SiPython,
  Django: SiDjango,
  FastAPI: SiFastapi,
  React: SiReact,
  "Next.js": SiNextdotjs,
  PostgreSQL: SiPostgresql,
  "Async PostgreSQL": SiPostgresql,
  MySQL: SiMysql,
  Redis: SiRedis,
  Docker: SiDocker,
  TypeScript: SiTypescript,
  Flutter: SiFlutter,
  Dart: SiDart,
  JavaScript: SiJavascript,
  LangChain: SiLangchain,
  LangGraph: SiLangchain,
  Neo4j: SiNeo4J,
  Qdrant: SiQdrant,
  Celery: SiCelery,
  GitHub: SiGithub,
  Linux: SiLinux,
  Git: SiGit,
  PyTorch: SiPytorch,
  TensorFlow: SiTensorflow,
  "Scikit-learn": SiScikitlearn,
};

export const platformIcons = {
  linkedin: FaLinkedin,
  github: SiGithub,
  mail: FiMail,
};
