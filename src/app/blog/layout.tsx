import { blogPosts } from "@/data/blogPosts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Matcha blog: Recepty, průvodci a tipy | Matchuji",
  description: "Blog o matche — kde koupit kvalitní matchu v ČR, jak ji připravit, matcha latte recept, smoothie recepty a vědecky podložené účinky na zdraví.",
  openGraph: {
    title: "Matcha blog: Recepty, průvodci a tipy | Matchuji",
    description: "Blog o matche — kde koupit kvalitní matchu v ČR, jak ji připravit, matcha latte recept a smoothie recepty.",
    images: ["/images/matcha-lifestyle.jpg"],
  },
  keywords: ["matcha blog", "matcha recepty", "koupit matchu", "matcha latte recept", "matcha účinky", "matcha ČR"],
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
