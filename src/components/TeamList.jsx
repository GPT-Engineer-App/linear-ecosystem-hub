import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const TeamList = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: "Engineering" },
    { id: 2, name: "Design" },
    { id: 3, name: "Marketing" },
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Teams</h2>
      <ul className="space-y-2">
        {teams.map((team) => (
          <li key={team.id} className="flex items-center justify-between">
            <span>{team.name}</span>
            <Button variant="ghost" size="sm">
              View
            </Button>
          </li>
        ))}
      </ul>
      <Button className="w-full mt-4">
        <Plus className="h-4 w-4 mr-2" /> Add Team
      </Button>
    </div>
  );
};

export default TeamList;
