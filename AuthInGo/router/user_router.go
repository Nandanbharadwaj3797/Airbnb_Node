package router

import (
	"AuthInGo/controllers"

	"github.com/go-chi/chi/v5"
)

type UserRouter struct {
	controller *controllers.UserController
}

func NewUserRouter(controller *controllers.UserController) *UserRouter {
	return &UserRouter{controller: controller}
}

func (u *UserRouter) Register(r chi.Router) {
	r.Post("/users", u.controller.CreateUser)
}
