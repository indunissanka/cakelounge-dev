    import React, { useState } from 'react';
    import type { CakeDesign, TierConfig, CakeFlavor, Frosting, CakeShape, CakeTopper } from '../types/cake';
    import { Header } from './Header';
    import { CakePreview } from './CakePreview';
    import { TierControls } from './TierControls';
    import { CakeOptions } from './CakeOptions';
    import { EmailForm } from './EmailForm';
    import { AboutUs } from './AboutUs';

    export default function CakeCustomizer() {
      const [design, setDesign] = useState<CakeDesign>({
        tiers: [
          {
            layers: 1,
            colors: ['#FFB5E8'],
            outerColor: '#FFF5E4',
          },
        ],
        flavor: 'vanilla',
        frosting: 'buttercream',
        message: '',
        shape: 'round',
        topper: null,
      });

      const handleTierUpdate = (tierIndex: number, updatedTier: TierConfig) => {
        const newTiers = [...design.tiers];
        newTiers[tierIndex] = updatedTier;
        setDesign({ ...design, tiers: newTiers });
      };

      const addTier = () => {
        if (design.tiers.length < 6) {
          setDesign({
            ...design,
            tiers: [
              ...design.tiers,
              { layers: 1, colors: ['#FFB5E8'], outerColor: '#FFF5E4' },
            ],
          });
        }
      };

      const removeTier = (index: number) => {
        setDesign({
          ...design,
          tiers: design.tiers.filter((_, i) => i !== index),
        });
      };

      return (
        <div className="min-h-screen bg-[#FDF8F5]">
          <Header />
          
          <main className="max-w-6xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Cake Preview */}
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div style={{backgroundImage: `url('https://images.unsplash.com/photo-1558780858-38098aa0d36f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`, backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '10px', borderRadius: '10px'}}>
                  <div style={{backgroundColor: 'rgba(255, 255, 255, 0.8)', padding: '10px', borderRadius: '10px', textAlign: 'center'}}>
                    <h2 style={{fontSize: '2em', marginBottom: '10px', color: '#333'}}>Your Cake Design</h2>
                    <p style={{color: '#555', fontSize: '1.1em'}}>
                      We invite you to design your cake according to your preferences. Once we have reviewed your design, we will reach out to you to discuss the possibility of proceeding with your order.
                      <br />
                      <br />
                      Thank you for considering us, and we look forward to working with you.
                    </p>
                  </div>
                </div>
                <CakePreview tiers={design.tiers} topper={design.topper} />
                <div className="mt-6">
                  <EmailForm design={design} />
                </div>
              </div>

              {/* Customization Controls */}
              <div className="space-y-6">
                <TierControls
                  tiers={design.tiers}
                  onTierUpdate={handleTierUpdate}
                  onAddTier={addTier}
                  onRemoveTier={removeTier}
                />

                <CakeOptions
                  flavor={design.flavor}
                  frosting={design.frosting}
                  message={design.message}
                  shape={design.shape}
                  topper={design.topper}
                  onFlavorChange={(flavor: CakeFlavor) => setDesign({ ...design, flavor })}
                  onFrostingChange={(frosting: Frosting) => setDesign({ ...design, frosting })}
                  onMessageChange={(message: string) => setDesign({ ...design, message })}
                  onShapeChange={(shape: CakeShape) => setDesign({...design, shape})}
                  onTopperChange={(topper: CakeTopper | null) => setDesign({...design, topper})}
                />
              </div>
            </div>
          </main>
          <AboutUs />
        </div>
      );
    }
