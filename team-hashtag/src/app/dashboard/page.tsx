"use client";

import { useEffect, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogOut, ImageIcon } from "lucide-react";

interface Document {
  id: string;
  filename: string;
  findings: string;
  filepath: string;
  reportPath: string;
  uploadedAt?: string;
}

interface ImageFile {
  id: string;
  filename: string;
  isCorrupted: boolean;
  filepath: string;
  uploadedAt?: string;
}

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [documents, setDocuments] = useState<Document[]>([]);
  const [images, setImages] = useState<ImageFile[]>([]);

  useEffect(() => {
    async function fetchData() {
      const docRes = await fetch("/api/user/documents");
      const imageRes = await fetch("/api/user/images");
      const docs = await docRes.json();
      const imgs = await imageRes.json();
      setDocuments(docs);
      setImages(imgs);
    }
    if (session?.user) fetchData();
  }, [session]);

  if (status === "loading") return <div className="p-8">Loading...</div>;
  if (!session) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {session.user?.name || "User"}
        </h1>
        <Button variant="outline" onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </Button>
      </header>

      <Tabs defaultValue="documents">
        <TabsList className="mb-4">
          <TabsTrigger value="documents">My Documents</TabsTrigger>
          <TabsTrigger value="images">Images Uploaded</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <Card>
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.length > 0 ? (
                documents.map(doc => (
                  <div
                    key={doc.id}
                    className="border rounded-lg p-4 bg-white shadow-sm"
                  >
                    <h3 className="text-lg font-semibold text-gray-800">
                      {doc.filename}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Findings: {doc.findings.slice(0, 100)}...
                    </p>
                    <a
                      href={doc.reportPath}
                      className="text-sm text-blue-600 underline mt-2 inline-block"
                      download
                    >
                      Download Report
                    </a>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No documents uploaded yet.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardContent className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {images.map((img) => (
                <div key={img.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                    <ImageIcon className="w-4 h-4" /> {img.filename}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Uploaded: {img.uploadedAt ? new Date(img.uploadedAt).toLocaleDateString() : 'N/A'}
                  </p>
                  <p className="text-sm">
                    Status: <span className={img.isCorrupted ? 'text-red-600' : 'text-green-600'}>
                      {img.isCorrupted ? 'Corrupted' : 'Valid'}
                    </span>
                  </p>
                  <a
                    href={img.filepath}
                    className="text-sm text-blue-600 underline mt-2 inline-block"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Image
                  </a>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
