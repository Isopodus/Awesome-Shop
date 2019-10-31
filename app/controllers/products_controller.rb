module API
  class ProductsController < ApplicationController
    def index
      products = ['Product 1', 'Product 2']

      render json: { products: products }
    end
  end
end