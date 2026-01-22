import React from 'react'
import { useState } from 'react'
import Modal from '../common/Modal';
import CsvUpload from './CsvUpload';
import { scheduleEmail } from '../../services/api';

export default function ComposeEmailModal({ isOpen, onClose }) {

  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [emails, setEmails] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [delay, setDelay] = useState(2);
  const [hourlyLimit, setHourlyLimit] = useState(200);
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Compose New Email">
      <div className='space-y-4'>
        {/* subject */}

        <div className='block text-sm font-medium mb-1'>
          <label className='block text-sm font-medium mb-1'>
            Subject
          </label>

          <input className='w-full border rounded px-3 py-2' onChange={e => setSubject(e.target.value)} value={subject} type="text" />
        </div>

        {/* body */}

        <div>
          <label className='block text-sm font-medium mb-1'>
            Body
          </label>
          <textarea rows={4} value={body} onChange={e => setBody(e.target.value)} className='w-full border rounded px-3 py-2' />

        </div>

        {/* csv upload */}

        <CsvUpload onEmailsParsed={setEmails} />

        {emails.length > 0 && (
          <p className='text-sm text-green-600'>{emails.length} emails detected</p>
        )}

        {/* scheduling */}

        <div className='grid grid-cols-2 gap-4'>

          <div>
            <label className='block text-sm font-medium mb-1'>Start time</label>
            <input type='datetime-local' className='w-full border rounded px-3 py-2' value={startTime} onChange={e => setStartTime(e.target.value)} />
          </div>
        </div>

        <div className='block text-sm font-medium mb-1'>

          <label className='block text-sm font-medium mb-1'>Delay (seconds)</label>
          <input
            type="number"
            value={hourlyLimit}
            onChange={e => setHourlyLimit(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        {/* Action */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md"
          onClick={async () => {
            if (!emails.length) {
              alert("Please upload at least one email");
              return;
            }

            for (let i = 0; i < emails.length; i++) {
              await scheduleEmail({
                sender_email: "noreply@reachinbox.com",
                recipient_email: emails[i],
                subject,
                body,
                scheduled_at: new Date(
                  new Date(startTime).getTime() + i * delay * 1000
                ),
              });
            }

            onClose();
          }}
        >
          Schedule Emails
        </button>


      </div>

    </Modal>
  )
}
