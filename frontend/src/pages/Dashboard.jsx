import React from 'react'
import useAuth from '../hooks/useAuth'
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import EmailTable from "../components/email/EmailTable";
import ComposeEmailModal from '../components/email/ComposeEmailModal';
import { fetchScheduledEmails, fetchSentEmails } from '../services/api';

const columns = [
  { key: "email", label: "Email" },
  { key: "subject", label: "Subject" },
  { key: "time", label: "Scheduled Time" },
  { key: "status", label: "Status" },
];

const mockData = [];


export default function Dashboard() {

  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [active, setActive] = useState("scheduled");
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [scheduledEmails, setScheduledEmails] = useState([]);
  const [sentEmails, setSentEmails] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  useEffect(() => {
    async function loadEmails() {
      setLoading(true);
      if (active === "scheduled") {
        setScheduledEmails(await fetchScheduledEmails());
      } else {
        setSentEmails(await fetchSentEmails());
      }
      setLoading(false);
    }

    loadEmails();
  }, [active]);


  if (!user) {
    return null;
  }
  return (
    <DashboardLayout>
      <div className='flex justify-between items-center mb-6'>
        <h2 className='text-2xl font-semibold'>
          Emails
        </h2>
        <button onClick={() => setIsComposeOpen(true)} className='bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700'>+ Compose New Email</button>
      </div>

      <div className='flex gap-6 border-b mb-6'>
        <button className={`cursor-pointer pb-2 ${active === "scheduled" ? "border-b-2 border-blue-600 font-medium" : "text-gray-500"} `} onClick={() => setActive("scheduled")}>
          Scheduled Emails
        </button>

        <button onClick={() => setActive("sent")} className={
          `pb-2 cursor-pointer ${active === "sent" ? "border-b-2 border-blue-600 font-medium" : "text-gray-500"} `
        }>
          Sent Mails
        </button>
      </div>

      <EmailTable
        columns={columns}
        data={active === "scheduled" ? scheduledEmails : sentEmails}
        loading={loading}
      />

      <ComposeEmailModal isOpen={isComposeOpen} onClose={() => setIsComposeOpen(false)} />

    </DashboardLayout>
  )
}
