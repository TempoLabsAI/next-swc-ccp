import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export async function Hero() {
  const { userId } = await auth();
  return (
    <section className="py-20">
      <div className="container px-4">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="secondary" className="bg-secondary/10 hover:bg-secondary/20">
            <Star className="mr-1 h-3 w-3" /> Built with modern tech stack
          </Badge>

          <h1 className="text-6xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Launch Faster with Tempo
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern full-stack starter template powered by Next.js, featuring authentication,
            database, and payment solutions out of the box.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link href={userId ? "/dashboard" : "/sign-in"}>
              <Button size="lg" className="group">
                Start Building
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
