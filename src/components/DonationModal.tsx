
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Heart, Coffee, Book, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DonationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const donationOptions = [
  { value: '5', label: 'Coffee', icon: Coffee, description: 'Buy us a coffee' },
  { value: '10', label: 'Book', icon: Book, description: 'Help us buy more philosophy books' },
  { value: '25', label: 'Support', icon: Heart, description: 'Support ongoing development' }
];

const DonationModal: React.FC<DonationModalProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState('10');
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  const handleDonate = () => {
    const donationAmount = isCustom ? customAmount : amount;
    console.log(`Processing donation of $${donationAmount}`);
    // In a real implementation, this would connect to a payment processor
    onClose();
  };

  const handleOptionChange = (value: string) => {
    setAmount(value);
    setIsCustom(false);
  };

  const handleCustomToggle = () => {
    setIsCustom(true);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomAmount(e.target.value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-panel border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-light tracking-tight text-primary flex items-center">
            <Heart size={18} className="text-accent mr-2" />
            Support PhiloPalette
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Your donation helps us maintain and improve this service for everyone.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          <RadioGroup value={isCustom ? 'custom' : amount} onValueChange={handleOptionChange} className="space-y-3">
            {donationOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-3">
                <div 
                  className={cn(
                    "flex items-center justify-between w-full p-3 rounded-md border transition-all duration-300",
                    isCustom || amount !== option.value 
                      ? "border-border bg-background/50 hover:bg-secondary/50" 
                      : "border-accent bg-secondary"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <RadioGroupItem value={option.value} id={`donation-${option.value}`} />
                    <Label htmlFor={`donation-${option.value}`} className="flex items-center space-x-2 cursor-pointer">
                      <option.icon size={16} className="text-accent" />
                      <div>
                        <span className="font-medium">${option.value}</span>
                        <span className="ml-2 text-muted-foreground text-sm">{option.description}</span>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex items-center space-x-3">
              <div 
                className={cn(
                  "flex items-center justify-between w-full p-3 rounded-md border transition-all duration-300",
                  !isCustom 
                    ? "border-border bg-background/50 hover:bg-secondary/50" 
                    : "border-accent bg-secondary"
                )}
              >
                <div className="flex items-center space-x-3 w-full">
                  <RadioGroupItem value="custom" id="donation-custom" onClick={handleCustomToggle} />
                  <Label htmlFor="donation-custom" className="flex items-center space-x-2 cursor-pointer flex-grow">
                    <div className="flex items-center w-full">
                      <span className="font-medium mr-2">Custom:</span>
                      <div className="relative flex-grow">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                          $
                        </span>
                        <Input
                          value={customAmount}
                          onChange={handleCustomChange}
                          onClick={handleCustomToggle}
                          className="pl-6 w-full"
                          placeholder="Enter amount"
                        />
                      </div>
                    </div>
                  </Label>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        <DialogFooter className="sm:justify-between">
          <Button
            variant="outline"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            Maybe later
          </Button>
          <Button
            onClick={handleDonate}
            className="btn-accent"
            disabled={isCustom && (!customAmount || parseFloat(customAmount) <= 0)}
          >
            Donate {isCustom ? (customAmount ? `$${customAmount}` : '') : `$${amount}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DonationModal;
