import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, LogIn } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="container px-4">
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <Badge variant="secondary" className="bg-secondary/10 hover:bg-secondary/20">
            <Sparkles className="mr-1 h-3 w-3" /> Built with modern tech stack
          </Badge>
          
          <h1 className="text-6xl sm:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            Tempo Next Starter
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A modern full-stack starter template powered by Next.js, featuring authentication, 
            database, and payment solutions out of the box.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link href="/sign-in">
              <Button size="lg" className="group bg-primary hover:bg-primary/90">
                Sign In
                <LogIn className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
