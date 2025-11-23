package models

import "time"

type Cart struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	UserID    uint      `json:"user_id" gorm:"not null"`
	Name      string    `json:"name"`
	Status    string    `json:"status" gorm:"default:'active'"`
	CreatedAt time.Time `json:"created_at"`
}

type CartItem struct {
	CartID uint `json:"cart_id" gorm:"primaryKey"`
	ItemID uint `json:"item_id" gorm:"primaryKey"`
}
