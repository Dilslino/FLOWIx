import React from 'react';

interface AdminPanelProps {
  subscribedEmails: string[];
}

const AdminPanel: React.FC<AdminPanelProps> = ({ subscribedEmails }) => {
  return (
    <div className="admin-panel">
      <h2 className="text-2xl font-bold mb-4">Panel Admin</h2>
      <h3 className="text-xl font-semibold mb-2">Email Terdaftar:</h3>
      {subscribedEmails.length > 0 ? (
        <ul className="list-disc pl-5">
          {subscribedEmails.map((email, index) => (
            <li key={index}>{email}</li>
          ))}
        </ul>
      ) : (
        <p>Belum ada email yang terdaftar.</p>
      )}
    </div>
  );
};

export default AdminPanel;
