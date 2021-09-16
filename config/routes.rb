Rails.application.routes.draw do
  root 'comments#index'
  
  mount ActionCable.server => '/cable'
  
  get  'sendStyles', to: 'comments#changeStyles'
  get  'screen', to:'comments#screen'
  get  'youtube', to:'comments#youtube'
  get  'twitch',  to:'comments#twitch'
  
end
