import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const MilestoneView = ({ projectId }) => {
  const [milestones, setMilestones] = useState([
    { id: 1, title: "Alpha Release", startDate: "2023-05-01", endDate: "2023-05-15", projectId: 1 },
    { id: 2, title: "Beta Testing", startDate: "2023-05-16", endDate: "2023-06-15", projectId: 1 },
    { id: 3, title: "Final Release", startDate: "2023-06-16", endDate: "2023-06-30", projectId: 1 },
    { id: 4, title: "Requirements Gathering", startDate: "2023-07-01", endDate: "2023-07-15", projectId: 2 },
    { id: 5, title: "Design Phase", startDate: "2023-07-16", endDate: "2023-08-15", projectId: 2 },
  ]);

  const filteredMilestones = useMemo(() => {
    return milestones.filter(milestone => milestone.projectId === projectId);
  }, [milestones, projectId]);

  const addNewMilestone = () => {
    const lastMilestone = milestones[milestones.length - 1];
    const newStartDate = new Date(lastMilestone.endDate);
    newStartDate.setDate(newStartDate.getDate() + 1);
    const newEndDate = new Date(newStartDate);
    newEndDate.setDate(newEndDate.getDate() + 14);

    const newMilestone = {
      id: milestones.length + 1,
      title: `New Milestone ${milestones.length + 1}`,
      startDate: newStartDate.toISOString().split('T')[0],
      endDate: newEndDate.toISOString().split('T')[0],
      projectId: projectId,
    };
    setMilestones([...milestones, newMilestone]);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <div className="space-y-4">
        {filteredMilestones.map((milestone) => (
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
      <Button className="w-full mt-4" onClick={addNewMilestone}>
        <Plus className="h-4 w-4 mr-2" /> New Milestone
      </Button>
    </div>
  );
};

export default MilestoneView;
