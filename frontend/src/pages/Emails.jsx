import { useEffect, useState } from "react";

export default function Emails() {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8000/api/gmail/emails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();

    setEmails(data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-4xl font-bold mb-8">Gmail Messages</h1>

      <div className="space-y-4">
        {emails.map((email) => (
          <div key={email.id} className="bg-zinc-800 p-5 rounded-xl">
            <h2 className="font-bold text-lg">{email.subject}</h2>

            <p className="text-zinc-400">{email.from}</p>

            <p className="text-zinc-300 mt-2">{email.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
