module API
  class ProductsController < ApplicationController
    def index
      render json: { products: Product.all }
    end
  end
end