import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, FileText } from "lucide-react";

const DocumentList = () => {
  const [documents, setDocuments] = useState([
    { id: 1, title: "Project Proposal", lastUpdated: "2023-04-15" },
    { id: 2, title: "Technical Specifications", lastUpdated: "2023-04-10" },
    { id: 3, title: "User Guide", lastUpdated: "2023-04-05" },
  ]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Documents</h2>
      <ul className="space-y-4">
        {documents.map((doc) => (
          <li key={doc.id} className="flex items-center justify-between">
            <div className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-gray-400" />
              <div>
                <h3 className="font-medium">{doc.title}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Last updated: {doc.lastUpdated}
                </span>
              </div>
            </div>
            <Button variant="outline" size="sm">
              View
            </Button>
          </li>
        ))}
      </ul>
      <Button className="w-full mt-4">
        <Plus className="h-4 w-4 mr-2" /> New Document
      </Button>
    </div>
  );
};

export default DocumentList;
