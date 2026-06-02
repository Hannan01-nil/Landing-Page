export interface Match {
  league: string;
  date: string;
  homeTeam: string;
  awayTeam: string;
  score: string;
  sport: "football" | "cricket" | "basketball" | "tennis";
}

export interface Video {
  title: string;
  publishedDate: string;
  duration: string;
  thumbnail: string;
}

export interface NewsArticle {
  title: string;
  image: string;
  date: string;
  plain?: boolean;
}

export interface Stat {
  value: string;
  label: string;
  description: string;
}

export interface Product {
  name: string;
  price?: string;
  image: string;
  wide?: boolean;
}
