import React, { useState } from 'react';
    import { TierDesigner } from './TierDesigner';
    import type { TierConfig } from '../types/cake';

    interface TierControlsProps {
      tiers: TierConfig[];
      onTierUpdate: (tierIndex: number, updatedTier: TierConfig) => void;
      onAddTier: () => void;
      onRemoveTier: (index: number) => void;
    }

    export function TierControls({ tiers, onTierUpdate, onAddTier, onRemoveTier }: TierControlsProps) {
      const [activeTab, setActiveTab] = useState(0);

      const tierName = (tierIndex: number) => {
        switch (tierIndex + 1) {
          case 1:
            return 'Tier One';
          case 2:
            return 'Tier Two';
          case 3:
            return 'Tier Three';
          case 4:
            return 'Tier Four';
          case 5:
            return 'Tier Five';
          case 6:
            return 'Tier Six';
          default:
            return `Tier ${tierIndex + 1}`;
        }
      };

      return (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-serif text-gray-900">Customize Tiers</h2>
            {tiers.length < 6 && (
              <button
                onClick={onAddTier}
                className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
              >
                Add Tier
              </button>
            )}
          </div>

          <div className="flex border-b">
            {tiers.map((_, index) => (
              <div key={index} className="relative">
                <button
                  className={`py-2 px-4 border-b-2 ${
                    activeTab === index
                      ? 'border-pink-500 text-pink-700 font-medium'
                      : 'border-transparent hover:border-gray-300 text-gray-600'
                  }`}
                  onClick={() => setActiveTab(index)}
                >
                  {tierName(index)}
                </button>
                {tiers.length > 1 && (
                  <button
                    onClick={() => onRemoveTier(index)}
                    className="absolute top-1 right-1 text-red-600 hover:text-red-700"
                  >
                    X
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {tiers.map((tier, index) => (
              <div key={index} className={`${activeTab === index ? 'block' : 'hidden'}`}>
                <TierDesigner
                  tier={tier}
                  tierIndex={index}
                  onUpdate={onTierUpdate}
                />
              </div>
            ))}
          </div>
        </div>
      );
    }
