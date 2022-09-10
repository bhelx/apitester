class CreateEndpoints < ActiveRecord::Migration[7.0]
  def change
    create_table :endpoints do |t|
      t.string :name
      t.text :source_code

      t.timestamps
    end
  end
end
