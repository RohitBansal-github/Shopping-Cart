package models

import "time"

type Order struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CartID    uint      `json:"cart_id" gorm:"not null"`
	UserID    uint      `json:"user_id" gorm:"not null"`
	CreatedAt time.Time `json:"created_at"`
}
