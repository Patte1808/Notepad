Rails.application.routes.draw do
  resources :notes
  root 'notes#index'

  scope '/api' do
    scope 'v1' do
      scope 'notes' do
        get '/' => 'api_notes#index'
        post '/' => 'api_notes#create'
        scope '/:id' do
          put '/' => 'api_notes#update'
          delete '/' => 'api_notes#destroy'
        end
      end
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
