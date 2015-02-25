require "haml"
require "sinatra"
require "sinatra/reloader"

get "/" do
  haml :index
end

get "/tools/1" do
  redirect "/images/ctaSystemMapBrochure.pdf"
end


get "/tools/2" do
  send_file "tools2.haml"
end


get "/tools/3" do
  send_file "tools3.haml"
end
