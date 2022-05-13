Rails.application.routes.draw do
  get 'homepage/index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api do
    namespace :v1 do
      resources :tasks, only: [ :index, :show, :create, :destroy]
    end
  end
end
