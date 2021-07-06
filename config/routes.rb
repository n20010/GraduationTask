Rails.application.routes.draw do
  root 'comments#index'
  
  get 'comments/twitter'
  get 'comments/update'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
