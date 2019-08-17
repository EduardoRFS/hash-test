defmodule Products.SchemaTest do
  use Products.DataCase

  alias Products.Schema

  describe "products" do
    alias Products.Schema.Product

    @valid_attrs %{description: "some description", id: "7488a646-e31f-11e4-aace-600308960662", price_in_cents: 42, title: "some title"}
    @update_attrs %{description: "some updated description", id: "7488a646-e31f-11e4-aace-600308960668", price_in_cents: 43, title: "some updated title"}
    @invalid_attrs %{description: nil, id: nil, price_in_cents: nil, title: nil}

    def product_fixture(attrs \\ %{}) do
      {:ok, product} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Schema.create_product()

      product
    end

    test "list_products/0 returns all products" do
      product = product_fixture()
      assert Schema.list_products() == [product]
    end

    test "get_product!/1 returns the product with given id" do
      product = product_fixture()
      assert Schema.get_product!(product.id) == product
    end

    test "create_product/1 with valid data creates a product" do
      assert {:ok, %Product{} = product} = Schema.create_product(@valid_attrs)
      assert product.description == "some description"
      assert product.id == "7488a646-e31f-11e4-aace-600308960662"
      assert product.price_in_cents == 42
      assert product.title == "some title"
    end

    test "create_product/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Schema.create_product(@invalid_attrs)
    end

    test "update_product/2 with valid data updates the product" do
      product = product_fixture()
      assert {:ok, %Product{} = product} = Schema.update_product(product, @update_attrs)
      assert product.description == "some updated description"
      assert product.id == "7488a646-e31f-11e4-aace-600308960668"
      assert product.price_in_cents == 43
      assert product.title == "some updated title"
    end

    test "update_product/2 with invalid data returns error changeset" do
      product = product_fixture()
      assert {:error, %Ecto.Changeset{}} = Schema.update_product(product, @invalid_attrs)
      assert product == Schema.get_product!(product.id)
    end

    test "delete_product/1 deletes the product" do
      product = product_fixture()
      assert {:ok, %Product{}} = Schema.delete_product(product)
      assert_raise Ecto.NoResultsError, fn -> Schema.get_product!(product.id) end
    end

    test "change_product/1 returns a product changeset" do
      product = product_fixture()
      assert %Ecto.Changeset{} = Schema.change_product(product)
    end
  end
end
