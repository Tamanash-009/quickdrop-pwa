// Removed unused ReactNode import

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string; // Used to dynamic render lucide-react icons safely
  tag?: string;
  isComingSoon?: boolean;
}

export interface WhyChooseUsItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
}

export interface DeliveryStep {
  stepNumber: number;
  title: string;
  description: string;
  iconName: string;
}

export interface ProductItem {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  description?: string;
  price: number;
  unit: string;
  image: string;
  rating: number;
  isVeg?: boolean;
  isPopular?: boolean;
  isAvailableToday?: boolean;
  isFastDelivery?: boolean;
  isOrganic?: boolean;
  isFreshToday?: boolean;
  prescriptionRequired?: boolean;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  product: ProductItem;
  quantity: number;
}

export interface StatsItem {
  value: string;
  label: string;
  iconName: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: 'confirmed' | 'processing' | 'in_route' | 'delivered';
  progress: number;
  statusText: string;
  shippingInfo: {
    name: string;
    phone: string;
    address: string;
    instructions?: string;
  };
  createdAt: string;
  subtotal: number;
  deliveryFee: number;
  grandTotal: number;
  rider: {
    name: string;
    avatar: string;
    rating: number;
    phone: string;
  };
}

