require 'net/http'

class Endpoint < ApplicationRecord

    before_save :compile_wasm!

    def compile_wasm!
        uri = URI('http://compiler:4000/compile')
        body = {
            id: self.name,
            source: self.source_code,
        }
        res = Net::HTTP.post(uri, body.to_json, "Content-Type" => "application/json")
        puts res
    end
end
