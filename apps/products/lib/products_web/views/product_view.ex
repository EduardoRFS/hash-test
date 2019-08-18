defmodule ProductsWeb.ProductView do
  use ProductsWeb, :view
  alias ProductsWeb.ProductView

  def render("index.json", %{products: products}) do
    render_many(products, ProductView, "product.json")
  end

  def render("product.json", %{product: product}) do
    %{
      id: product.id,
      price_in_cents: product.price_in_cents,
      title: product.title,
      description: product.description
    }
  end
end
