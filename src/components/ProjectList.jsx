import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ProjectList = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: "Website Redesign", status: "In Progress" },
    { id: 2, name: "Mobile App Development", status: "Planning" },
    { id: 3, name: "Data Migration", status: "Completed" },
  ]);

  const addNewProject = () => {
    const newProject = {
      id: projects.length + 1,
      name: `New Project ${projects.length + 1}`,
      status: "Planning",
    };
    setProjects([...projects, newProject]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Projects</h2>
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{project.name}</h3>
              <span className="text-sm text-gray-500 dark:text-gray-400">{project.status}</span>
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </li>
        ))}
      </ul>
      <Button className="w-full mt-4" onClick={addNewProject}>
        <Plus className="h-4 w-4 mr-2" /> New Project
      </Button>
    </div>
  );
};

export default ProjectList;
