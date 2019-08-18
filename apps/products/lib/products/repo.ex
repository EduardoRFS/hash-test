defmodule Products.Repo do
  use Ecto.Repo,
    otp_app: :products,
    adapter: Ecto.Adapters.Postgres
end
