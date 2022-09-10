Rails.application.routes.draw do
  get 'api/:name', to: 'api#execute'
  resources :endpoints
end
