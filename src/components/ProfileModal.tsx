'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import {
  X,
  LogOut,
  ShoppingBag,
  Clock,
  PackageCheck,
  Truck,
  MapPin,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { fetchUserOrders } from '@/services/firebaseService';
import { UserOrder } from '@/types';

export const ProfileModal: React.FC = () => {
  const { user, isProfileModalOpen, closeProfileModal, signOutUser } = useAuth();
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  useEffect(() => {
    let isMounted = true;
    if (isProfileModalOpen && user?.uid) {
      setIsLoadingOrders(true);
      fetchUserOrders(user.uid)
        .then((fetched) => {
          if (isMounted) {
            setOrders(fetched);
            setIsLoadingOrders(false);
          }
        })
        .catch((err) => {
          console.error('Failed to load user orders:', err);
          if (isMounted) setIsLoadingOrders(false);
        });
    }
    return () => {
      isMounted = false;
    };
  }, [isProfileModalOpen, user?.uid]);

  if (!isProfileModalOpen || !user) return null;

  const handleLogout = async () => {
    await signOutUser();
  };

  const getStatusBadge = (status: string) => {
    const s = status.toLowerCase();
    if (s === 'delivered') {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-800 text-[10px] font-semibold uppercase tracking-wider">
          Delivered
        </span>
      );
    }
    if (s === 'dispatched' || s === 'in transit') {
      return (
        <span className="px-2.5 py-0.5 rounded-full bg-blue-100 border border-blue-300 text-blue-800 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
          <Truck className="w-3 h-3" />
          Dispatched
        </span>
      );
    }
    return (
      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 border border-amber-300 text-amber-800 text-[10px] font-semibold uppercase tracking-wider flex items-center gap-1">
        <Clock className="w-3 h-3" />
        Pending Dispatch
      </span>
    );
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="profile-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in-up"
    >
      {/* Background click to dismiss */}
      <div className="fixed inset-0" onClick={closeProfileModal} aria-hidden="true" />

      {/* Modal Card with Smooth Rounded-3xl Corners */}
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#FFFFFF] border border-[#C5A880]/40 shadow-2xl z-10 text-[#1A1A1A] flex flex-col rounded-3xl overflow-hidden">
        
        {/* Header Bar */}
        <div className="px-6 py-4 border-b border-[#C5A880]/20 bg-[#F8F5EE] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-sm font-serif uppercase tracking-[0.2em] font-semibold text-[#1A1A1A]">
              Liv<span className="text-[#8C6E43]">Fabs</span>
            </span>
            <span className="text-black/20">|</span>
            <span className="text-xs uppercase tracking-widest text-[#8C6E43] font-semibold">
              Patron Profile & Orders
            </span>
          </div>

          <button
            onClick={closeProfileModal}
            className="p-1.5 text-[#7E7870] hover:text-[#1A1A1A] bg-[#FFFFFF] border border-[#C5A880]/30 rounded-full transition-colors"
            aria-label="Close profile modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* User Account Card */}
          <div className="p-5 sm:p-6 rounded-3xl bg-[#F8F5EE] border border-[#C5A880]/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4 text-center sm:text-left">
              {/* Avatar */}
              <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#8C6E43] shrink-0 bg-[#FFFFFF] shadow-sm">
                {user.photoURL ? (
                  <Image
                    src={user.photoURL}
                    alt={user.displayName || 'Google Profile'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-[#8C6E43] text-white font-serif font-bold text-xl">
                    {(user.displayName || 'U').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Name & Email */}
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-1.5">
                  <h3 id="profile-modal-title" className="text-lg font-serif font-semibold text-[#1A1A1A]">
                    {user.displayName || 'LivFabs Patron'}
                  </h3>
                  <CheckCircle2 className="w-4 h-4 text-[#8C6E43]" />
                </div>
                <p className="text-xs text-[#55504A] font-medium">{user.email}</p>
                <div className="mt-1 flex items-center justify-center sm:justify-start gap-1.5 text-[10px] text-[#8C6E43] font-semibold uppercase tracking-wider">
                  <Sparkles className="w-3 h-3 text-[#8C6E43]" />
                  <span>Google Verified Patron</span>
                </div>
              </div>
            </div>

            {/* Log Out Button */}
            <button
              onClick={handleLogout}
              className="py-2.5 px-5 bg-[#FFFFFF] hover:bg-red-50 text-[#55504A] hover:text-red-700 border border-[#C5A880]/40 hover:border-red-300 rounded-full transition-all text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-sm shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>

          {/* Order History Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-base font-serif font-semibold text-[#1A1A1A]">
                  Order History & Waybills
                </h4>
                <p className="text-xs text-[#55504A]">
                  Orders placed with this Google account are synchronized dynamically from Firestore.
                </p>
              </div>
              <span className="text-xs font-semibold text-[#8C6E43] bg-[#F8F5EE] px-3 py-1 rounded-full border border-[#C5A880]/30">
                {orders.length} Order{orders.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Orders List Container */}
            {isLoadingOrders ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-8 h-8 border-2 border-[#8C6E43] border-t-transparent rounded-full animate-spin mb-3" />
                <span className="text-xs text-[#55504A]">Fetching your orders from atelier...</span>
              </div>
            ) : orders.length === 0 ? (
              <div className="p-8 sm:p-12 text-center rounded-3xl bg-[#F8F5EE] border border-[#C5A880]/25">
                <div className="w-14 h-14 rounded-full bg-[#FFFFFF] border border-[#C5A880]/30 flex items-center justify-center mx-auto mb-3 shadow-sm">
                  <ShoppingBag className="w-6 h-6 text-[#8C6E43]" />
                </div>
                <h5 className="text-base font-serif font-semibold text-[#1A1A1A]">No Orders Placed Yet</h5>
                <p className="text-xs text-[#55504A] mt-1 max-w-sm mx-auto leading-relaxed">
                  You haven't placed any smart furniture orders with this Google account yet. All future orders will appear here automatically.
                </p>
                <button
                  onClick={closeProfileModal}
                  className="mt-5 px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#8C6E43] text-white text-xs font-semibold uppercase tracking-wider rounded-full transition-all shadow-sm"
                >
                  Explore Creations
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="p-5 rounded-2xl bg-[#F8F5EE] border border-[#C5A880]/30 shadow-sm hover:shadow-md transition-all space-y-3"
                  >
                    {/* Top Row: Order ID, Date & Status */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#C5A880]/20 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-[#8C6E43]">{order.orderId}</span>
                        <span className="text-[#8C827A]">•</span>
                        <span className="text-[#55504A] font-medium">{order.orderDate}</span>
                      </div>
                      <div>{getStatusBadge(order.status)}</div>
                    </div>

                    {/* Middle: Items summary */}
                    <div className="space-y-2">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5 min-w-0">
                            {item.image && (
                              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-white border border-[#C5A880]/30 shrink-0">
                                <Image
                                  src={item.image}
                                  alt={item.title || item.name || 'Furniture Piece'}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="truncate">
                              <span className="font-semibold text-[#1A1A1A] block truncate">
                                {item.title || item.name}
                              </span>
                              <span className="text-[11px] text-[#55504A]">Qty: {item.quantity}</span>
                            </div>
                          </div>
                          <span className="font-serif font-bold text-[#8C6E43] shrink-0 ml-4">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Row: Address & Total */}
                    <div className="pt-3 border-t border-[#C5A880]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                      <div className="flex items-center gap-1.5 text-[#55504A] text-[11px]">
                        <MapPin className="w-3.5 h-3.5 text-[#8C6E43] shrink-0" />
                        <span className="truncate max-w-xs">{order.fullAddress}</span>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <span className="text-[11px] text-emerald-700 font-semibold uppercase">
                          {order.paymentMethod}
                        </span>
                        <div className="text-right">
                          <span className="text-sm font-serif font-bold text-[#1A1A1A]">
                            Total: ₹{order.totalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
