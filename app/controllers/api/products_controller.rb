module API
  class ProductsController < ApplicationController
    respond_to :json

    def index
      respond_with Product.order(id: :ASC), methods: :image_url
    end

    def find
      respond_with Product.find(params[:id]), methods: :image_url
    end

    def create
      respond_with :api, Product.create(product_params)
    end

    def destroy
      respond_with Product.destroy(params[:id])
    end

    def update
      product = Product.find(params['id'])
      product.update(product_params)
      respond_with Product, json: product
    end

    private

    def product_params
      params.require(:product).permit(
          :name,
          :description,
          :price,
          :image
      )
    end
  end
end