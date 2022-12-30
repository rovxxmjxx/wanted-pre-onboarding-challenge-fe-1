import React from 'react';

export default function Button({
  title,
  disabled,
}: {
  title: string;
  disabled: boolean;
}) {
  return (
    <button type="submit" className="submit-button" disabled={disabled}>
      {title}
    </button>
  );
}
