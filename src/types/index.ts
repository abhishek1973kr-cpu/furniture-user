export type ProductCategory =
  | 'Smart Living'
  | 'On-The-Go Comfort'
  | 'Flexi Work & Dine'
  | 'Storage & Utility';

export interface Product {
  id: string;
  title: string;
  subtitle: string;
  category: ProductCategory;
  subCategory: string;
  originalPrice: number;
  wholesalePrice: number; // strictly between 1500 and 2500
  rating: number;
  reviewCount: number;
  images: string[]; // Up to 8 high-resolution images for the gallery
  description: string;
  spaceSavingFeature: string;
  specifications: {
    material: string;
    dimensions: string;
    foldedDimensions?: string;
    weightCapacity: string;
    warranty: string;
    dispatchTime: string;
    assemblyRequired: string;
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

export interface FirestoreOrderItem {
  id: string;
  title: string;
  name?: string;
  price: number;
  quantity: number;
  image: string;
  category?: string;
  subtotal: number;
}

export interface FirestoreOrderPayload {
  customerName: string;
  phone: string;
  phoneNumber: string;
  fullAddress: string;
  paymentMethod: 'COD' | string;
  orderDate: string;
  orderDateTime: string;
  items: FirestoreOrderItem[];
  totalPrice: number;
  totalAmount: number;
  discountSaved: number;
  status: 'Pending';
  createdAt: any;
  dispatchTime: string;
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
