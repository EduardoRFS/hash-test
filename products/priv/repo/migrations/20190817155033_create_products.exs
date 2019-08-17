defmodule Products.Repo.Migrations.CreateProducts do
  use Ecto.Migration

  def change do
    create table(:product, primary_key: false) do
      add :id, :binary_id, primary_key: true
      add :price_in_cents, :integer
      add :title, :string
      add :description, :string
    end

  end
end
