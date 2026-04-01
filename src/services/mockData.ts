import { Destination, Itinerary, BudgetStatistic } from '../types/travel';

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Bãi biển Mỹ Khê',
    description: 'Một trong những bãi biển đẹp nhất hành tinh tại Đà Nẵng.',
    image: 'https://picsum.photos/400/300?random=1',
    type: 'beach',
    price: 500000,
    rating: 4.8,
    visitTime: 3,
    costs: { food: 200000, accommodation: 500000, transport: 100000 },
  },
  {
    id: '2',
    name: 'Đỉnh Fansipan',
    description: 'Nóc nhà Đông Dương tại Sa Pa, Lào Cai.',
    image: 'https://picsum.photos/400/300?random=2',
    type: 'mountain',
    price: 1500000,
    rating: 4.9,
    visitTime: 5,
    costs: { food: 300000, accommodation: 800000, transport: 200000 },
  },
  {
    id: '3',
    name: 'Hồ Gươm',
    description: 'Trái tim của thủ đô Hà Nội ngàn năm văn hiến.',
    image: 'https://picsum.photos/400/300?random=3',
    type: 'city',
    price: 0,
    rating: 4.7,
    visitTime: 2,
    costs: { food: 150000, accommodation: 600000, transport: 500000 },
  },
];

export const mockItinerary: Itinerary = {
  id: 'it-1',
  userId: 'user-123',
  title: 'Chuyến đi Đà Nẵng 3 ngày 2 đêm',
  createdAt: '2024-03-20T10:00:00Z',
  totalBudgetLimit: 10000000,
  days: [
    {
      dayNumber: 1,
      activities: [mockDestinations[0]], // Mỹ Khê
    },
    {
      dayNumber: 2,
      activities: [mockDestinations[2]], // Hồ Gươm (Giả sử đi tour)
    },
  ],
};

export const mockBudgetStats: BudgetStatistic[] = [
  { category: 'food', spent: 1200000, planned: 1500000 },
  { category: 'accommodation', spent: 3500000, planned: 3000000 },
  { category: 'transport', spent: 800000, planned: 1000000 },
  { category: 'other', spent: 500000, planned: 500000 },
];
