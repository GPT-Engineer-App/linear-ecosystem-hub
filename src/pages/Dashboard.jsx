import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import TeamList from "../components/TeamList";
import ProjectList from "../components/ProjectList";
import IssueList from "../components/IssueList";
import IssueView from "../components/IssueView";
import DocumentList from "../components/DocumentList";
import MilestoneView from "../components/MilestoneView";

const Dashboard = () => {
  const [activeView, setActiveView] = useState("projects");
  const [selectedIssueId, setSelectedIssueId] = useState(null);
  const [issues, setIssues] = useState([
    { id: 1, title: "Fix login bug", status: "Open", priority: "High" },
    { id: 2, title: "Implement search feature", status: "In Progress", priority: "Medium" },
    { id: 3, title: "Update documentation", status: "Closed", priority: "Low" },
    { id: 4, title: "Refactor API endpoints", status: "Open", priority: "Medium" },
    { id: 5, title: "Optimize database queries", status: "In Progress", priority: "High" },
  ]);

  const addNewIssue = () => {
    const newIssue = {
      id: issues.length + 1,
      title: `New Issue ${issues.length + 1}`,
      status: "Open",
      priority: "Medium",
    };
    setIssues([...issues, newIssue]);
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

  const handleUpdateIssue = (updatedIssue) => {
    setIssues(issues.map(issue => issue.id === updatedIssue.id ? updatedIssue : issue));
    setActiveView("issues");
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
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
                variant={activeView === "projects" ? "default" : "ghost"}
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
        <div className="grid grid-cols-4 gap-8">
          <div className="col-span-1">
            <TeamList />
          </div>
          <div className="col-span-3">
            {activeView === "projects" && <ProjectList />}
            {activeView === "issues" && <IssueList groupedIssues={groupedIssues} onSelectIssue={handleSelectIssue} onAddNewIssue={addNewIssue} />}
            {activeView === "issue" && <IssueView issueId={selectedIssueId} onUpdate={handleUpdateIssue} />}
            {activeView === "documents" && <DocumentList />}
            {activeView === "milestones" && <MilestoneView />}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
