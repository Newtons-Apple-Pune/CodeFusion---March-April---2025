
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import { UserMenu } from "@/components/UserMenu";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <header className="w-full px-6 py-4 shadow-md bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight text-blue-700">CyberSecureDocs</h1>
          <div className="flex gap-4 items-center">
            {!session ? (
              <>
                <Link href="/login" className="text-sm text-gray-600 hover:text-blue-700">Login</Link>
                <Link href="/signup" className="px-4 py-2 text-sm bg-blue-700 text-white rounded-xl hover:bg-blue-800 transition">Get Started</Link>
              </>
            ) : (
              <UserMenu name={session.user?.name || "User"} />
            )}
          </div>
        </div>
      </header>
         
      <section className="w-full py-24 px-6 bg-gradient-to-b from-blue-50 to-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-extrabold tracking-tight text-gray-900 leading-tight">
            Secure. Analyze. Protect.
          </h2>
          <p className="mt-6 text-lg text-gray-700">
            Upload and analyze sensitive documents with real-time AI-powered insights, all under the strongest enterprise-grade security protocols.
          </p>
          <div className="mt-10 flex justify-center gap-6 flex-wrap">
            <a href="/api/upload" className="px-6 py-3 text-white bg-blue-700 rounded-xl text-base font-semibold hover:bg-blue-800 transition">
              Upload Logs
            </a>
            <a href="/history" className="px-6 py-3 text-white bg-green-600 rounded-xl text-base font-semibold hover:bg-green-700 transition">
              View History
            </a>
            <a href="/image-check" className="px-6 py-3 text-white bg-purple-600 rounded-xl text-base font-semibold hover:bg-purple-700 transition">
              Check Image Integrity
            </a>
          </div>
          {!session && (
            <div className="mt-6 flex justify-center gap-6 flex-wrap">
              <a href="/signup" className="px-6 py-3 text-blue-700 border border-blue-700 rounded-xl text-base font-semibold hover:bg-blue-50 transition">
                Sign Up
              </a>
              <a href="/login" className="px-6 py-3 text-gray-700 border border-gray-300 rounded-xl text-base font-semibold hover:bg-gray-100 transition">
                Log In
              </a>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
