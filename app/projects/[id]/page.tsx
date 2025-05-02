import { projects } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({ params }: Props) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id.toString() === resolvedParams.id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailsClient project={project} />;
}

export async function generateStaticParams() {
  const paths = projects.map((project) => ({
    id: project.id.toString(),
  }));
  return paths;
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.id.toString() === resolvedParams.id);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}