package handlers

import (
	"net/http"
	"shopping-cart/config"
	"shopping-cart/models"

	"github.com/gin-gonic/gin"
)

func CreateOrder(c *gin.Context) {
	user, _ := c.Get("user")
	currentUser := user.(models.User)

	var input struct {
		CartID uint `json:"cart_id" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var cart models.Cart
	if err := config.DB.Where("id = ? AND user_id = ?", input.CartID, currentUser.ID).First(&cart).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Cart not found"})
		return
	}

	if cart.Status != "active" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Cart is not active"})
		return
	}

	order := models.Order{
		CartID: cart.ID,
		UserID: currentUser.ID,
	}

	if err := config.DB.Create(&order).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create order"})
		return
	}

	config.DB.Model(&cart).Update("status", "ordered")
	config.DB.Model(&currentUser).Update("cart_id", nil)

	c.JSON(http.StatusCreated, order)
}

func GetOrders(c *gin.Context) {
	var orders []models.Order
	config.DB.Find(&orders)
	c.JSON(http.StatusOK, orders)
}
