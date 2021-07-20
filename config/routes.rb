Rails.application.routes.draw do
  root 'comments#index'
  
  get  'youtube', to:'comments#youtube'
  get  'twitter', to:'comments#twitter'
  get  'twitch',  to:'comments#twitch'
  post 'twitch',  to:'comments#twitch'
  
end
