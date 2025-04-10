"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff, Shield, Trash2 } from "lucide-react";
import FeatureHeader from "@/components/shared/FeatureHeader";
import SectionWrapper from "@/components/shared/SectionWrapper";
import { Card } from "@/components/ui/card";
import { CardContent } from "@/components/ui/card-content";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface PasswordEntry {
  id: number;
  platform: string;
  username: string;
  password: string;
}

export default function SecurePasswordVaultPage() {
  const [passwords, setPasswords] = useState<PasswordEntry[]>([]);
  const [showPasswords, setShowPasswords] = useState<boolean[]>([]);
  const [platform, setPlatform] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchPasswords = async () => {
      const res = await fetch("/api/passwords/get");
      if (res.ok) {
        const data = await res.json();
        setPasswords(data);
        setShowPasswords(new Array(data.length).fill(false));
      } else {
        toast.error("Failed to fetch passwords");
      }
    };

    fetchPasswords();
  }, []);

  const togglePassword = (index: number) => {
    const updated = [...showPasswords];
    updated[index] = !updated[index];
    setShowPasswords(updated);
  };

  const handleAddPassword = async () => {
    if (!platform || !username || !password) {
      toast.error("All fields are required.");
      return;
    }

    const res = await fetch("/api/passwords/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ platform, username, password }),
    });

    if (res.ok) {
      toast.success("Password stored successfully!");
      setPlatform("");
      setUsername("");
      setPassword("");

      const updated = await fetch("/api/passwords/get").then((r) => r.json());
      setPasswords(updated);
      setShowPasswords(new Array(updated.length).fill(false));
    } else {
      toast.error("Failed to store password.");
    }
  };

  const deletePassword = async (id: number) => {
    try {
      const userId = Number(localStorage.getItem("userId"));
      const res = await fetch("/api/passwords/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, userId }),
      });

      if (res.ok) {
        toast.success("Password deleted!");
        setPasswords((prev) => prev.filter((item) => item.id !== id));
      } else {
        toast.error("Failed to delete password.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <SectionWrapper>
      <FeatureHeader
        title="Secure Password Vault"
        subtitle="🔐 Safely store and manage your credentials with encryption and sleek design."
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mt-10 p-6 border dark:border-gray-700 rounded-2xl shadow-lg bg-white dark:bg-gray-900"
      >
        <h2 className="text-xl font-bold mb-6 text-indigo-600 dark:text-indigo-400">
          ➕ Add New Entry
        </h2>

        <div className="grid gap-4 md:grid-cols-3">
          <Input
            placeholder="Platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />
          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <Button
          onClick={handleAddPassword}
          className="mt-4 w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
        >
          Store Password
        </Button>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
        {passwords.map((entry, index) => (
          <motion.div
            key={entry.id}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 250 }}
          >
            <Card className="shadow-lg dark:bg-gray-800 border-l-4 border-indigo-500">
              <CardContent className="p-5 space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="text-indigo-500" />
                  <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                    {entry.platform}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Username: <strong>{entry.username}</strong>
                </p>
                <div className="flex items-center gap-3">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Password:{" "}
                    <span className="font-mono">
                      {showPasswords[index] ? entry.password : "••••••••"}
                    </span>
                  </p>
                  <button
                    onClick={() => togglePassword(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    {showPasswords[index] ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                <button
                  onClick={() => deletePassword(entry.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-200"
                >
                  Delete
                </button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
