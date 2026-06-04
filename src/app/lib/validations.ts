import { z } from "zod";

export const matchSchema = z.object({
  league: z.string().min(1),
  date: z.string().min(1),
  homeTeam: z.string().min(1),
  awayTeam: z.string().min(1),
  score: z.string().min(1),
  sport: z.enum(["football", "cricket", "basketball", "tennis"]),
});

export const upcomingMatchSchema = z.object({
  league: z.string().min(1),
  days: z.number(),
  hours: z.number(),
  minutes: z.number(),
  seconds: z.number(),
});

export const videoSchema = z.object({
  title: z.string().min(1),
  publishedDate: z.string().min(1),
  duration: z.string().min(1),
  thumbnail: z.string().min(1),
});

export const featuredVideoSchema = z.object({
  image: z.string().min(1),
  alt: z.string().min(1),
});

export const newsArticleSchema = z.object({
  title: z.string().min(1),
  image: z.string().min(1),
  date: z.string().min(1),
  plain: z.boolean().optional(),
});

export const statSchema = z.object({
  value: z.string().min(1),
  label: z.string().min(1),
  description: z.string().min(1),
});

export const productSchema = z.object({
  name: z.string().min(1),
  price: z.string().optional(),
  image: z.string().min(1),
  wide: z.boolean().optional(),
});

export const heroSchema = z.object({
  heading: z.string().min(1),
  subheading: z.string().optional(),
  description: z.string().min(1),
  ctaText: z.string().optional(),
  ctaLink: z.string().optional(),
});

export const aboutSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
});

export const loginSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});
