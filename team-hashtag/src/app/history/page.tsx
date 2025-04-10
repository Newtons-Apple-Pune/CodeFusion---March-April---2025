

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserMenu } from "@/components/UserMenu";

export default async function HistoryPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const logs = await prisma.uploadedLog.findMany({
    where: {
      user: {
        email: session.user.email,
      },
    },
    orderBy: {
      uploadedAt: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="w-full px-6 py-4 shadow-md bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-blue-700">CyberSecureDocs</h1>
          <UserMenu name={session.user.name || "User"} />
        </div>
      </header>

      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">Upload History</h2>

        {logs.length === 0 ? (
          <p className="text-gray-600">No uploads found.</p>
        ) : (
          <ul className="space-y-4">
            {logs.map((log) => (
              <li key={log.id} className="border rounded-xl p-4 shadow-sm">
                <p className="font-semibold text-lg">{log.filename}</p>
                <p className="text-sm text-gray-600">
                  {new Date(log.uploadedAt).toLocaleString()}
                </p>
                <p className="mt-2 text-gray-800">Findings: {log.findings}</p>
                <a
                  href={log.filepath}
                  download
                  className="text-blue-600 hover:underline text-sm mt-2 block"
                >
                  Download File
                </a>
                {log.reportPath && (
                  <a
                    href={log.reportPath}
                    download
                    className="text-green-600 hover:underline text-sm mt-1 block"
                  >
                    Download Report
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}

