package main

import (
	"log"
	"os"
	"shopping-cart/config"
	"shopping-cart/handlers"
	"shopping-cart/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	config.ConnectDatabase()

	r := gin.Default()

	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"*"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
	}))

	r.POST("/users", handlers.CreateUser)
	r.GET("/users", handlers.GetUsers)
	r.POST("/users/login", handlers.LoginUser)

	r.POST("/items", handlers.CreateItem)
	r.GET("/items", handlers.GetItems)

	authorized := r.Group("/")
	authorized.Use(middleware.AuthMiddleware())
	{
		authorized.POST("/carts", handlers.CreateOrAddToCart)
		authorized.GET("/carts", handlers.GetCarts)

		authorized.POST("/orders", handlers.CreateOrder)
		authorized.GET("/orders", handlers.GetOrders)
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Printf("Server starting on port %s", port)
	r.Run(":" + port)
}
