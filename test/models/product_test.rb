require 'test_helper'

class ProductTest < ActiveSupport::TestCase
  test "Should not create product with invalid structure" do
    begin
      assert_not Product.create!, "Created product with invalid structure"
    rescue StandardError => e
      assert e
    end
  end

  test "Should return nil url when no image attached" do
    Product.all.each { |product|
      assert_not product.image_url
    }
  end
end
