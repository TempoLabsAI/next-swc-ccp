import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles } from "lucide-react";

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
            <Button size="lg" className="group bg-primary/10 hover:bg-primary/20 text-primary">
              Clerk Auth
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="secondary" className="group bg-secondary/10 hover:bg-secondary/20">
              Convex DB
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="group border-muted hover:bg-muted/50">
              Polar Payments
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
