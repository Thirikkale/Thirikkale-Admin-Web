import React, { useEffect, useState } from 'react';
import { usePageHeader } from '@/components/providers/PageHeaderProvider';

const settingsList = [
  { label: 'Enable Email Notifications', key: 'emailNotifications', value: true },
  { label: 'Allow User Self-Registration', key: 'selfRegistration', value: false },
  { label: 'Require Document Verification', key: 'requireVerification', value: true },
  { label: 'Enable Dark Mode', key: 'darkMode', value: false },
];

export default function Settings() {
  const { setPageHeader } = usePageHeader();
  const [settings, setSettings] = useState(settingsList);

  useEffect(() => {
    setPageHeader({
      title: 'Settings',
      subtitle: 'Configure user handler preferences and system options.',
    });
  }, [setPageHeader]);

  const handleToggle = (key: string) => {
    setSettings((prev) =>
      prev.map((s) => (s.key === key ? { ...s, value: !s.value } : s))
    );
  };

  return (
    <div className="space-y-6 max-w-full overflow-hidden">
      <div className="bg-white border border-gray-200 shadow-sm rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Settings</h2>
        <div className="divide-y divide-gray-200">
          {settings.map((setting) => (
            <div key={setting.key} className="flex items-center justify-between py-4">
              <span className="text-gray-700 font-medium">{setting.label}</span>
              <button
                onClick={() => handleToggle(setting.key)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-200 focus:outline-none ${setting.value ? 'bg-blue-600' : 'bg-gray-300'}`}
                aria-pressed={setting.value}
              >
                <span
                  className={`inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform duration-200 ${setting.value ? 'translate-x-6' : 'translate-x-0'}`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
