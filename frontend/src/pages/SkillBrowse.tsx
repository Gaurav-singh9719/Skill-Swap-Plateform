import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, MessageCircle, Star, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const SkillBrowse = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const { toast } = useToast();

  // Mock data for users
  const users = [
    {
      id: 1,
      name: "Sarah Johnson",
      location: "San Francisco, CA",
      avatar: "",
      skillsOffered: ["React", "JavaScript", "Node.js"],
      skillsWanted: ["Python", "Machine Learning"],
      rating: 4.8,
      availability: "Evenings",
      bio: "Full-stack developer with 5 years of experience. Love teaching and learning new technologies."
    },
    {
      id: 2,
      name: "Mike Chen",
      location: "New York, NY",
      avatar: "",
      skillsOffered: ["Python", "Data Science", "Machine Learning"],
      skillsWanted: ["React", "Frontend Development"],
      rating: 4.9,
      availability: "Weekends",
      bio: "Data scientist passionate about AI and web development."
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      location: "Austin, TX",
      avatar: "",
      skillsOffered: ["UI/UX Design", "Figma", "Adobe Creative Suite"],
      skillsWanted: ["React", "Frontend Development"],
      rating: 4.7,
      availability: "Flexible",
      bio: "Creative designer with expertise in user experience and visual design."
    }
  ];

  const popularSkills = [
    "React", "Python", "JavaScript", "UI/UX Design", "Machine Learning",
    "Node.js", "Data Science", "Figma", "Adobe Creative Suite", "TypeScript"
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.skillsOffered.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         user.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSkill = !selectedSkill || user.skillsOffered.includes(selectedSkill);
    
    return matchesSearch && matchesSkill;
  });

  const handleSendRequest = (userId: number, userName: string) => {
    toast({
      title: "Request sent!",
      description: `Your skill swap request has been sent to ${userName}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 p-4">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Browse Skills
          </h1>
          <p className="text-muted-foreground text-lg">
            Find people to learn from and share your expertise
          </p>
        </div>

        {/* Search and Filters */}
        <Card className="bg-gradient-card border-0 shadow-elegant">
          <CardContent className="p-6">
            <div className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, skill, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-base"
                />
              </div>

              {/* Popular Skills */}
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Popular Skills:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSkills.map((skill) => (
                    <Badge
                      key={skill}
                      variant={selectedSkill === skill ? "default" : "outline"}
                      className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                        selectedSkill === skill
                          ? "bg-gradient-primary shadow-glow"
                          : "hover:bg-accent"
                      }`}
                      onClick={() => setSelectedSkill(selectedSkill === skill ? "" : skill)}
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* User Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <Card
              key={user.id}
              className="bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300 hover:scale-105"
            >
              <CardHeader className="pb-4">
                <div className="flex items-start gap-3">
                  <Avatar className="h-12 w-12 border-2 border-primary/20">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className="bg-gradient-accent font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg truncate">{user.name}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3 mr-1" />
                      {user.location}
                    </div>
                    <div className="flex items-center mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{user.rating}</span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">{user.bio}</p>
                
                {/* Skills Offered */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-success">Offers:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsOffered.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs bg-success/10 text-success border-success/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Skills Wanted */}
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-primary">Wants:</h4>
                  <div className="flex flex-wrap gap-1">
                    {user.skillsWanted.map((skill) => (
                      <Badge
                        key={skill}
                        variant="secondary"
                        className="text-xs bg-primary/10 text-primary border-primary/20"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Availability */}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Available:</span>
                  <Badge variant="outline" className="text-xs">
                    {user.availability}
                  </Badge>
                </div>
                
                {/* Action Button */}
                <Button
                  onClick={() => handleSendRequest(user.id, user.name)}
                  className="w-full gap-2"
                  variant="gradient"
                >
                  <MessageCircle className="h-4 w-4" />
                  Send Request
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredUsers.length === 0 && (
          <Card className="bg-gradient-card border-0 shadow-card">
            <CardContent className="text-center py-12">
              <h3 className="text-lg font-semibold mb-2">No users found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SkillBrowse;