"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/AppLayout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { THEME_COLORS } from "@/lib/theme"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Filter, Search, FileText, Download, Eye, Archive, Clock, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useRole } from "@/hooks/use-role"
import DocumentUpload from "@/components/documents/DocumentUpload"

type DocumentType = "policy" | "form" | "template" | "report" | "other";

interface Document {
  id: number;
  name: string;
  type: DocumentType;
  description: string;
  uploadedBy: string;
  uploadDate: string;
  size: string;
  status: "active" | "archived";
}

// Mock data for documents
const initialDocuments: Document[] = [
  // ... keep existing code (the document objects array)
];

const Documents = () => {
  const { toast } = useToast()
  const { isAdminOrHR } = useRole()
  const [documents, setDocuments] = useState<Document[]>(initialDocuments)
  const [searchTerm, setSearchTerm] = useState("")
  const [showArchived, setShowArchived] = useState(false)
  const [selectedType, setSelectedType] = useState<DocumentType | "all">("all")
  const [showUploadForm, setShowUploadForm] = useState(false)

  // Filter documents based on search term, archive status, and type
  const filteredDocuments = documents.filter(
    (doc) =>
      (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (showArchived || doc.status === "active") &&
      (selectedType === "all" || doc.type === selectedType)
  )

  const handleDownload = (document: Document) => {
    toast({
      title: "Download started",
      description: `${document.name} is downloading...`,
    })
  }

  const handleView = (document: Document) => {
    toast({
      title: "Opening document",
      description: `${document.name} is opening in a new tab`,
    })
  }

  const handleArchive = (id: number) => {
    setDocuments(
      documents.map((doc) => (doc.id === id ? { ...doc, status: doc.status === "active" ? "archived" : "active" } : doc))
    )
    const document = documents.find((doc) => doc.id === id)
    const newStatus = document?.status === "active" ? "archived" : "active"
    toast({
      title: newStatus === "archived" ? "Document archived" : "Document restored",
      description: `${document?.name} has been ${newStatus === "archived" ? "archived" : "restored"}`,
    })
  }

  const handleAddDocument = (newDocument: Document) => {
    setDocuments([newDocument, ...documents]);
    setShowUploadForm(false);
  };

  // Get document type badge color
  const getTypeColor = (type: DocumentType) => {
    switch (type) {
      case "policy":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "form":
        return "bg-green-100 text-green-800 border-green-200"
      case "template":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "report":
        return "bg-amber-100 text-amber-800 border-amber-200"
      case "other":
        return "bg-slate-100 text-slate-800 border-slate-200"
    }
  }

  // Group documents by type for easier browsing
  const documentTypes: { [key in DocumentType | "all"]: { label: string; count: number } } = {
    all: { label: "All Documents", count: filteredDocuments.length },
    policy: { label: "Policies", count: documents.filter((doc) => doc.type === "policy").length },
    form: { label: "Forms", count: documents.filter((doc) => doc.type === "form").length },
    template: { label: "Templates", count: documents.filter((doc) => doc.type === "template").length },
    report: { label: "Reports", count: documents.filter((doc) => doc.type === "report").length },
    other: { label: "Other", count: documents.filter((doc) => doc.type === "other").length },
  }

  return (
    <AppLayout>
      <div className="space-y-6 text-black dark:text-white">
        <div className="flex items-center justify-between animate-fade-in">
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
            Document Repository
          </h1>
          
          {isAdminOrHR() && (
            <Button
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 transition-all duration-300 animate-slide-in-right"
            >
              {showUploadForm ? "Hide Upload Form" : "Upload Document"}
            </Button>
          )}
        </div>

        {showUploadForm && <DocumentUpload onDocumentAdded={handleAddDocument} />}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4 animate-slide-in-left">
            <Card
              className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
            >
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Document Types</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(documentTypes).map(([type, { label, count }]) => (
                  <div
                    key={type}
                    onClick={() => setSelectedType(type as DocumentType | "all")}
                    className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                      selectedType === type
                        ? "bg-blue-100/70 text-blue-800 font-medium dark:bg-blue-900/70 dark:text-blue-200"
                        : "hover:bg-blue-50/50 text-black dark:text-white dark:hover:bg-blue-900/30"
                    }`}
                  >
                    <span>{label}</span>
                    <Badge variant="outline" className="bg-white/70 dark:bg-gray-800/70 text-black dark:text-white">
                      {count}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card
              className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
            >
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-blue-500" />
                  <Input
                    type="search"
                    placeholder="Search documents..."
                    className={`pl-9 ${THEME_COLORS.inputBg} ${THEME_COLORS.inputBorder} focus:ring-2 focus:ring-blue-300 transition-all duration-300 text-black dark:text-white`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div>
                  <h3 className="flex items-center text-sm font-medium mb-2 text-black dark:text-white">
                    <Filter className="h-4 w-4 mr-1 text-blue-500" />
                    Options
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="show-archived"
                        checked={showArchived}
                        onChange={(e) => setShowArchived(e.target.checked)}
                        className="mr-2 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <label htmlFor="show-archived" className="text-sm text-black dark:text-white">
                        Show archived documents
                      </label>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3 animate-slide-in-right">
            <Card
              className={`${THEME_COLORS.cardGradient} ${THEME_COLORS.cardBorder} ${THEME_COLORS.cardShadow} transition-all duration-300 hover:shadow-lg`}
            >
              <CardHeader>
                <CardTitle className="text-black dark:text-white">Documents</CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-300">
                  {filteredDocuments.length} documents found
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredDocuments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                      <FileText className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                      <p>No documents found matching your filters</p>
                    </div>
                  ) : (
                    // ... keep existing code (the document list rendering)
                    filteredDocuments.map((document) => (
                      <div
                        key={document.id}
                        className={`border rounded-lg p-4 ${
                          document.status === "archived" ? "bg-slate-50/80 dark:bg-gray-800/80" : "bg-white dark:bg-gray-800"
                        } hover:shadow-md transition-all duration-300`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-start">
                              <FileText className="h-5 w-5 mt-0.5 mr-2 text-blue-500 flex-shrink-0" />
                              <div>
                                <h3 className="font-medium text-black dark:text-white flex items-center">
                                  {document.name}
                                  {document.status === "archived" && (
                                    <Badge variant="outline" className="ml-2 bg-slate-200 text-slate-600 dark:bg-slate-700 dark:text-slate-300">
                                      Archived
                                    </Badge>
                                  )}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{document.description}</p>
                                
                                <div className="flex flex-wrap items-center gap-2 mt-2">
                                  <Badge
                                    variant="outline"
                                    className={`${getTypeColor(document.type)}`}
                                  >
                                    {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
                                  </Badge>
                                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <Clock className="h-3 w-3 mr-1" />
                                    {document.uploadDate}
                                  </div>
                                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    {document.uploadedBy}
                                  </div>
                                  <div className="text-xs text-gray-500 dark:text-gray-400">{document.size}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex flex-wrap gap-2 md:justify-end">
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center border-blue-300 text-blue-700 hover:bg-blue-50 dark:border-blue-700 dark:text-blue-400 dark:hover:bg-blue-900/30 transition-all duration-300"
                              onClick={() => handleView(document)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </Button>
                            
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex items-center border-green-300 text-green-700 hover:bg-green-50 dark:border-green-700 dark:text-green-400 dark:hover:bg-green-900/30 transition-all duration-300"
                              onClick={() => handleDownload(document)}
                            >
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </Button>
                            
                            {isAdminOrHR() && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center border-amber-300 text-amber-700 hover:bg-amber-50 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/30 transition-all duration-300"
                                onClick={() => handleArchive(document.id)}
                              >
                                <Archive className="h-4 w-4 mr-1" />
                                {document.status === "active" ? "Archive" : "Restore"}
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  )
}

export default Documents