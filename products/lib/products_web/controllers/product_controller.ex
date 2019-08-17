defmodule ProductsWeb.ProductController do
  use ProductsWeb, :controller

  alias Products.Schema

  action_fallback ProductsWeb.FallbackController

  def index(conn, _params) do
    products = Schema.list_products()
    render(conn, "index.json", products: products)
  end
end
