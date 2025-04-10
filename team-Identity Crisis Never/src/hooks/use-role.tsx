import { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

export type Role = 'user' | 'admin' | 'hr' | null;

interface RolePermissions {
  canManageEmployees: boolean;
  canEditWorkspace: boolean;
  canApproveLeave: boolean;
  canAssignRoles: boolean;
  canManageAnnouncements: boolean;
  canManageDocuments: boolean;
  canManageProjects: boolean;
  canViewAdminDashboard: boolean;
}

export function useRole() {
  const { user, isLoaded } = useUser();
  const [role, setRole] = useState<Role>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [permissions, setPermissions] = useState<RolePermissions>({
    canManageEmployees: false,
    canEditWorkspace: false,
    canApproveLeave: false,
    canAssignRoles: false,
    canManageAnnouncements: false,
    canManageDocuments: false,
    canManageProjects: false,
    canViewAdminDashboard: false
  });

  useEffect(() => {
    if (isLoaded && user) {
      // Get role from Clerk user metadata
      const userRole = user.publicMetadata.role as Role;
      console.log("Current user role from Clerk:", userRole);
      
      if (userRole) {
        setRole(userRole);
        updatePermissions(userRole);
      } else {
        // Default to 'user' if no role specified
        setRole('user');
        updatePermissions('user');
      }
    }
    
    setIsLoading(false);
  }, [isLoaded, user]);

  // Update permissions based on role
  const updatePermissions = (role: Role) => {
    switch (role) {
      case 'admin':
        setPermissions({
          canManageEmployees: true,  // Admin can add/delete employees
          canEditWorkspace: true,    // Admin can edit workspace layout
          canApproveLeave: true,     // Admin can approve leaves
          canAssignRoles: true,      // Only admin can decide who is HR
          canManageAnnouncements: true, // Admin can add/delete announcements
          canManageDocuments: true,  // Admin can add/delete documents
          canManageProjects: true,   // Admin can manage projects
          canViewAdminDashboard: true
        });
        break;
      case 'hr':
        setPermissions({
          canManageEmployees: true,  // HR can add/delete employees
          canEditWorkspace: true,    // HR can edit workspace layout
          canApproveLeave: true,     // HR's primary role is approving leaves
          canAssignRoles: false,     // HR cannot assign roles
          canManageAnnouncements: true, // HR can add/delete announcements
          canManageDocuments: true,  // HR can add/delete documents
          canManageProjects: true,   // HR can manage projects
          canViewAdminDashboard: true
        });
        break;
      default:
        setPermissions({
          canManageEmployees: false,
          canEditWorkspace: false,
          canApproveLeave: false,
          canAssignRoles: false,
          canManageAnnouncements: false,
          canManageDocuments: false,
          canManageProjects: false,
          canViewAdminDashboard: false
        });
    }
  };

  // Check if user has a specific role
  const hasRole = (requiredRole: Role): boolean => {
    return role === requiredRole;
  };

  // Check if user is an admin
  const isAdmin = (): boolean => {
    return role === 'admin';
  };

  // Check if user is HR
  const isHR = (): boolean => {
    return role === 'hr';
  };

  // Check if user has admin or HR role
  const isAdminOrHR = (): boolean => {
    // For debugging
    console.log("Current role:", role);
    console.log("Is admin or HR:", role === 'admin' || role === 'hr');
    return role === 'admin' || role === 'hr';
  };

  return {
    role,
    isLoading,
    permissions,
    hasRole,
    isAdmin,
    isHR,
    isAdminOrHR
  };
}