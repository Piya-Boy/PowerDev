import { projects } from '@/data/projects';
import ProjectDetailsClient from './ProjectDetailsClient';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
  params: {
    id: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.id.toString() === params.id);

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

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const project = projects.find((p) => p.id.toString() === params.id);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
  };
}