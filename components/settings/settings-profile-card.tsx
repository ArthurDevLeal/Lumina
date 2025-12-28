"use client";

import { Button } from "@/components/ui/button";
import { StatCard } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SettingsIcon } from "lucide-react";
import { useState } from "react";

interface SettingsProfileCardProps {
  name: string;
  email: string;
  avatarUrl: string;
  avatarSeedName:string
  onEditProfile?: (newSeed: string) => Promise<void>;
  isLoading?: boolean;
}

export default function SettingsProfileCard({
  name,
  email,
  avatarUrl,
  onEditProfile,
  avatarSeedName,
  isLoading,
}: SettingsProfileCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarSeed, setAvatarSeed] = useState(avatarSeedName ? avatarSeedName : name);

  const previewUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (onEditProfile && avatarSeed.trim()) {
      await onEditProfile(avatarSeed.trim());
      setIsOpen(false);
    }
  };

  const handleRandomize = () => {
    const randomSeed = `${name}-${Math.random().toString(36).substring(7)}`;
    setAvatarSeed(randomSeed);
  };

  return (
    <>
      <StatCard.Root variant="light" className="flex flex-col items-center gap-4 justify-center">
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-slate-100 mb-6 p-1 border-4 border-white overflow-hidden group cursor-pointer">
            <img
              src={avatarUrl}
              alt="Avatar"
              className="w-full h-full rounded-full transition-transform group-hover:scale-110"
            />
          </div>
          <h2 className="text-2xl font-bold text-foreground">{name}</h2>
          <p className="text-muted-foreground font-medium">{email}</p>
        </div>
        <Button className="w-full" onClick={() => setIsOpen(true)} disabled={isLoading}>
          <SettingsIcon /> Edit profile
        </Button>
      </StatCard.Root>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile Avatar</DialogTitle>
            <DialogDescription>
              Change your avatar by entering a custom seed or randomizing it.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full bg-slate-100 p-1 border-4 border-border overflow-hidden">
                  <img src={previewUrl} alt="Avatar Preview" className="w-full h-full rounded-full" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="avatarSeed">Avatar Seed</Label>
                <Input
                  id="avatarSeed"
                  value={avatarSeed}
                  onChange={(e) => setAvatarSeed(e.target.value)}
                  placeholder="Enter a seed for your avatar"
                />
                <p className="text-xs text-muted-foreground">Type anything to generate a unique avatar</p>
              </div>

              <Button type="button" variant="outline" className="w-full" onClick={handleRandomize}>
                Generate Random Avatar
              </Button>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsOpen(false);
                  setAvatarSeed(name);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Avatar"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
