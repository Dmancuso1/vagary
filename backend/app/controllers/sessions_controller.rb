class SessionsController < ApplicationController

  def new
  end

  def create
    # checks user exists + password is correct
    if @user = User.authenticate_with_credentials(user_params)
      # saves user id in browser cookie so user can navigate freely
      # session[:user_id] = @user.id
      # redirect_to '/'
      render json: {
        token: JsonWebToken.encode(user_id: @user.id),
        email: @user.email
      }
    else
      # redirect_to '/login'
      head :unauthorized
    end
  end

  def destroy
    # session[:user_id] = nil
    # redirect_to '/login'
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :avatar_id)
  end

end
