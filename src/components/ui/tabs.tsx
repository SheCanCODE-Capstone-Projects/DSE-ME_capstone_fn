import React from 'react';

interface TabsProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
  children: React.ReactNode;
}

export function Tabs({ value, onValueChange, className = "", children }: TabsProps) {
  return (
    <div className={className} data-value={value} data-onValueChange={onValueChange}>
      {children}
    </div>
  );
}

export function TabsList({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return <div className={`flex ${className}`}>{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  className?: string;
  children: React.ReactNode;
}

export function TabsTrigger({ value, className = "", children }: TabsTriggerProps) {
  return (
    <button
      type="button"
      className={`px-4 py-2 text-sm font-medium ${className}`}
      onClick={() => {
        const tabs = document.querySelector('[data-value]') as any;
        if (tabs?.dataset?.onValueChange) {
          tabs.dataset.onValueChange(value);
        }
      }}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className = "", children }: { value: string; className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}