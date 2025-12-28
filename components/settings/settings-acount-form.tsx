"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { StatCard } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, User } from "lucide-react";
import { useState } from "react";

interface SettingsAccountFormProps {
  fullName?: string;
  email?: string;
  onUpdate?: (data: { name?: string; email?: string; password?: string }) => Promise<void>;
  isLoading?: boolean;
}

export default function SettingsAccountForm({
  fullName,
  email,
  onUpdate,
  isLoading,
}: SettingsAccountFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: fullName || "",
    email: email || "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password && formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (onUpdate) {
      const updateData: { name?: string; email?: string; password?: string } = {};

      if (formData.name !== fullName) {
        updateData.name = formData.name;
      }

      if (formData.email !== email) {
        updateData.email = formData.email;
      }

      if (formData.password) {
        updateData.password = formData.password;
      }

      await onUpdate(updateData);
      setIsOpen(false);
      setFormData({ ...formData, password: "", confirmPassword: "" });
    }
  };

  return (
    <>
      <StatCard.Root variant="light" className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold text-foreground">Account information</h3>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(true)}>
            Edit
          </Button>
        </div>
        <div className="flex gap-4">
          <div className="flex flex-col grow gap-2 group">
            <Label className="opacity-40">Full name</Label>
            <div className="relative group">
              <User
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground/70 transition-colors"
                size={20}
              />
              <Input type="text" className="pl-12 bg-card" disabled value={fullName} />
            </div>
          </div>
          <div className="flex flex-col grow gap-2 group">
            <Label className="opacity-40">Email address</Label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-foreground/70 transition-colors"
                size={20}
              />
              <Input type="text" className="pl-12 bg-card" disabled value={email} />
            </div>
          </div>
        </div>
      </StatCard.Root>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Account Information</DialogTitle>
            <DialogDescription>Update your account details below.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Enter your email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New Password (optional)</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Enter new password"
                />
              </div>
              {formData.password && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      setFormData({ ...formData, confirmPassword: e.target.value })
                    }
                    placeholder="Confirm new password"
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}