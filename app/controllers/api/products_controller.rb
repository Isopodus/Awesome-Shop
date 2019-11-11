module API
  class ProductsController < ApplicationController
    respond_to :json

    def index
      if params[:ids]
        respond_with Product.where(id: params[:ids]).order(id: :ASC), methods: :image_url
      else
        respond_with Product.order(id: :ASC), methods: :image_url
      end
    end

    def create
      respond_with :api, Product.create(product_params)
    end

    def destroy
      respond_with Product.destroy(params[:id])
    end

    def update
      product = Product.find(params[:id])
      product.update(product_params)
      respond_with Product, json: product
    end

    private

    def product_params
      params.require(:product).permit(
          :name,
          :description,
          :price,
          :image,
          ids: []
      )
    end
  end
end