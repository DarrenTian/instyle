import React from "react";

class Login extends React.Component {
	render() {
		return (
			<div>
				<section class="hero is-halfheight">
				  <div class="hero-body">
				    <div class="container">
				      <div class="columns is-centered">
				        <div class="column is-5-tablet is-4-desktop is-3-widescreen">
				          <form action="" class="box">
				            <div class="field">
				              <label for="" class="label">Email</label>
				              <div class="control has-icons-left">
				                <input type="email" placeholder="Your email address" class="input" required />
				                <span class="icon is-small is-left">
				                  <i class="fa fa-envelope"></i>
				                </span>
				              </div>
				            </div>
				            <div class="field">
				              <label for="" class="label">Password</label>
				              <div class="control has-icons-left">
				                <input type="password" placeholder="*******" class="input" required />
				                <span class="icon is-small is-left">
				                  <i class="fa fa-lock"></i>
				                </span>
				              </div>
				            </div>
				            <div class="field">
				            	<div class="control">
				            		<button class="button is-outlined is-fullwidth">
				                		Login
				              		</button>
				            	</div>
				            </div>
				          </form>
				        </div>
				      </div>
				    </div>
				  </div>
				</section>
			</div>
		)
	}
}

export default Login;