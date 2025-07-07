import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Calendar, Mail } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user?.name}! Here's what's happening with your account.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-6 border border-border rounded-lg bg-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <User className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Account Status</p>
              <p className="text-lg font-semibold text-foreground">
                {user?.isActive ? 'Active' : 'Inactive'}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Email</p>
              <p className="text-lg font-semibold text-foreground">{user?.email}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Member Since</p>
              <p className="text-lg font-semibold text-foreground">
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="p-6 border border-border rounded-lg">
          <h2 className="text-xl font-semibold text-foreground mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <p className="text-sm text-muted-foreground">
                Successfully logged in to your account
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <p className="text-sm text-muted-foreground">
                Account created and activated
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border border-border rounded-lg">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors">
              <p className="font-medium text-foreground">Update Profile</p>
              <p className="text-sm text-muted-foreground">Edit your account information</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors">
              <p className="font-medium text-foreground">Change Password</p>
              <p className="text-sm text-muted-foreground">Update your account password</p>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-border hover:bg-accent transition-colors">
              <p className="font-medium text-foreground">View Settings</p>
              <p className="text-sm text-muted-foreground">Manage your account settings</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 