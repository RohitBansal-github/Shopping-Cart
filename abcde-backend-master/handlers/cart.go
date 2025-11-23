package handlers

import (
	"net/http"
	"shopping-cart/config"
	"shopping-cart/models"

	"github.com/gin-gonic/gin"
)

func CreateOrAddToCart(c *gin.Context) {
	user, _ := c.Get("user")
	currentUser := user.(models.User)

	var input struct {
		ItemIDs []uint `json:"item_ids" binding:"required"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	var cart models.Cart
	err := config.DB.Where("user_id = ? AND status = ?", currentUser.ID, "active").First(&cart).Error

	if err != nil {
		cart = models.Cart{
			UserID: currentUser.ID,
			Name:   "Cart for " + currentUser.Username,
			Status: "active",
		}
		if err := config.DB.Create(&cart).Error; err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create cart"})
			return
		}

		config.DB.Model(&currentUser).Update("cart_id", cart.ID)
	}

	for _, itemID := range input.ItemIDs {
		var item models.Item
		if err := config.DB.First(&item, itemID).Error; err != nil {
			continue
		}

		cartItem := models.CartItem{
			CartID: cart.ID,
			ItemID: itemID,
		}
		config.DB.FirstOrCreate(&cartItem, cartItem)
	}

	var cartItems []models.CartItem
	config.DB.Where("cart_id = ?", cart.ID).Find(&cartItems)

	c.JSON(http.StatusOK, gin.H{
		"cart":       cart,
		"cart_items": cartItems,
	})
}

func GetCarts(c *gin.Context) {
	var carts []models.Cart
	config.DB.Find(&carts)

	var result []gin.H
	for _, cart := range carts {
		var cartItems []models.CartItem
		config.DB.Where("cart_id = ?", cart.ID).Find(&cartItems)

		result = append(result, gin.H{
			"cart":       cart,
			"cart_items": cartItems,
		})
	}

	c.JSON(http.StatusOK, result)
}
