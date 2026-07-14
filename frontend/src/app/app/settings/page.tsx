"use client";

import { useAuth } from "@/lib/auth";
import { User, Mail, Shield } from "lucide-react";

export default function SettingsPage() {
  const { user, logout } = useAuth();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Settings</h1>
      <div className="bg-card border border-border rounded-2xl divide-y divide-border">
        <div className="p-6">
          <h2 className="font-semibold mb-4">Profile</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <User size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{user?.name || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{user?.email || "—"}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Shield size={16} className="text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Plan</p>
                <p className="font-medium capitalize">{user?.plan || "free"}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6">
          <button onClick={logout}
            className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-500/20 transition-colors">
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
