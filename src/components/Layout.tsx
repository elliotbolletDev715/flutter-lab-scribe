
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
import { Sidebar, SidebarContent, SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { Menu, LogOut, FileText, FilePen, User } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-sidebar-accent transition-colors"
  >
    {children}
  </Link>
);

export default function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!user) {
    return <>{children}</>;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar defaultCollapsed={false} collapsible="icon">
          <SidebarContent className="py-6">
            <div className="px-4 mb-8">
              <h1 className="font-bold text-2xl text-sidebar-foreground tracking-tight">Lab Website</h1>
              <p className="text-sidebar-foreground/70 text-sm mt-1">Research & Publications</p>
            </div>
            
            <div className="space-y-1 px-2">
              <NavLink to="/dashboard">
                <FileText className="size-4" />
                <span>Dashboard</span>
              </NavLink>
              
              <NavLink to="/posts">
                <FileText className="size-4" />
                <span>All Posts</span>
              </NavLink>
              
              <NavLink to="/posts/create">
                <FilePen className="size-4" />
                <span>Create Post</span>
              </NavLink>
              
              <NavLink to="/profile">
                <User className="size-4" />
                <span>Profile</span>
              </NavLink>
            </div>
            
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <div className="flex items-center justify-between px-2 py-3">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full bg-sidebar-accent flex items-center justify-center">
                    <span className="text-sm font-medium">{user?.name?.[0] || "U"}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{user?.name}</span>
                    <span className="text-xs opacity-70">{user?.role}</span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="text-sidebar-foreground hover:text-sidebar-foreground/70"
                >
                  <LogOut className="size-4" />
                </Button>
              </div>
            </div>
          </SidebarContent>
        </Sidebar>
        
        <div className="flex-1 overflow-auto">
          <header className="border-b flex items-center justify-between h-14 px-4 md:px-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="size-5" />
                </Button>
              </SidebarTrigger>
            </div>
          </header>
          <main className="p-4 md:p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
