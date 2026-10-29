export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: 'Ladies Ornaments' | 'Gents Ornaments';
  subCategory: string;
  originalPrice: number; // MRP ₹349
  wholesalePrice: number; // ₹99
  rating: number;
  reviewCount: number;
  images: string[]; // Array of 5 high-resolution mock images
  description: string;
  specifications: {
    material: string;
    plating: string;
    finish: string;
    warranty: string;
    dispatchTime: string;
    hypoallergenic: boolean;
  };
  features: string[];
  inStock: boolean;
  isBestseller?: boolean;
  isNewArrival?: boolean;
}

export interface Review {
  id: string;
  name: string;
  city: string;
  rating: number;
  date: string;
  productName: string;
  comment: string;
  verifiedBuyer: boolean;
  avatar: string;
  itemImage?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderFormValues {
  fullName: string;
  phoneNumber: string;
  email?: string;
  streetAddress: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  paymentMethod: 'cod' | 'upi';
  orderNotes?: string;
}

export interface ConfirmedOrder {
  orderId: string;
  customer: OrderFormValues;
  items: CartItem[];
  totalAmount: number;
  discountSaved: number;
  orderedAt: string;
  estimatedDelivery: string;
}

