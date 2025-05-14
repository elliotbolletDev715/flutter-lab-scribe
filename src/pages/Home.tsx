
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-secondary/30">
      <header className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-primary">Lab Website</h1>
        <div className="space-x-2">
          <Link to="/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link to="/register">
            <Button>Sign Up</Button>
          </Link>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl sm:text-5xl font-bold text-primary">Research Laboratory</h2>
          <p className="mt-6 text-xl text-muted-foreground">
            Welcome to our academic research lab. We focus on cutting-edge research and scientific publications.
          </p>
          
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="text-base px-8">
                Join the Lab
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-base px-8">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="mt-24 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold">Research Areas</h3>
            <p className="mt-2 text-muted-foreground">
              Explore our diverse research areas and ongoing projects in various scientific disciplines.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold">Publications</h3>
            <p className="mt-2 text-muted-foreground">
              Access our latest scientific publications, papers, and research findings.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-lg shadow-sm border">
            <h3 className="text-xl font-bold">Team Members</h3>
            <p className="mt-2 text-muted-foreground">
              Meet our team of researchers, scientists, and collaborators.
            </p>
          </div>
        </div>
      </main>
      
      <footer className="container mx-auto p-4 mt-20 border-t">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2025 Research Laboratory. All rights reserved.</p>
          <div className="mt-4 sm:mt-0">
            <p className="text-sm text-muted-foreground">
              Sign in with demo credentials: admin@lab.com / password
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
