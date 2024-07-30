import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import IssueList from "./IssueList";
import MilestoneView from "./MilestoneView";

const ProjectView = ({ projectId, onUpdate, projects, issues, onSelectIssue }) => {
  const [project, setProject] = useState(
    projects.find((p) => p.id === projectId) || {
      id: projectId,
      name: "",
      description: "",
      status: "Planning",
    }
  );

  const projectIssues = useMemo(() => {
    return issues.filter(issue => issue.projectId === projectId);
  }, [issues, projectId]);

  const groupedIssues = useMemo(() => {
    return projectIssues.reduce((acc, issue) => {
      if (!acc[issue.status]) {
        acc[issue.status] = [];
      }
      acc[issue.status].push(issue);
      return acc;
    }, {});
  }, [projectIssues]);

  const handleInputChange = (e) => {
    setProject({ ...project, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setProject({ ...project, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(project);
    toast.success("Project updated successfully");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-8">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Project: {project.name}</h2>
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <Input
            id="name"
            name="name"
            value={project.name}
            onChange={handleInputChange}
            className="w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            id="description"
            name="description"
            value={project.description}
            onChange={handleInputChange}
            className="w-full"
            rows={4}
          />
        </div>
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
          <Select name="status" value={project.status} onValueChange={(value) => handleSelectChange("status", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Planning">Planning</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full">Save Changes</Button>
      </form>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Project Issues</h3>
        <IssueList
          groupedIssues={groupedIssues}
          onSelectIssue={onSelectIssue}
          projects={projects}
        />
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Project Milestones</h3>
        <MilestoneView projectId={projectId} />
      </div>
    </div>
  );
};

export default ProjectView;
