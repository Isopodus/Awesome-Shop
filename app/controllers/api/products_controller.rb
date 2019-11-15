module API
  class ProductsController < ApplicationController
    respond_to :json

    def index
      if params[:ids]
        respond_with Product.where(id: params[:ids]).order(name: :ASC).reject { |product| !product.valid? }
      else
        respond_with Product.order(name: :ASC).reject { |product| !product.valid? }
      end
    end

    def create
      begin
        product = Product.create!(product_params)
        if product.valid?
          respond_with Product, json: {}, status: 500
        else
          respond_with Product, json: product
        end
      rescue StandardError => e
        raise StandardError, e.message
      end
    end

    def destroy
      begin
        destroy_returned = Product.destroy(params[:id])
        if destroy_returned
          respond_with destroy_returned
        else
          respond_with Product, json: {}, status: 500
        end
      rescue StandardError => e
        raise StandardError, e.message
      end
    end

    def update
      product = Product.find_by_id(params[:id])
      begin
        if product&.valid? and product.update(product_params) and product.valid?
          respond_with Product, json: product
        else
          respond_with Product, json: {}, status: 500
        end
      rescue StandardError => e
        raise StandardError, e.message
      end
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