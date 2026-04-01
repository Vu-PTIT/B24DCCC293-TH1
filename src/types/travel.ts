/**
 * Core Data Model for Travel Planning Application
 */

export type DestinationType = 'beach' | 'mountain' | 'city';

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  type: DestinationType;
  price: number;
  rating: number;
  visitTime: number; // Duration in hours (e.g. 2.5)
  costs: {
    food: number;
    accommodation: number;
    transport: number;
  };
}

export interface Activity {
  id: string;
  destinationId: string;
  startTime: string; // ISO String or Date
  endTime: string;
  notes?: string;
}

export interface ItineraryDay {
  dayNumber: number;
  activities: Destination[]; // In a real app this might be Activity[] with refs
}

export interface Itinerary {
  id: string;
  userId: string;
  title: string;
  days: ItineraryDay[];
  totalBudgetLimit: number;
  createdAt: string;
}

export interface BudgetStatistic {
  category: 'food' | 'accommodation' | 'transport' | 'other';
  spent: number;
  planned: number;
}
