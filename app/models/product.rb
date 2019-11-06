class Product < ApplicationRecord
  has_one_attached :image
  validates :name, :price, presence: true

  # Custom validation
  # validate :ensure_field
  # def ensure_field
  #   unless self.field.attached?
  #     errors[:field] << "must be attached"
  #   end
  # end

  def image_url
    if self.image.attached?
      Rails.application.routes.url_helpers.rails_blob_path(self.image, only_path: true)
    else
      nil
    end
  end
end
