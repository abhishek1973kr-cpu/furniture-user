'use client';

import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { AuthCard } from '@/components/AuthCard';

export const AuthModal: React.FC = () => {
  const { isAuthModalOpen, closeAuthModal } = useAuth();

  if (!isAuthModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="auth-modal-title"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-md animate-fade-in-up"
    >
      {/* Backdrop click to dismiss */}
      <div className="fixed inset-0" onClick={closeAuthModal} aria-hidden="true" />

      {/* Modal Wrapper - Optimized for Mobile Screen */}
      <div className="relative w-full max-w-md z-10 max-h-[92vh] flex flex-col justify-end sm:justify-center">
        {/* Dedicated Auth Card with integrated close button and mobile bottom-sheet styling */}
        <AuthCard onSuccess={closeAuthModal} onClose={closeAuthModal} />
      </div>
    </div>
  );
};
