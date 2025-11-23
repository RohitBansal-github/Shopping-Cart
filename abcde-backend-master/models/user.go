package models

import "time"

type User struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Username  string    `json:"username" gorm:"unique;not null"`
	Password  string    `json:"password" gorm:"not null"`
	Token     string    `json:"token,omitempty"`
	CartID    *uint     `json:"cart_id"`
	CreatedAt time.Time `json:"created_at"`
}
