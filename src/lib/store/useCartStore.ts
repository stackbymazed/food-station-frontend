import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { TMeal } from '@/services/mealService'

export interface CartItem extends TMeal {
  quantity: number
  selectedOptions?: {
    size?: string
    addons?: string[]
  }
}

interface CartState {
  items: CartItem[]
  addItem: (meal: TMeal, quantity?: number) => void
  removeItem: (mealId: number) => void
  updateQuantity: (mealId: number, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getItemCount: () => number
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (meal, quantity = 1) => {
        set((state) => {
          const existingItem = state.items.find((item) => item.id === meal.id)
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.id === meal.id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            }
          }
          return { items: [...state.items, { ...meal, quantity }] }
        })
      },
      removeItem: (mealId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== mealId),
        }))
      },
      updateQuantity: (mealId, quantity) => {
        set((state) => ({
          items: state.items.map((item) =>
            item.id === mealId ? { ...item, quantity: Math.max(0, quantity) } : item
          ).filter(item => item.quantity > 0),
        }))
      },
      clearCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.discountPrice || item.price
          return total + price * item.quantity
        }, 0)
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0)
      },
    }),
    {
      name: 'food-station-cart',
    }
  )
)
