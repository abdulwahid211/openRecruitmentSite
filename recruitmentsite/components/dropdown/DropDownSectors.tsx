import { useState } from 'react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@radix-ui/react-dropdown-menu';
import { Button } from '@headlessui/react';

export interface DropDownSectorsProps {
  selected: string;
  setSelected: (value: string) => void;
}

export const sectors = [
  'All',
  'Catering and Hospitality',
  'Health and Medicine',
  'Engineering',
  'IT',
  'Administration',
  'HR',
  'Teaching',
  'Retail',
  'Sales',
  'Cleaning and Domestic',
  'Logistics',
  'Manufacturing',
  'Social Care',
  'Security',
  'Construction',
  'Other',
];

export default function DropDownSectors({ selected, setSelected }: DropDownSectorsProps) {
  const handleSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <div className="bg-amber-50 p-4 rounded-lg mb-4 border border-gray-300 font-bold w-sm">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>{selected || 'Select Sector'}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" avoidCollisions={false}>
          <div className="bg-amber-100 rounded-lg w-sm max-h-60 overflow-y-auto">
            {sectors.map((sector, index) => (
              <DropdownMenuItem key={index} className="w-full border border-black p-2" onSelect={() => handleSelect(sector)}>
                {sector}
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
