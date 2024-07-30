import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Check } from "lucide-react";
import ProjectList from "./ProjectList";
import ProjectView from "./ProjectView";
import IssueList from "./IssueList";
import IssueView from "./IssueView";
import DocumentList from "./DocumentList";
import MilestoneView from "./MilestoneView";
import NewIssueModal from "./NewIssueModal";

const TeamList = ({
  activeView,
  projects,
  issues,
  groupedIssues,
  selectedProjectId,
  selectedIssueId,
  onSelectProject,
  onAddNewProject,
  onUpdateProject,
  onSelectIssue,
  onAddNewIssue,
  onUpdateIssue,
}) => {
  const [teams, setTeams] = useState([
    { id: 1, name: "Engineering" },
    { id: 2, name: "Design" },
    { id: 3, name: "Marketing" },
  ]);
  const [selectedTeam, setSelectedTeam] = useState(teams[0].id);

  const handleTeamSelect = (teamId) => {
    setSelectedTeam(teamId);
  };

  const filteredProjects = projects.filter(project => project.teamId === selectedTeam);
  const filteredIssues = issues.filter(issue => {
    const project = projects.find(p => p.id === issue.projectId);
    return project && project.teamId === selectedTeam;
  });

  const filteredGroupedIssues = Object.entries(groupedIssues).reduce((acc, [status, statusIssues]) => {
    acc[status] = statusIssues.filter(issue => {
      const project = projects.find(p => p.id === issue.projectId);
      return project && project.teamId === selectedTeam;
    });
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-4 gap-8">
      <div className="col-span-1 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Teams</h2>
        <ul className="space-y-2">
          {teams.map((team) => (
            <li
              key={team.id}
              className={`flex items-center justify-between p-2 rounded-md ${
                selectedTeam === team.id
                  ? "bg-blue-100 dark:bg-blue-900"
                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <span className="flex items-center">
                {selectedTeam === team.id && (
                  <Check className="h-4 w-4 mr-2 text-blue-500" />
                )}
                {team.name}
              </span>
              <Button
                variant={selectedTeam === team.id ? "default" : "ghost"}
                size="sm"
                onClick={() => handleTeamSelect(team.id)}
              >
                {selectedTeam === team.id ? "Active" : "View"}
              </Button>
            </li>
          ))}
        </ul>
        <Button className="w-full mt-4">
          <Plus className="h-4 w-4 mr-2" /> Add Team
        </Button>
      </div>
      {selectedTeam && (
        <div className="col-span-3">
          {activeView === "projects" && (
            <ProjectList
              projects={filteredProjects}
              onSelectProject={onSelectProject}
              onAddNewProject={onAddNewProject}
              selectedTeam={selectedTeam}
            />
          )}
          {activeView === "project" && (
            <ProjectView
              projectId={selectedProjectId}
              onUpdate={onUpdateProject}
              projects={filteredProjects}
              issues={filteredIssues}
              onSelectIssue={onSelectIssue}
              selectedTeam={selectedTeam}
            />
          )}
          {activeView === "issues" && (
            <>
              <h2 className="text-2xl font-bold mb-4">Issues</h2>
              <div className="flex justify-between items-center mb-4">
                <NewIssueModal onAddNewIssue={onAddNewIssue} projects={filteredProjects} selectedTeam={selectedTeam} />
              </div>
              <IssueList
                groupedIssues={filteredGroupedIssues}
                onSelectIssue={onSelectIssue}
                onAddNewIssue={onAddNewIssue}
                projects={filteredProjects}
              />
            </>
          )}
          {activeView === "issue" && <IssueView issueId={selectedIssueId} onUpdate={onUpdateIssue} projects={filteredProjects} selectedTeam={selectedTeam} />}
          {activeView === "documents" && <DocumentList selectedTeam={selectedTeam} />}
          {activeView === "milestones" && <MilestoneView selectedTeam={selectedTeam} />}
        </div>
      )}
    </div>
  );
};

export default TeamList;
