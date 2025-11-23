package models

import "time"

type Item struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	Name      string    `json:"name" gorm:"not null"`
	Status    string    `json:"status" gorm:"default:'active'"`
	CreatedAt time.Time `json:"created_at"`
}
