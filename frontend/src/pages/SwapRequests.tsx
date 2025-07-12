import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, XCircle, Clock, Trash2, MessageCircle, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type RequestStatus = "pending" | "accepted" | "rejected" | "completed";

interface SwapRequest {
  id: number;
  otherUser: {
    name: string;
    avatar: string;
    rating: number;
  };
  mySkill: string;
  theirSkill: string;
  status: RequestStatus;
  message: string;
  createdAt: string;
  type: "sent" | "received";
}

const SwapRequests = () => {
  const { toast } = useToast();
  
  const [requests, setRequests] = useState<SwapRequest[]>([
    {
      id: 1,
      otherUser: { name: "Sarah Johnson", avatar: "", rating: 4.8 },
      mySkill: "React",
      theirSkill: "Python",
      status: "pending",
      message: "Hi! I'd love to learn React from you. I have 3 years of Python experience and can teach you data science concepts.",
      createdAt: "2024-01-15",
      type: "received"
    },
    {
      id: 2,
      otherUser: { name: "Mike Chen", avatar: "", rating: 4.9 },
      mySkill: "UI/UX Design",
      theirSkill: "Machine Learning",
      status: "accepted",
      message: "Excited to start our skill swap! When would be a good time for our first session?",
      createdAt: "2024-01-14",
      type: "sent"
    },
    {
      id: 3,
      otherUser: { name: "Emily Rodriguez", avatar: "", rating: 4.7 },
      mySkill: "JavaScript",
      theirSkill: "Figma",
      status: "completed",
      message: "Thanks for the great JavaScript session! Ready to teach you some Figma tricks.",
      createdAt: "2024-01-10",
      type: "received"
    },
    {
      id: 4,
      otherUser: { name: "Alex Smith", avatar: "", rating: 4.6 },
      mySkill: "Node.js",
      theirSkill: "Vue.js",
      status: "rejected",
      message: "Sorry, I don't have time for new commitments right now.",
      createdAt: "2024-01-12",
      type: "sent"
    }
  ]);

  const handleRequestAction = (requestId: number, action: "accept" | "reject" | "delete") => {
    setRequests(prev => {
      if (action === "delete") {
        return prev.filter(req => req.id !== requestId);
      }
      
      return prev.map(req => 
        req.id === requestId 
          ? { ...req, status: action === "accept" ? "accepted" : "rejected" as RequestStatus }
          : req
      );
    });

    const actionMessages = {
      accept: "Request accepted! You can now start your skill swap.",
      reject: "Request rejected.",
      delete: "Request deleted."
    };

    toast({
      title: actionMessages[action],
      description: action === "accept" ? "Check your messages to coordinate with your swap partner." : undefined,
    });
  };

  const getStatusIcon = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4 text-warning" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-destructive" />;
      case "completed":
        return <Star className="h-4 w-4 text-yellow-400 fill-current" />;
    }
  };

  const getStatusColor = (status: RequestStatus) => {
    switch (status) {
      case "pending":
        return "bg-warning/10 text-warning border-warning/20";
      case "accepted":
        return "bg-success/10 text-success border-success/20";
      case "rejected":
        return "bg-destructive/10 text-destructive border-destructive/20";
      case "completed":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
    }
  };

  const sentRequests = requests.filter(req => req.type === "sent");
  const receivedRequests = requests.filter(req => req.type === "received");

  const RequestCard = ({ request }: { request: SwapRequest }) => (
    <Card className="bg-gradient-card border-0 shadow-card hover:shadow-elegant transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20">
              <AvatarImage src={request.otherUser.avatar} />
              <AvatarFallback className="bg-gradient-accent font-semibold">
                {request.otherUser.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{request.otherUser.name}</h3>
              <div className="flex items-center">
                <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                <span className="text-sm text-muted-foreground">{request.otherUser.rating}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {getStatusIcon(request.status)}
            <Badge variant="outline" className={getStatusColor(request.status)}>
              {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Skill Exchange */}
        <div className="bg-accent/30 rounded-lg p-4 space-y-2">
          <div className="text-sm font-medium">Skill Exchange:</div>
          <div className="flex items-center justify-between">
            <div className="text-center">
              <Badge className="bg-success/10 text-success border-success/20 mb-1">
                You teach
              </Badge>
              <div className="font-medium">{request.mySkill}</div>
            </div>
            <div className="text-2xl">⇄</div>
            <div className="text-center">
              <Badge className="bg-primary/10 text-primary border-primary/20 mb-1">
                You learn
              </Badge>
              <div className="font-medium">{request.theirSkill}</div>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <div className="text-sm font-medium">Message:</div>
          <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
            {request.message}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {request.type === "received" && request.status === "pending" && (
            <>
              <Button
                onClick={() => handleRequestAction(request.id, "accept")}
                variant="success"
                size="sm"
                className="flex-1 gap-2"
              >
                <CheckCircle className="h-4 w-4" />
                Accept
              </Button>
              <Button
                onClick={() => handleRequestAction(request.id, "reject")}
                variant="destructive"
                size="sm"
                className="flex-1 gap-2"
              >
                <XCircle className="h-4 w-4" />
                Reject
              </Button>
            </>
          )}
          
          {request.status === "accepted" && (
            <Button variant="outline" size="sm" className="flex-1 gap-2">
              <MessageCircle className="h-4 w-4" />
              Message
            </Button>
          )}
          
          {(request.status === "rejected" || 
            (request.type === "sent" && request.status === "pending")) && (
            <Button
              onClick={() => handleRequestAction(request.id, "delete")}
              variant="outline"
              size="sm"
              className="gap-2 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
              Delete
            </Button>
          )}
        </div>

        <div className="text-xs text-muted-foreground pt-2 border-t">
          {new Date(request.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          })}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/10 to-primary/5 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Swap Requests
          </h1>
          <p className="text-muted-foreground">
            Manage your skill exchange requests and partnerships
          </p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="received" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gradient-card shadow-card">
            <TabsTrigger value="received" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
              Received ({receivedRequests.length})
            </TabsTrigger>
            <TabsTrigger value="sent" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
              Sent ({sentRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="received" className="space-y-4">
            {receivedRequests.length > 0 ? (
              receivedRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardContent className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No received requests</h3>
                  <p className="text-muted-foreground">
                    You haven't received any skill swap requests yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="sent" className="space-y-4">
            {sentRequests.length > 0 ? (
              sentRequests.map(request => (
                <RequestCard key={request.id} request={request} />
              ))
            ) : (
              <Card className="bg-gradient-card border-0 shadow-card">
                <CardContent className="text-center py-12">
                  <h3 className="text-lg font-semibold mb-2">No sent requests</h3>
                  <p className="text-muted-foreground">
                    You haven't sent any skill swap requests yet.
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SwapRequests;