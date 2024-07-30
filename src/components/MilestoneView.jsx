import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MilestoneView = () => {
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Alpha Release", startDate: "2023-05-01", endDate: "2023-05-15" },
    { id: 2, title: "Beta Testing", startDate: "2023-05-16", endDate: "2023-06-15" },
    { id: 3, title: "Final Release", startDate: "2023-06-16", endDate: "2023-06-30" },
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Milestones</h2>
      <div className="space-y-4">
        {milestones.map((milestone) => (
          <div key={milestone.id} className="flex items-center">
            <div className="w-1/4 text-sm text-gray-500 dark:text-gray-400">
              {milestone.startDate}
            </div>
            <div className="w-1/2 bg-blue-100 dark:bg-blue-900 p-2 rounded">
              <h3 className="font-medium">{milestone.title}</h3>
            </div>
            <div className="w-1/4 text-sm text-gray-500 dark:text-gray-400 text-right">
              {milestone.endDate}
            </div>
          </div>
        ))}
      </div>
      <Button className="w-full mt-4">
        <Plus className="h-4 w-4 mr-2" /> New Milestone
      </Button>
    </div>
  );
};

export default MilestoneView;
