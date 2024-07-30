import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";
import TeamList from "../components/TeamList";
import ProjectList from "../components/ProjectList";
import ProjectView from "../components/ProjectView";
import IssueList from "../components/IssueList";
import IssueView from "../components/IssueView";
import DocumentList from "../components/DocumentList";
import MilestoneView from "../components/MilestoneView";
import NewIssueModal from "../components/NewIssueModal";
import { toast } from "sonner";

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeView, setActiveView] = useState("projects");
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projects, setProjects] = useState([
    { id: 1, name: "Website Redesign", status: "In Progress" },
    { id: 2, name: "Mobile App Development", status: "Planning" },
    { id: 3, name: "Data Migration", status: "Completed" },
  ]);

  const [issues, setIssues] = useState([
    { id: 1, title: "Fix login bug", status: "Open", priority: "High", projectId: 1 },
    { id: 2, title: "Implement search feature", status: "In Progress", priority: "Medium", projectId: 1 },
    { id: 3, title: "Update documentation", status: "Closed", priority: "Low", projectId: 2 },
    { id: 4, title: "Refactor API endpoints", status: "Open", priority: "Medium", projectId: 2 },
    { id: 5, title: "Optimize database queries", status: "In Progress", priority: "High", projectId: 3 },
  ].filter(issue => issue && issue.title !== undefined));

  const addNewIssue = (newIssue) => {
    const issueWithId = {
      ...newIssue,
      id: issues.length + 1,
      projectId: newIssue.projectId || projects[0].id,
    };
    setIssues([...issues, issueWithId]);
    toast.success("New issue created successfully");
    setActiveView("issues");
  };

  const addNewProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: `New Project ${projects.length + 1}`,
      status: "Planning",
      description: "",
    };
    setProjects([...projects, newProject]);
    setSelectedProjectId(newProject.id);
    setActiveView("project");
  };

  const groupedIssues = useMemo(() => {
    return issues.reduce((acc, issue) => {
      if (!acc[issue.status]) {
        acc[issue.status] = [];
      }
      acc[issue.status].push(issue);
      return acc;
    }, {});
  }, [issues]);

  const handleSelectIssue = (issueId) => {
    setSelectedIssueId(issueId);
    setActiveView("issue");
  };

  const handleSelectProject = (projectId) => {
    setSelectedProjectId(projectId);
    setActiveView("project");
  };

  const handleUpdateIssue = (updatedIssue) => {
    setIssues(issues.map(issue => issue.id === updatedIssue.id ? updatedIssue : issue));
    setActiveView("issues");
  };

  const handleUpdateProject = (updatedProject) => {
    setProjects(projects.map(project => project.id === updatedProject.id ? updatedProject : project));
    setActiveView("projects");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate("/")} className="p-2">
              <Home className="h-5 w-5" />
            </Button>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          </div>
          <div className="flex space-x-4">
            <Input
              type="text"
              placeholder="Search..."
              className="w-64"
              icon={<Search className="h-4 w-4 text-gray-400" />}
            />
            <Button>
              <Plus className="h-4 w-4 mr-2" /> New
            </Button>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <nav className="mb-8">
          <ul className="flex space-x-4">
            <li>
              <Button
                variant={activeView === "projects" || activeView === "project" ? "default" : "ghost"}
                onClick={() => setActiveView("projects")}
              >
                Projects
              </Button>
            </li>
            <li>
              <Button
                variant={activeView === "issues" || activeView === "issue" ? "default" : "ghost"}
                onClick={() => setActiveView("issues")}
              >
                Issues
              </Button>
            </li>
            <li>
              <Button
                variant={activeView === "documents" ? "default" : "ghost"}
                onClick={() => setActiveView("documents")}
              >
                Documents
              </Button>
            </li>
            <li>
              <Button
                variant={activeView === "milestones" ? "default" : "ghost"}
                onClick={() => setActiveView("milestones")}
              >
                Milestones
              </Button>
            </li>
          </ul>
        </nav>
        <TeamList
          activeView={activeView}
          projects={projects}
          issues={issues}
          groupedIssues={groupedIssues}
          selectedProjectId={selectedProjectId}
          selectedIssueId={selectedIssueId}
          onSelectProject={handleSelectProject}
          onAddNewProject={addNewProject}
          onUpdateProject={handleUpdateProject}
          onSelectIssue={handleSelectIssue}
          onAddNewIssue={addNewIssue}
          onUpdateIssue={handleUpdateIssue}
        />
      </main>
    </div>
  );
};

export default Dashboard;
