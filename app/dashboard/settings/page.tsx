"use client";

import { updateUser } from "@/actions/user/update-user";
import { Dashboard } from "@/components/dashboard";
import { Settings } from "@/components/settings";
import ErrorMessage from "@/components/ui/error-message";
import Loading from "@/components/ui/loading";
import { useUserStore } from "@/store/user-store";
import { useState } from "react";
import { toast } from "sonner";

export default function SettingsPage() {
  const { user, updateUserStore } = useUserStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const avatarSeed = user?.avatarUrl || user?.name || "User";
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${avatarSeed}`;

  const handleEditProfileAvatar = async (newSeed: string) => {
    try {
      setIsLoading(true);

      const response = await updateUser({
        avatarUrl: newSeed,
      });

      updateUserStore({
        name: response.data.name,
        email: response.data.email,
        avatarUrl: response.data.avatarUrl,
        balance: response.data.balance,
        saving: response.data.saving,
      });

      toast.success("Avatar updated successfully!");
    } catch (error: any) {
      toast.error(error.message || "Error updating avatar");
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAccount = async (data: { name?: string; email?: string; password?: string }) => {
    try {
      setIsLoading(true);

      const response = await updateUser(data);

      updateUserStore({
        name: response.data.name,
        email: response.data.email,
        balance: response.data.balance,
        saving: response.data.saving,
        avatarUrl: response.data.avatarUrl,
      });

      toast.success(response.message);
    } catch (error: any) {
      toast.error(error.message || "Error updating user");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loading />;

  if (error) {
    return <ErrorMessage isLoading={isLoading} error={error} />;
  }

  if (!user) {
    return <Loading />;
  }

  return (
    <Dashboard.Root>
      <Settings.Header />

      <Settings.Content>
        <Settings.Profile>
          <Settings.ProfileCard
            name={user.name}
            email={user.email}
            avatarUrl={avatarUrl}
            onEditProfile={handleEditProfileAvatar}
            isLoading={isLoading}
            avatarSeedName={avatarSeed}
          />
        </Settings.Profile>

        <div className="col-span-2 flex flex-col gap-6">
          <Settings.AccountForm
            fullName={user.name}
            email={user.email}
            onUpdate={handleUpdateAccount}
            isLoading={isLoading}
          />
        </div>
      </Settings.Content>
    </Dashboard.Root>
  );
}
