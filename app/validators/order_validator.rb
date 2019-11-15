class OrderValidator < ActiveModel::Validator
  def validate(record)

    # Load JSON schema
    schema = JSON.parse(File.read(Rails.root.join('config', 'schemas', 'order.json').to_s))

    # Try to validate record by it, add error message if exception happened
    begin
      JSON::Validator.validate!(schema, record.to_json)
    rescue JSON::Schema::ValidationError => e
      raise StandardError, e.message
    end
  end
end