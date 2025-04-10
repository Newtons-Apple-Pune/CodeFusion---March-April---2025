import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, File, X } from "lucide-react";
import { THEME_COLORS } from "@/lib/theme";
import { useRole } from "@/hooks/use-role";

type DocumentType = "policy" | "form" | "template" | "report" | "other";

interface DocumentUploadProps {
  onDocumentAdded: (document: {
    id: number;
    name: string;
    type: DocumentType;
    description: string;
    uploadedBy: string;
    uploadDate: string;
    size: string;
    status: "active" | "archived";
  }) => void;
}

const DocumentUpload: React.FC<DocumentUploadProps> = ({ onDocumentAdded }) => {
  const { toast } = useToast();
  const { isAdminOrHR } = useRole();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [documentInfo, setDocumentInfo] = useState({
    name: "",
    type: "policy" as DocumentType,
    description: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      // Auto-fill name if not already set
      if (!documentInfo.name) {
        setDocumentInfo({
          ...documentInfo,
          name: file.name.split(".")[0], // Remove extension
        });
      }
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
  };

  const handleInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setDocumentInfo({
      ...documentInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpload = () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }

    if (!documentInfo.name) {
      toast({
        title: "Document name missing",
        description: "Please provide a name for the document",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    // Simulate upload progress
    setTimeout(() => {
      // Create new document object
      const newDocument = {
        id: Date.now(),
        name: documentInfo.name,
        type: documentInfo.type,
        description: documentInfo.description,
        uploadedBy: "Current User",
        uploadDate: new Date().toISOString().split("T")[0],
        size: formatFileSize(selectedFile.size),
        status: "active" as const,
      };

      // Call the parent component's callback
      onDocumentAdded(newDocument);

      // Reset form
      setSelectedFile(null);
      setDocumentInfo({
        name: "",
        type: "policy" as DocumentType,
        description: "",
      });
      setIsUploading(false);

      // Show success toast
      toast({
        title: "Document uploaded",
        description: `${documentInfo.name} has been successfully uploaded`,
      });
    }, 1500);
  };

  // Helper function to format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return bytes + " bytes";
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + " KB";
    else return (bytes / 1048576).toFixed(1) + " MB";
  };

  if (!isAdminOrHR()) {
    return null;
  }

  return (
    <div className={`p-6 border rounded-lg ${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} text-black dark:text-white`}>
      <h3 className="text-lg font-medium mb-4 text-black dark:text-white">Upload New Document</h3>
      
      <div className="space-y-4">
        {/* File Upload Area */}
        <div className="space-y-2">
          <Label htmlFor="file-upload" className="text-black dark:text-white">
            Document File
          </Label>
          {!selectedFile ? (
            <div
              className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-6 text-center cursor-pointer hover:bg-blue-50/50 dark:hover:bg-blue-900/30 transition-colors"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              <Upload className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Drag and drop your file here, or click to browse</p>
              <p className="text-xs text-gray-500 dark:text-gray-500">PDF, DOCX, XLSX, PPTX up to 10MB</p>
              <Input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.docx,.xlsx,.pptx"
              />
            </div>
          ) : (
            <div className="border rounded-lg p-3 bg-slate-50 dark:bg-gray-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <File className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatFileSize(selectedFile.size)}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 rounded-full text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
                onClick={handleRemoveFile}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Document Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="doc-name" className="text-black dark:text-white">
              Document Name
            </Label>
            <Input
              id="doc-name"
              name="name"
              placeholder="Enter document name"
              value={documentInfo.name}
              onChange={handleInfoChange}
              className="bg-white dark:bg-gray-800 text-black dark:text-white"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doc-type" className="text-black dark:text-white">
              Document Type
            </Label>
            <select
              id="doc-type"
              name="type"
              value={documentInfo.type}
              onChange={handleInfoChange}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border-blue-200 dark:border-blue-800"
            >
              <option value="policy">Policy</option>
              <option value="form">Form</option>
              <option value="template">Template</option>
              <option value="report">Report</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="doc-description" className="text-black dark:text-white">
              Description
            </Label>
            <textarea
              id="doc-description"
              name="description"
              placeholder="Brief description of the document"
              value={documentInfo.description}
              onChange={handleInfoChange}
              rows={3}
              className="w-full p-2 border rounded-md bg-white dark:bg-gray-800 text-black dark:text-white border-blue-200 dark:border-blue-800 resize-none"
            />
          </div>
        </div>

        {/* Upload Button */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleUpload}
            disabled={isUploading || !selectedFile}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300"
          >
            {isUploading ? "Uploading..." : "Upload Document"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUpload;