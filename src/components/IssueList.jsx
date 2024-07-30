import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const IssueList = ({ groupedIssues, onSelectIssue, onAddNewIssue, projects }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Issues</h2>
      {Object.entries(groupedIssues).map(([status, issues]) => (
        <div key={status} className="mb-6">
          <h3 className="text-lg font-medium mb-2">{status}</h3>
          <ul className="space-y-4">
            {issues.filter(issue => issue && issue.title !== undefined).map((issue) => (
              <li key={issue.id} className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">{issue.title}</h4>
                  <div className="flex space-x-2 text-sm">
                    <span className="text-gray-500 dark:text-gray-400">{issue.priority}</span>
                    <span className="text-gray-500 dark:text-gray-400">|</span>
                    <span className="text-gray-500 dark:text-gray-400">
                      {projects.find(p => p.id === issue.projectId)?.name || 'Unknown Project'}
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm" onClick={() => onSelectIssue(issue.id)}>
                  View
                </Button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default IssueList;
