require 'test_helper'

class ProductsControllerTest < ActionDispatch::IntegrationTest
  test "should not save product without name and price" do
    product = Product.new
    assert_not product.save, "Saved products without name or price"
  end
end
