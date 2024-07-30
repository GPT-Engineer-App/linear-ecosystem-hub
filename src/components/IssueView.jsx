import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const IssueView = ({ issueId, onUpdate }) => {
  const [issue, setIssue] = useState({
    id: issueId,
    title: "Fix login bug",
    description: "Users are unable to log in using their email addresses.",
    status: "Open",
    priority: "High",
    assignee: "John Doe",
  });

  const handleInputChange = (e) => {
    setIssue({ ...issue, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name, value) => {
    setIssue({ ...issue, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(issue);
    toast.success("Issue updated successfully");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <h2 className="text-2xl font-semibold mb-4">Issue #{issue.id}</h2>
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">Title</label>
          <Input
            id="title"
            name="title"
            value={issue.title}
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
            value={issue.description}
            onChange={handleInputChange}
            className="w-full"
            rows={4}
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="status" className="block text-sm font-medium mb-1">Status</label>
            <Select name="status" value={issue.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium mb-1">Priority</label>
            <Select name="priority" value={issue.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div>
          <label htmlFor="assignee" className="block text-sm font-medium mb-1">Assignee</label>
          <Input
            id="assignee"
            name="assignee"
            value={issue.assignee}
            onChange={handleInputChange}
            className="w-full"
            required
          />
        </div>
        <Button type="submit" className="w-full">Save Changes</Button>
      </div>
    </form>
  );
};

export default IssueView;
