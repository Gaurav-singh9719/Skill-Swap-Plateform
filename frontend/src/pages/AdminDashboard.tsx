import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Activity, 
  Star, 
  Search, 
  Ban, 
  CheckCircle, 
  XCircle,
  BarChart3,
  TrendingUp,
  MessageSquare
} from "lucide-react";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const stats = {
    totalUsers: 1248,
    activeSwaps: 84,
    completedSwaps: 567,
    averageRating: 4.6
  };

  const users = [
    { id: 1, name: "Alice Johnson", email: "alice@example.com", status: "active", swaps: 12, rating: 4.8 },
    { id: 2, name: "Bob Smith", email: "bob@example.com", status: "suspended", swaps: 3, rating: 3.2 },
    { id: 3, name: "Carol Davis", email: "carol@example.com", status: "active", swaps: 8, rating: 4.5 },
    { id: 4, name: "David Wilson", email: "david@example.com", status: "pending", swaps: 0, rating: 0 }
  ];

  const swapRequests = [
    { id: 1, from: "Alice Johnson", to: "Bob Smith", skill: "Web Design", status: "pending" },
    { id: 2, from: "Carol Davis", to: "Alice Johnson", skill: "Photography", status: "active" },
    { id: 3, from: "David Wilson", to: "Carol Davis", skill: "Writing", status: "completed" }
  ];

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage users, monitor swaps, and oversee platform activity</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Swaps</CardTitle>
              <Activity className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.activeSwaps}</div>
              <p className="text-xs text-muted-foreground">Currently in progress</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Swaps</CardTitle>
              <CheckCircle className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.completedSwaps}</div>
              <p className="text-xs text-muted-foreground">Total successful swaps</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
              <Star className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.averageRating}</div>
              <p className="text-xs text-muted-foreground">Platform satisfaction</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-muted/50">
            <TabsTrigger value="users" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Users
            </TabsTrigger>
            <TabsTrigger value="swaps" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Swap Requests
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              Analytics
            </TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">User Management</CardTitle>
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} />
                          <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-medium text-foreground">{user.name}</h3>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-sm text-muted-foreground">{user.swaps} swaps</span>
                            <span className="text-sm text-muted-foreground">•</span>
                            <span className="text-sm text-muted-foreground">{user.rating}★</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={user.status === 'active' ? 'default' : user.status === 'suspended' ? 'destructive' : 'secondary'}>
                          {user.status}
                        </Badge>
                        {user.status === 'active' && (
                          <Button variant="outline" size="sm">
                            <Ban className="h-4 w-4 mr-1" />
                            Suspend
                          </Button>
                        )}
                        {user.status === 'suspended' && (
                          <Button variant="outline" size="sm">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Activate
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Swaps Tab */}
          <TabsContent value="swaps" className="space-y-6">
            <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
              <CardHeader>
                <CardTitle className="text-xl">Swap Request Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {swapRequests.map((swap) => (
                    <div key={swap.id} className="flex items-center justify-between p-4 border border-border rounded-lg bg-background/50">
                      <div className="flex items-center space-x-4">
                        <MessageSquare className="h-8 w-8 text-primary" />
                        <div>
                          <h3 className="font-medium text-foreground">{swap.from} → {swap.to}</h3>
                          <p className="text-sm text-muted-foreground">Skill: {swap.skill}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={swap.status === 'active' ? 'default' : swap.status === 'completed' ? 'secondary' : 'outline'}>
                          {swap.status}
                        </Badge>
                        {swap.status === 'pending' && (
                          <>
                            <Button variant="outline" size="sm">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button variant="destructive" size="sm">
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                    Platform Metrics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">User Growth Rate</span>
                      <span className="font-medium text-foreground">+12% monthly</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Swap Success Rate</span>
                      <span className="font-medium text-foreground">87%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Average Session Time</span>
                      <span className="font-medium text-foreground">24 minutes</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Return User Rate</span>
                      <span className="font-medium text-foreground">68%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-card to-card/80 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-xl">Popular Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Web Development', 'Graphic Design', 'Photography', 'Writing', 'Marketing'].map((skill, index) => (
                      <div key={skill} className="flex justify-between items-center">
                        <span className="text-muted-foreground">{skill}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-300"
                              style={{ width: `${(5 - index) * 20}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground">{(5 - index) * 20}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;