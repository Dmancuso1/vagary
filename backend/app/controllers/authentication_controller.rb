class AuthenticationController < ApplicationController
  before_action :authorize_request, except: :login
  # POST /auth/login
  def login
    @user = User.find_by_email(params[:email])
    if @user&.authenticate(params[:password])
      token = JsonWebToken.encode(user_id: @user.id)
      time = Time.now + 24.hours.to_i
      render json: { token: token, exp: time.strftime("%m-%d-%Y %H:%M"),
                     name: @user.name, email: @user.email, id: @user.id }, status: :ok
    else
      render json: { error: 'unauthorized' }, status: :unauthorized
    end
  end
  
  # def test
  #   render json: {status: 'fuck yeea'}
  # end

  def logout
    reset_session
    render json: {
      status: 200,
      logged_out: true
    }
  end

  private
  def login_params
    params.permit(:email, :password)
  end
end
