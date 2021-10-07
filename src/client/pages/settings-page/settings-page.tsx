import React from 'react';
import Settings from '../../components/settings/settings';
import Launch from '../../components/launch/launch';

export default function SettingsPage(): JSX.Element {
  return (
    <div className="settings-page">
      <Settings />
      <hr />
      <Launch />
    </div>
  );
}
