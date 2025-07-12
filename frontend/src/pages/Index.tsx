import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Search,
  MessageCircle,
  Star,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import { AuthMenuItem } from "@/components/ui/navigation-menu"; // ✅ Import AuthMenuItem

const Index = () => {
  const featuredSkills = [
    "React",
    "Python",
    "UI/UX Design",
    "Machine Learning",
    "Node.js",
    "Data Science",
  ];

  const stats = [
    { label: "Active Users", value: "2,500+", icon: Users },
    { label: "Skills Available", value: "150+", icon: Search },
    { label: "Successful Swaps", value: "5,800+", icon: MessageCircle },
    { label: "Average Rating", value: "4.8", icon: Star },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">SS</span>
              </div>
              <span className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Skill Swap Platform
              </span>
            </div>

            <div className="flex items-center gap-3">
              <Link to="/browse">
                <Button variant="ghost">Browse Skills</Button>
              </Link>
              <AuthMenuItem /> {/* ✅ Conditional Sign In / Logout */}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Share Skills,
              <br />
              Learn Together
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Connect with others to exchange knowledge and grow your skills. Teach what you know, learn what you want.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/browse">
              <Button size="lg" variant="gradient" className="gap-2">
                <Search className="h-5 w-5" />
                Find Skills to Learn
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="gap-2">
                <UserPlus className="h-5 w-5" />
                Share Your Skills
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card border-0 shadow-card text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Skills */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Popular Skills</h2>
            <p className="text-muted-foreground">
              Explore the most in-demand skills on our platform
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {featuredSkills.map((skill) => (
              <Link key={skill} to="/browse">
                <Badge
                  variant="outline"
                  className="text-base py-2 px-4 cursor-pointer hover:bg-gradient-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 hover:scale-105 hover:shadow-glow"
                >
                  {skill}
                </Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4">
        <div className="container mx-auto space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold">How It Works</h2>
            <p className="text-muted-foreground">
              Get started with skill swapping in three simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <Card className="bg-gradient-card border-0 shadow-card text-center hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserPlus className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>Create Your Profile</CardTitle>
                <CardDescription>
                  List the skills you want to teach and what you'd like to learn
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Step 2 */}
            <Card className="bg-gradient-card border-0 shadow-card text-center hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>Find Your Match</CardTitle>
                <CardDescription>
                  Browse other users and find someone who teaches what you want to learn
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Step 3 */}
            <Card className="bg-gradient-card border-0 shadow-card text-center hover:shadow-elegant transition-all duration-300">
              <CardHeader>
                <div className="h-16 w-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-primary-foreground" />
                </div>
                <CardTitle>Start Learning</CardTitle>
                <CardDescription>
                  Connect with your match and begin exchanging knowledge together
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center space-y-6">
          <Card className="bg-gradient-primary border-0 shadow-glow max-w-2xl mx-auto">
            <CardContent className="pt-8 pb-8">
              <h2 className="text-3xl font-bold text-primary-foreground mb-4">
                Ready to Start Learning?
              </h2>
              <p className="text-primary-foreground/90 mb-6">
                Join our community of learners and start your skill-swapping journey today.
              </p>
              <Link to="/register">
                <Button
                  size="lg"
                  variant="secondary"
                  className="gap-2 bg-white text-primary hover:bg-white/90"
                >
                  <UserPlus className="h-5 w-5" />
                  Get Started Free
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card/50 backdrop-blur-sm py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 Skill Swap Platform. Built for passionate learners and teachers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
