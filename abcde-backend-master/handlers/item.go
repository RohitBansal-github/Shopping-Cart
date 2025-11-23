package handlers

import (
	"net/http"
	"shopping-cart/config"
	"shopping-cart/models"

	"github.com/gin-gonic/gin"
)

func CreateItem(c *gin.Context) {
	var input struct {
		Name   string `json:"name" binding:"required"`
		Status string `json:"status"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if input.Status == "" {
		input.Status = "active"
	}

	item := models.Item{
		Name:   input.Name,
		Status: input.Status,
	}

	if err := config.DB.Create(&item).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create item"})
		return
	}

	c.JSON(http.StatusCreated, item)
}

func GetItems(c *gin.Context) {
	var items []models.Item
	config.DB.Find(&items)
	c.JSON(http.StatusOK, items)
}
