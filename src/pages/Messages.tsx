
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, Send, MoreHorizontal, Phone, Video, Paperclip } from "lucide-react";

// Sample message data
const messagesData = [
  {
    id: "1",
    contactId: "contact1",
    sender: "contact1",
    content: "Hi there! I was wondering if you'll have fresh strawberries this weekend?",
    timestamp: "2025-04-10T10:30:00",
    read: true
  },
  {
    id: "2",
    contactId: "contact1",
    sender: "user",
    content: "Hello! Yes, we'll have a fresh batch of strawberries ready by Friday. Would you like me to reserve some for you?",
    timestamp: "2025-04-10T10:35:00",
    read: true
  },
  {
    id: "3",
    contactId: "contact1",
    sender: "contact1",
    content: "That would be great! Can I get 2 pints please?",
    timestamp: "2025-04-10T10:40:00",
    read: true
  },
  {
    id: "4",
    contactId: "contact1",
    sender: "user",
    content: "Absolutely! I've reserved 2 pints for you. They'll be ready for pickup on Friday. Anything else you'd like?",
    timestamp: "2025-04-10T10:45:00",
    read: true
  },
  {
    id: "5",
    contactId: "contact1",
    sender: "contact1",
    content: "That's all for now. Thank you so much! See you Friday.",
    timestamp: "2025-04-10T10:50:00",
    read: true
  },
  {
    id: "6",
    contactId: "contact2",
    sender: "contact2",
    content: "Good morning! Do you have any fresh eggs available?",
    timestamp: "2025-04-11T09:15:00",
    read: false
  }
];

const contactsData = [
  {
    id: "contact1",
    name: "Sarah Johnson",
    avatar: "/placeholder.svg",
    lastActive: "2 min ago",
    status: "online"
  },
  {
    id: "contact2",
    name: "Michael Wong",
    avatar: "/placeholder.svg",
    lastActive: "1 hour ago",
    status: "offline"
  },
  {
    id: "contact3",
    name: "Emily Davis",
    avatar: "/placeholder.svg",
    lastActive: "3 hours ago",
    status: "offline"
  },
  {
    id: "contact4",
    name: "Robert Brown",
    avatar: "/placeholder.svg",
    lastActive: "1 day ago",
    status: "offline"
  }
];

const Messages = () => {
  const navigate = useNavigate();
  const [selectedContact, setSelectedContact] = useState<string | null>("contact1");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [messages, setMessages] = useState(messagesData);
  const [contacts, setContacts] = useState(contactsData);
  
  // Filter contacts based on search query
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Get messages for selected contact
  const contactMessages = messages.filter(msg => 
    msg.contactId === selectedContact
  ).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  
  // Get selected contact info
  const currentContact = contacts.find(contact => contact.id === selectedContact);
  
  const handleSendMessage = () => {
    if (!message.trim() || !selectedContact) return;
    
    const newMessage = {
      id: Date.now().toString(),
      contactId: selectedContact,
      sender: "user",
      content: message,
      timestamp: new Date().toISOString(),
      read: true
    };
    
    setMessages([...messages, newMessage]);
    setMessage("");
  };
  
  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  useEffect(() => {
    // Scroll to bottom of message container when messages change
    const messageContainer = document.getElementById('message-container');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }, [contactMessages]);
  
  // Check if user is authenticated
  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="container py-6">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      
      <Card className="grid grid-cols-1 md:grid-cols-4 h-[calc(100vh-200px)]">
        {/* Contacts sidebar */}
        <div className="md:col-span-1 border-r">
          <div className="p-4">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search conversations..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <div className="space-y-1">
              {filteredContacts.map(contact => (
                <button
                  key={contact.id}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg text-left ${
                    selectedContact === contact.id ? 'bg-muted' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedContact(contact.id)}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarImage src={contact.avatar} alt={contact.name} />
                      <AvatarFallback>{contact.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    {contact.status === "online" && (
                      <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{contact.name}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {contact.lastActive}
                    </p>
                  </div>
                  {messages.some(msg => msg.contactId === contact.id && msg.sender !== "user" && !msg.read) && (
                    <span className="h-2 w-2 bg-primary rounded-full"></span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Chat area */}
        <div className="md:col-span-3 flex flex-col">
          {selectedContact ? (
            <>
              {/* Chat header */}
              <div className="border-b p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={currentContact?.avatar} alt={currentContact?.name} />
                    <AvatarFallback>{currentContact?.name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{currentContact?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {currentContact?.status === "online" ? "Online" : `Last seen ${currentContact?.lastActive}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Phone className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Video className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              
              {/* Messages */}
              <div id="message-container" className="flex-1 overflow-auto p-4 space-y-4">
                {contactMessages.map(msg => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[70%] rounded-lg p-3 ${
                        msg.sender === "user" 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted"
                      }`}
                    >
                      <p>{msg.content}</p>
                      <p className={`text-xs mt-1 ${
                        msg.sender === "user" 
                          ? "text-primary-foreground/70" 
                          : "text-muted-foreground"
                      }`}>
                        {formatMessageTime(msg.timestamp)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message input */}
              <div className="border-t p-4">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Input 
                    placeholder="Type a message..." 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSendMessage();
                      }
                    }}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    size="icon"
                    disabled={!message.trim()}
                    onClick={handleSendMessage}
                  >
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <p className="text-muted-foreground">Select a conversation</p>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default Messages;
