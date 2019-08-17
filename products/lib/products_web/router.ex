defmodule ProductsWeb.Router do
  use ProductsWeb, :router

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", ProductsWeb do
    pipe_through :api
    resources "/products", ProductController, except: [:new, :edit]
  end
end
