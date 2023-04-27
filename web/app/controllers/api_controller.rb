require "extism"
require "json"

class ApiController < ApplicationController
  def execute
    name = params[:name]
    endpoint = Endpoint.find_by_name!(name)
    result = call_plugin endpoint
    puts "Result:"
    puts(result)
    resp = result["response"]
    status = resp["status"]
    slip = resp["sleep_for"]
    sleep slip if slip
    (resp["additional_headers"] || {}).each do |k, v|
      response.set_header(k, v)
    end

    render inline: resp["body"], status: resp["status"], content_type: resp["content_type"]
  end

  private

  def call_plugin(endpoint)
    call_data = {
      method: request.method,
      path: request.path,
    }
    manifest = {
      # warning: this is not safe!
      :wasm => [{:path => "/wasm/#{endpoint.name}.wasm"}]
    }

    Extism.with_context do |ctx|
      plugin = ctx.plugin(manifest)
      Extism.set_log_file("/tmp/extism.log", "trace")
      call_resp = plugin.call("on_request", JSON.dump(call_data))
      JSON.parse(call_resp)
    end
  end
end
