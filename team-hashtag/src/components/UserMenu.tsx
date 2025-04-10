"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function UserMenu({ name }: { name: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <Button onClick={() => setOpen(!open)} className="bg-gray-100 text-gray-800">
        {name}
      </Button>
      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md z-20">
           
          <button
            onClick={() => signOut()}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
