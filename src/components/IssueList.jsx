import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const IssueList = ({ issues, onSelectIssue }) => {
  const addNewIssue = () => {
    // This function should be implemented in the parent component
    console.log("Add new issue");
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Issues</h2>
      <ul className="space-y-4">
        {issues.map((issue) => (
          <li key={issue.id} className="flex items-center justify-between">
            <div>
              <h3 className="font-medium">{issue.title}</h3>
              <div className="flex space-x-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">{issue.status}</span>
                <span className="text-gray-500 dark:text-gray-400">•</span>
                <span className="text-gray-500 dark:text-gray-400">{issue.priority}</span>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={() => onSelectIssue(issue.id)}>
              View
            </Button>
          </li>
        ))}
      </ul>
      <Button className="w-full mt-4" onClick={addNewIssue}>
        <Plus className="h-4 w-4 mr-2" /> New Issue
      </Button>
    </div>
  );
};

export default IssueList;
