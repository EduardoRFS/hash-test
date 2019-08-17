defmodule Products.Schema.Product do
  use Ecto.Schema
  import Ecto.Changeset

  @primary_key {:id, :binary_id, autogenerate: true }
  schema "product" do
    field :price_in_cents, :integer
    field :title, :string
    field :description, :string
  end

  @doc false
  def changeset(product, attrs) do
    product
    |> cast(attrs, [:price_in_cents, :title, :description])
    |> validate_number(:price_in_cents, greater_than_or_equal_to: 0)
  end
end
