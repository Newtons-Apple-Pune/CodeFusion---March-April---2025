'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function UploadForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        content,
        ownerId: 1, 
      }),
    });

    if (res.ok) {
      alert('Document uploaded!');
    } else {
      alert('Upload failed.');
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Document Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full"
      />
      <textarea
        placeholder="Paste document content here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 w-full h-40"
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}
