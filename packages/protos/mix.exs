defmodule Protos.Mixfile do
  use Mix.Project

  @version "0.0.0"

  def project do
    [
      app: :protos,
      version: @version,
      elixir: "~> 1.4",
      build_embedded: Mix.env() == :prod,
      start_permanent: Mix.env() == :prod,
      deps: deps(),
      package: package()
    ]
  end

  def application, do: [extra_applications: [:logger]]

  defp deps do
    [
      {:protobuf, "~> 0.6.2"}
    ]
  end

  defp package do
    [
      maintainers: ["EduardoRFS"],
      licenses: ["MIT"],
      links: %{"GitHub" => "https://github.com/EduardoRFS/hash-test"},
      files: ~w(mix.exs README.md src)
    ]
  end
end
